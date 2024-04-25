export interface Organisme {
    id_organisme: number
    user?: any
    nom: string

    sigle: string
    type: string

    adresse: string
    rid_commune?: number
    nom_postale?: string
    adresse_postale?: string
    rid_commune_postale?: number
    commune_postale_cedex?: string

    tel: string
    tel1: string
    tel2: string
    portable?: string
    fax?: string
    email: string
    site: string
    site2?: string
    horaires: string
    texte_libre?: string
    date_update?: string
    contact_suivi?: string
    nota?: string

    librairie?: boolean
    pointdevente?: boolean
    pointrelais?: boolean
    banque_populaire?: boolean
    rid_admin_user?: number
    mission?: string

    facebook?: string
    twitter?: string
    googleplus?: string
    youtube?: string

    latitude: string
    longitude: string

    applicatif?: boolean
    rid_pack?: number
    afficher?: boolean
    image?: string
    image_url?: string
    slug: string
    meta_title?: string
    meta_des?: string
    datetime_update?: string
    cp: string
    commune: string

    avantages?: number[]
}
