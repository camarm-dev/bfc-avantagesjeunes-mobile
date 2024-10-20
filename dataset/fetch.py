import datetime
import sys
from time import sleep

import pymongo
import requests
from urllib.parse import quote


def fetch(page: int = 1):
    headers = {
        "KOREDGE-API-KEY": "cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B"
    }
    try:
        return requests.get(f'https://backoffice.avantagesjeunes.com/api/avantage/list/{page}/100?timestamp=1640995200', headers=headers).json()
    except Exception as e:
        print(f'Erreur: {e} (pause de 3 secondes)')
        sleep(3)
        return {
            'datefin': '0'
        }


def getTimeDetails(time):
    days, seconds = time.days, time.seconds
    hours = days * 24 + seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    return hours, minutes, seconds


def is_success(response: dict):
    if response.get('status'):
        return response['status']
    return True


def get_location(address: str):
    try:
        request = requests.get(f'https://geocode.maps.co/search?q={quote(address)}')
        response = request.json()
        if len(response) > 0:
            return [float(response[0]['lon']), float(response[0]['lat'])], True
    except Exception as e:
        print(f'Erreur: {e} (pause de 2 minutes)')
        sleep(120)
    return [], False


def start_fetch_while():
    page = 1
    parsed = 0
    places = 0
    failed = 0
    duplicated = 0
    valid_date = int(datetime.datetime.now().strftime('%Y%m%d'))
    response = fetch(page)
    total = len(response['results'])
    success = is_success(response)
    while success:
        for avantage in response['results']:
            parsed += 1
            if not int(avantage['datefin'].replace('-', '')) > valid_date:
                if not silent:
                    print(f"\033[A\033[KL'avantage \"{avantage['offre']}\" n'est plus valide (depuis le {avantage['datefin']}) !\n")
                continue
            if type(avantage.get('organismes')) != list:
                continue
            for org in avantage.get('organismes', []):
                if not org.get('latitude', None):
                    location = get_location(f"{org['adresse']}, {org['cp']} {org['commune']}")
                    sleep(.1)
                    if not location[1]:
                        if not silent:
                            print(f"\033[A\033[KImpossible de trouver la position de {org['adresse']}, {org['cp']} {org['commune']}\n")
                        failed += 1
                        continue
                else:
                    location = ([float(org['longitude']), float(org['latitude'])], True)
                parsed_advantage = {
                    "title": org['nom'],
                    "description": f"{avantage['offre']}<br><small>{org['adresse']}</small>",
                    "conditions": avantage['conditions'],
                    "image": avantage['image_url'],
                    "secteurs": avantage['secteurs'],
                    "rubriques": avantage['categories'],
                    "other_advantages": [],
                    "loc": {
                        "type": "Point",
                        "coordinates": location[0]
                    },
                    "metadata": {
                        "type": avantage["type"],
                        "datedebut": avantage["datedebut"],
                        "datefin": avantage["datefin"],
                        "id": avantage["id_avantage"],
                        "offre": avantage["offre"],
                        "note": avantage["note"],
                        "nb_note": avantage["nb_note"],
                        "saison": avantage["saison"] if avantage.get('saison') else 2024,
                        "organismes": [{
                            "id_organisme": org['id_organisme'],
                            "nom": org["nom"],
                            "cp": org["cp"],
                            "commune": org["commune"],
                            "adresse": org["adresse"],
                            "longitude": org["longitude"],
                            "latitude": org["latitude"],
                            "site": org["site"],
                            "site2": org["site2"]
                        }]
                    }
                }
                found_advantage = database.find_one({"loc": parsed_advantage['loc']})
                if found_advantage:
                    duplicated += 1
                    places += 1
                    found_advantage['other_advantages'].append(parsed_advantage)
                    database.update_one({"loc": parsed_advantage['loc']}, {'$set': {'other_advantages': found_advantage['other_advantages']}})
                    continue
                database.insert_one(parsed_advantage)
                places += 1
            search_database.insert_one({
                "org_name": ", ".join([org["nom"] for org in avantage.get('organismes', [])]),
                **avantage
            })
            print(f'\033[A\033[KPage n°{page} | {parsed}/{total} avantages traités | {places} lieux référencés | {failed} échecs de localisation de lieux | {duplicated} lieux en doublons fusionnés')

        response = fetch(page + 1)
        success = is_success(response)
        if success:
            page += 1
            if response.get('results', None):
                total += len(response['results'])


if __name__ == '__main__':
    # Version 10/24
    silent = '-s' in sys.argv or '--silent' in sys.argv

    mongo = pymongo.MongoClient(open('.mongodb').read())
    if input("Réinitialiser la base [Y/n] ?").lower() == 'y':
        mongo.Dataset.drop_collection('avantages_1024')
        mongo.Dataset.drop_collection('search')
    database = mongo.Dataset.avantages_1024
    search_database = mongo.Dataset.search

    before = datetime.datetime.now()

    print("Récupération des avantages...")
    try:
        start_fetch_while()
    except KeyboardInterrupt:
        print("Annulation...")

    after = datetime.datetime.now()
    time = after - before
    hour, minute, second = getTimeDetails(time)

    print(f'Fini en {hour} heures {minute} minutes et {second} secondes.')
