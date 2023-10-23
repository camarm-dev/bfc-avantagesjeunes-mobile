from hashlib import md5

import pymongo
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Avantages Jeunes Mobile API', description='Permet de trouver les avantages autour d\'une position GPS.')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mongo = pymongo.MongoClient(open('.mongodb').read())
database = mongo.Dataset.avantages_test


def create_index():
    try:
        database.create_index(('coordinates', '2dsphere'))
    except Exception as e:
        print(f"[Warn] Cannot delete index: {e}")
    database.create_index(('coordinates', '2dsphere'))


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


@app.get('/around-me')
async def around_me(longitude: float, latitude: float, radius: int = 1):
    results = list(perform_query(longitude, latitude, radius))
    count = len(results)
    response = {
        "results": [to_geojson(advantage) for advantage in results],
        "count": count
    }
    return response


@app.get('/')
async def root():
    return {
        'message': 'Welcome to Avantages Jeunes Connect API !',
        'version': version,
        'dataset': dataset_revision
    }


if __name__ == '__main__':
    print("[Startup] Retrieving dataset & version")
    timestamp = list(database.find().sort("_id", pymongo.DESCENDING).limit(1))[0]['_id'].generation_time
    doc_number = database.count_documents({})
    dataset_revision = str(md5(f"num:{doc_number};time:f{timestamp}".encode()).hexdigest())[0:7]
    version = '1.0'
    print(f"[Startup] Version {version}, dataset {dataset_revision}")
    uvicorn.run(app=app, host='0.0.0.0')
