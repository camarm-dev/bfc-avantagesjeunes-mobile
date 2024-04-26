from hashlib import md5
from typing import List

import pymongo
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Avantages Jeunes Mobile API',
              description='Permet de trouver les avantages autour d\'une position GPS.')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mongo = pymongo.MongoClient(open('.mongodb').read())
database = mongo.Dataset.avantages_0424
search_database = mongo.Dataset.search


def create_index():
    try:
        database.drop_index(['coordinates_2dsphere', 'title_text_description_text_conditions_text'])
        # database.drop_index(['coordinates_2dsphere'])
        # search_database.drop_index(['offre_text_conditions_text_org_name_text'])
    except Exception as e:
        print(f"[Warn] Cannot delete index: {e}")
    database.create_index([('coordinates', '2dsphere')])
    search_database.create_index([('offre', 'text'), ('conditions', 'text'), ('org_name', 'text')],
                          default_language='french')


def to_geojson(advantage: dict):
    return {
        "type": 'Feature',
        "geometry": {
            "type": 'Point',
            "coordinates": advantage['loc']['coordinates']
        },
        "properties": {
            "title": advantage['title'],
            "description": advantage['description'],
            "image": advantage['image'],
            "otherAdvantages": advantage['other_advantages']
        }
    }


def to_json(advantage: dict):
    del advantage['_id']
    return {
        "id_avantage": advantage["metadata"]["id"],
        "conditions": advantage["conditions"],
        "type": advantage["metadata"]["type"],
        "datedebut": advantage["metadata"]["datedebut"],
        "datefin": advantage["metadata"]["datefin"],
        "secteurs": advantage["secteurs"],
        "categories": advantage["rubriques"],
        "offre": advantage["metadata"]["offre"],
        "note": advantage["metadata"]["note"],
        "nb_note": advantage["metadata"]["nb_note"],
        "saison": advantage["metadata"]["saison"],
        "organismes": advantage["metadata"]["organismes"],
        "image_url": advantage["image"]
    }


def perform_query(longitude: float, latitude: float, radius: float = 1):
    return database.find({
        "loc": {
            "$geoWithin": {
                "$centerSphere": [
                    [longitude, latitude],
                    radius / 6378.1  # radius kilometer sphere
                ]
            }
        }
    })


def perform_search_query(expression: str, secteurs: list, rubriques: list):
    query = {}
    if len(secteurs) > 0:
        query["secteurs"] = {"$in": secteurs}
    if len(rubriques) > 0:
        query["rubriques"] = {"$in": rubriques}
    return search_database.find({
        "$text": {
            "$search": expression
        },
        **query
    })


@app.get('/around-me')
async def around_me(longitude: float, latitude: float, radius: int = 1):
    results = list(perform_query(longitude, latitude, radius))
    count = len(results)
    response = {
        "results": [to_geojson(advantage) for advantage in results],
        "count": count
    }
    return response


@app.get('/search')
async def search(q: str, secteurs: List[str] = [], rubriques: List[str] = []):
    results = [to_json(document) for document in perform_search_query(q, secteurs, rubriques)]
    return {
        "results": results,
        "count": len(results)
    }


@app.get('/')
async def root():
    return {
        'message': 'Welcome to Avantages Jeunes Connect API !',
        'version': version,
        'dataset': dataset_revision
    }


if __name__ == '__main__':
    print("[Startup] Retrieving dataset & version")
    create_index()
    timestamp = list(database.find().sort("_id", pymongo.DESCENDING).limit(1))[0]['_id'].generation_time
    doc_number = database.count_documents({})
    dataset_revision = str(md5(f"num:{doc_number};time:f{timestamp}".encode()).hexdigest())[0:7]
    version = '1.1'
    print(f"[Startup] Version {version}, dataset {dataset_revision}")
    uvicorn.run(app=app, host='0.0.0.0')
