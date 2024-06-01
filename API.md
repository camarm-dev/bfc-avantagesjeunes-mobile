# 💻 Interactions avec les API

Ce document se veut assurer la transparence en matière de collecte de données vis à vis de nos utilisateurs.

- Voir aussi [Politique de Confidentialité](https://avantagesjeunesconnect.camarm.fr/privacy)
- Voir aussi [Conditions Générales d'Utilisation](https://avantagesjeunesconnect.camarm.fr/cgu)

## Principe de fonctionnement

L'application "AJC" utilise vos données d'identification pour se connecter et récupérer les données relatives à vos interactions sur le site "avantagesjeunes.com", pour ainsi les afficher. Elle agit comme une interface.

## Authentification

1. Vous entrez vos identifiants de connexion sur l'application. AJC va alors **sauvegarder ses données** dans le [stockage sécurisé](#stockage-sécurisé) de votre téléphone.
2. Grâce à ces identifiants, AJC va pouvoir obtenir un **jeton de connexion**, qui lui permettra de récupérer les données depuis l'API publique d'avantagesjeunes.com.
3. Ce jeton à durée d'utilisation limitée sera alors re-généré (étape 2.), grâce à vos identifiants (étape 1.).

<img alt="schema.png" src="https://github.com/camarm-dev/bfc-avantagesjeunes-mobile/blob/main/.github/schema.png?raw=true"/>

_Schéma de fonctionnement des appels à l'API publique d'avantagesjeunes.com_

## Stockage et intégrité des données

Toutes les données collectées par AJC sont uniquement stockées localement sur votre appareil.

### Stockage "basique"

La plupart de vos données, notamment de cache, seront sauvegardées dans un stockage non chiffré, propre à l'application AJC appelé "LocalStorage".

### Stockage "sécurisé"

Vos données sensibles tel que vos identifiants sont sauvegardées dans un stockage chiffré, propre à AJC, dont la sécurité est assurée par votre téléphone, appelé "Keychain" (iOS) ou "KeyStore" (Android). 

