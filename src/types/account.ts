import {Transaction} from "@/types/avantages";

export type Account = {
    id_compte: number
    numero: string
    eligible_exclu: boolean
    actif: boolean
    bloquer: boolean
    notif_email: boolean
    datetime: string
    pseudo?: string
    descriptif: string
    url_twitter?: string
    url_facebook?: string
    url_linkedin?: string
    url_instagram?: string
    url_perso?: string
    afficher_nom: boolean
    afficher_prenom: boolean
    utiliser_pseudo: boolean
    afficher_sexe: boolean
    afficher_ville: boolean
    afficher_tel: boolean
    afficher_email: boolean
    afficher_date_naissance: boolean
    image: string
    nom?: string
    prenom?: string
    ville?: string
    saison?: string | number
    image_url?: string
    image_thumb_url?: string
    carte: UserCard
    likes: false | any,
    notes: false | any,
    comments: false | Comment[],
    favoris: number[]
    centres_interet: number[]
    categories_notif: false | any
    rappels: false | any
    badges: BadgeItem[]
    comments_likes: false | any
    comments_signalements: false | any
    transactions: Transaction[]
    suggestions: SuggestedAvantage[]
}

export type UserCard = {
    id_carte: number
    date_vente: string
    nom: string
    prenom: string
    adresse: string
    cp: string
    ville: string
    tel: string
    tel_accepte: boolean
    email: string
    email_accepte: boolean
    numero: string
    date_naiss: string
    remarque: string
    rid_tarif: number
    valid: boolean
    rid_admin_user: number
    rid_pack: number
    sexe: "h" | "f" | string
    mode_paiement: number
    rid_type: number
    type_inscription: unknown,
    rid_compte: number
    saison: "2024" | string
    image_carte_identite: unknown,
    paiement: number
    date_paie: unknown,
    total: string
    frais_port: string
    avoir: string
    avoir_code: unknown,
    rid_avoir: number
    livraison: number
    id_point_relais: unknown,
    datetime_update: string
    livret: true,
    rid_commande: unknown,
    carte_retiree: boolean
    carte_retiree_datetime: unknown,
    contact_banque_pop: unknown,
    statut: unknown,
    valid_datedebut: string
    valid_datefin: string
    id_commune: number
    id_statut: boolean
}

type BadgeItem = {
    id_badge: number
    datetime: string
}

export type SuggestedAvantage = {
    id_avantage: number
}
