<div align="center">
<br>
<img alt="Icon" src="public/welcome.png" height="50">

# Avantages Jeunes Connect
Une application mobile pour la carte avantages jeunes en Bourgogne Franche-Comté.

</div>

Créée pour rechercher plus facilement les avantages dont vous pouvez bénéficier, Avantages Jeunes Connect est une application non officielle !


> [!IMPORTANT]   
> Avantages Jeunes Connect est une application non-officielle


## Télécharger


> [!NOTE]   
> Arrive bientôt:
> - [ ] Télécharger depuis avantages-jeunes-connect.camarm.fr
>   - [ ] Télécharger APK
>   - [ ] Télécharger IPA
> - [ ] Télécharger depuis F-droid
> - [ ] Télécharger depuis Altstore


## Goals

- [x] Voir sa carte
- [x] Voir son compte
- [x] Voir ses favoris
- [x] Voir les avantages autours sur une carte
- [x] Ouvrir un avantage sur une carte
- [ ] Enregistrer un scan de sa carte
- [ ] Voir ses avantages utilisés
- [ ] Utiliser un avantage depuis l'app
- [ ] Rechercher des avantages (secteur, type)


## Documentation


### API

- Installer python3
- Installer les dépendances
```shell
pip install pymongo fastapi uvicorn
```
- Lancer le script
```shell
python3 server.py
```

- Accessible depuis `localhost:8000` !

### Fetch advantages

- Installer python3
- Installer les dépendances
```shell
pip install pymongo requests
```
- Entrer l'url de connexion de la base MongoDB (dans un fichier `dataset/.mongodb`)
```shell
mongodb+srv://user:password@server.com/?retryWrites=true&w=majority
```
- Lancer le script (avec une option `-s` pour le mettre en mode silencieux) 
```shell
python3 fetch.py
```
- Attendez que la magie opère !