interface Suggestion {
    id_avantage: 45387
}

interface Avantage {
    offre: string
    conditions: string
    type: string
    datedebut: string
    datefin: string
    saison: string
    image_url: string
    note: number
    nb_note: number
    secteurs: number[]
    categories: number[]
}

const categories = {
    "1": {
        nom: "Musées",
        icon: "Landmark"
    },
    "2": {
        nom: "Concert, spectacle, théâtre",
        icon: "Smile"
    },
    "4": {
        nom: "Voyage",
        icon: "Compass"
    },
    "5": {
        nom: "Cinéma",
        icon: "Clapperboard"
    },
    "7": {
        nom: "Sport",
        icon: "Medal"
    },
    "8": {
        nom: "Arts créatifs",
        icon: "Brush"
    },
    "9": {
        nom: "Musique",
        icon: "Music4"
    },
    "10": {
        nom: "Environnement",
        icon: "Leaf"
    },
    "11": {
        nom: "Informatique",
        icon: "Cpu"
    },
    "12": {
        nom: "Photographie",
        icon: "Camera"
    },
}

const rubriques = {
    ...categories,
    "90": {
        nom: "Manifestations Sportives",
        icon: "Trophy"
    },
    "96": {
        nom: "Livre, papeterie",
        icon: "BookOpen"
    },
    "119": {
        nom: "Bibliothèque, ludothèque, médiathèque",
        icon: "Library"
    },
    "147": {
        nom: "Actions restos du coeur",
        icon: "Donut"
    },
    "165": {
        nom: "Santé",
        icon: "HeartPulse"
    }
}

const secteurs = {
    "1": {
        nom: "Besançon"
    },
    "2": {
        nom: "Beaume les Dames"
    },
    "3": {
        nom: "Valdahon"
    },
    "4": {
        nom: "Ornans"
    },
    "5": {
        nom: "Morteau"
    },
    "6": {
        nom: "Pontarlier"
    },
    "7": {
        nom: "Quingey"
    },
    "8": {
        nom: "Montbéliard"
    },
    "9": {
        nom: "Lons-le-Saunier - Saint-Amour"
    },
    "10": {
        nom: "Saint-Laurent-en-Grandvaux - Morez - Les Rousses"
    },
    "11": {
        nom: "Arbois - Poligny - Salins"
    },
    "12": {
        nom: "Moirans-en-Montagne - Saint-Claude"
    },
    "13": {
        nom: "Héricourt"
    },
    "14": {
        nom: "Luxeuil-les-Bains"
    },
    "15": {
        nom: "Vesoul"
    },
    "16": {
        nom: "Belfort"
    },
    "17": {
        nom: "Beaucourt-Delle"
    },
    "18": {
        nom: "Territoire de Belfort"
    },
    "19": {
        nom: "Lure"
    },
    "20": {
        nom: "Gray"
    },
    "21": {
        nom: "St Loup"
    },
    "22": {
        nom: "Champagnole - Nozeroy"
    },
    "23": {
        nom: "Dole"
    },
    "24": {
        nom: "Rioz"
    },
    "56": {
        nom: "Sens"
    },
    "57": {
        nom: "Joigny"
    },
    "58": {
        nom: "Toucy"
    },
    "59": {
        nom: "Auxerre"
    },
    "60": {
        nom: "Tonnerre"
    },
    "61": {
        nom: "Avallon"
    },
    "62": {
        nom: "Cosne"
    },
    "63": {
        nom: "Clamecy"
    },
    "64": {
        nom: "Nevers"
    },
    "65": {
        nom: "Château Chinon"
    },
    "66": {
        nom: "Chatillonnais"
    },
    "67": {
        nom: "Auxois"
    },
    "68": {
        nom: "Vallées de la Tille"
    },
    "69": {
        nom: "Dijon"
    },
    "70": {
        nom: "Mirebellois"
    },
    "71": {
        nom: "Gevrey-Nuits-Beaune"
    },
    "72": {
        nom: "Val de Saône"
    },
    "73": {
        nom: "Montceau-les-Mines"
    },
    "74": {
        nom: "Chalon-sur-Saône"
    },
    "75": {
        nom: "Louhans"
    },
    "76": {
        nom: "Paray-le-Monial"
    },
    "77": {
        nom: "Mâcon"
    },
    "78": {
        nom: "Côte d'Or"
    },
    "79": {
        nom: "Nièvre"
    },
    "80": {
        nom: "Yonne"
    },
    "81": {
        nom: "Saône-et-Loire"
    },
    "82": {
        nom: "Avantages sur Internet"
    },
    "83": {
        nom: "Faverney"
    },
    "84": {
        nom: "Fougerolles-Saint-Valbert"
    },
    "85": {
        nom: "Melisey"
    },
    "86": {
        nom: "Le Creusot"
    },
    "87": {
        nom: "Autun"
    },
    "88": {
        nom: "Charolles"
    },
    "89": {
        nom: "Digoin"
    },
    "90": {
        nom: "Marcigny"
    },
    "91": {
        nom: "Bourbon-Lancy"
    },
    "92": {
        nom: "Tournus"
    },
    "93": {
        nom: "Bresse"
    },
    "94": {
        nom: "Chagny"
    }
}

const editions = {
    "1": ["1", "2", "3", "4", "5", "6", "7", "82"],
    "7": ["67"],
}


export type {
    Suggestion,
    Avantage
}

export {
    categories,
    secteurs,
    rubriques
}
