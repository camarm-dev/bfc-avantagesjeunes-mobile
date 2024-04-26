import {Organisme} from "@/types/organismes";

export interface Avantage {
    id_avantage: number
    offre: string
    conditions: string
    type: "unique" | "carte"
    datedebut: string
    datefin: string
    convention_statut: number
    datetime_convention_statut1: string

    rid_dept: number
    rid_secteur: number
    carte_user: number
    rid_type_offre: number

    montant_reduc: string
    pourc_reduc: string
    montant_avant_avantage: string
    montant_avantage: string
    limite_passage: number
    limite_somme: string

    /**
     * Untyped beacause not tested
     */
    alerte_datedebut?: any
    /**
     * Untyped beacause not tested
     */
    alerte_datefin?: any

    admin: boolean

    /**
     * Untyped beacause not tested
     */
    user_id?: number | string

    type_diffusion?: any

    espaceperso_coeur: boolean

    rid_client: number
    rid_modalite: number
    rid_avantage: number

    hors_promo: boolean

    nb_av_utilise: string
    nb_av_utilise_obs: string
    exclu_agedebut: number
    exclu_agedefin: number
    nb_max_av: number
    nb_transaction: number

    code: boolean
    nb_code_restant: number
    has_code_partenaire: boolean
    nb_code_partenaire: number
    nb_code_partenaire_restant: number
    saison: number
    datetime_update: string

    image: string
    image_url: string
    image_thumb_url: string

    carte_jeune_europeenne: boolean
    tad: boolean

    note: number
    nb_note: number
    sum_note: number
    nb_like: number
    nb_comment: number
    comments: false | Comment[]

    has_bus: boolean

    packs: number[]
    secteurs: number[]
    categories: number[]
    categories_name: Category[]

    organismes: Organisme[]

    /**
     * Any because untyped
     */
    exclu_communes: false | any
    /**
     * Any because untyped
     */
    exclu_statuts: false | any
    /**
     * Any because untyped
     */
    partenaires: false | any
    /**
     * Any because untyped
     */
    avantage_groupes: false | any
}

export type Category = {
    id_categorie: number
    nom: string
    rid_categorie?: number
    afficher?: boolean
    categorie_parent?: boolean
}

export type Comment = {
    id_comment: number
    rid_compte: number
    rid_avantage: number
    commentaire: string
    datetime: string
    rid_comment: number
    statut: number
    auteur?: any
    image_thumb_url: string
    nb_like: number
    likesIdCompte: boolean
}

export type Transaction = {
    id_transaction: number
    date_transaction: string
    type: "dématérialisé" | string
    rid_avantage: number
}

export interface TransactionAvantage extends Avantage {
    id_transaction: number
    date_transaction: string
    type_transaction: "dématérialisé" | string
}
