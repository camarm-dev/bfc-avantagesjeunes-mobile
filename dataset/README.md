# Dataset
This directory contains the code that index and serve a dataset of advantages, to show them on on map.

## Fetch
`fetch.py` fetch advantages and index them in a Mongodb database

### Run
- Create .mongodb file with complete connection url to database
`.mondbb`
```
mongodb+srv://user:pass@mongodb.net/?retryWrites=true&w=majority
```

## Serve
`serve.py` serve Fastapi endpoints to get advantage around you !