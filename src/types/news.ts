export type News = {
    id_actualite: number
    titre: string
    contenu: string
    date_debut: string
    date_fin: string
    image: string
    pdf?: boolean
    slug: string
    meta_title: string
    meta_des: string
    afficher: boolean
    exclu_agedebut: number
    exclu_agefin: number
    image_url: string
    image_thumb_url: string
    pdf_url: string
    rubriques: boolean
}

export type NewsResponse = {
    results: News[]
}
