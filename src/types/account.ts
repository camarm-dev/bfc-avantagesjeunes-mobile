import {Transaction, Comment, Note} from "@/types/avantages"

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
    likes: false | number[]
    notes: false | Note[]
    comments: false | Comment[]
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

export type CheckConnectionCodeInfosResponse = {
    code: {
        code: string,
        numero: string,
        rid_pack: 1,
        actif: false,
        actif_datetime: null,
        saison: string
    },
    carte: {
        id_carte: number,
        date_vente: string,
        datetime_update: string,
        nom: string,
        prenom: string,
        adresse: string,
        cp: string,
        ville: string,
        tel: string,
        tel_accepte: null,
        email: string,
        email_confirm: null,
        email_accepte: null,
        statut: number,
        numero: string,
        date_naiss: string,
        remarque: null,
        rid_tarif: number,
        valid: boolean,
        rid_admin_user: number,
        rid_pack: number,
        sexe: string,
        mode_paiement: number,
        rid_type: null,
        type_inscription: null,
        rid_compte: null,
        saison: string,
        image_carte_identite: string,
        paiement: number,
        date_paie: null,
        total: string,
        frais_port: string,
        avoir: string,
        avoir_code: string,
        rid_avoir: number,
        livraison: number,
        id_point_relais: number,
        livret: boolean,
        rid_commande: number,
        carte_retiree: boolean,
        carte_retiree_datetime: string,
        contact_banque_pop: boolean,
        valeur: null,
        monnaie: null,
        type: null,
        age: null,
        admin_utilisateur: null,
        point_relais: null
    },
    status: boolean,
    status_code: number
}

export type FinishSigningData = {
    nom: string,
    prenom: string,
    adresse: string,
    cp: string,
    ville: string,
    tel: string,
    tel_accepte: boolean,
    email_accepte: boolean,
    date_naiss: string,
    emailNew: string,
    emailConfirm: string,
    newsletter: string,
    sexe: "h" | "f" | string,
    statut: number,
    numero: string,
    id_carte: number,
    photo: string,
    email: string
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
