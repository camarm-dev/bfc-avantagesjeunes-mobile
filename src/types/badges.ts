export type Badge = {
    id_badge: number
    nom: string,
    datetime: string,
    type: "communautaire" | string,
    type_solo: string,
    type_communautaire: "comment" | "note" | string,
    programmer_nb_rappel: number
    mettre_nb_av_fav: number
    partager_nb_av: number
    noter_nb_av: number
    poster_nb_comment: number
    enregistrer_nb_av_parcours: number
    like_nb_av: number
    image: string
    nb_deblocage?: number
    image_url: string
    condition: string
    parcours_categories: boolean
    position: number

    // new fields
    target: number
    target_type: string
}
