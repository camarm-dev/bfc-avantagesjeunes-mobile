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
    }
}

const secteurs = {
    "1": {
        nom: "Besançon"
    },
    "11": {
        nom: "Arbois - Poligny - Salins"
    },
    "82": {
        nom: "Avantages sur Internet"
    }
}


export type {
    Suggestion,
    Avantage
}

export {
    categories,
    secteurs
}
