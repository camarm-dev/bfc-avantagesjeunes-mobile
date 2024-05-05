import {get, post} from "@/functions/fetch/tools"
import {getAccount} from "@/functions/fetch/account"
import {displayToast} from "@/functions/toasts"
import moment from "moment"
import {Organisme} from "@/types/organismes"
import {Avantage} from "@/types/avantages"
import {cacheAdvantage, getCachedAdvantage} from "@/functions/cache"


async function getAvantage(id: string | number, force = false): Promise<Avantage> {
    const avantage = await getCachedAdvantage(id)
    if (avantage && !force) {
        return avantage
    }
    const url = import.meta.env.VITE_API_URL + "/api/avantage/detail/" + id
    const document = await get(url) as any as Avantage
    await cacheAdvantage(document)
    return document
}

async function addFavori(id_avantage: string | number) {
    const url = import.meta.env.VITE_API_URL + "/api/social/addAvantageFavori"
    const data = {
        id: localStorage.getItem("currentCardId"),
        id_avantage: id_avantage
    }
    return await post(url, data)
}

async function removeFavori(id_avantage: string | number) {
    const url = import.meta.env.VITE_API_URL + "/api/social/deleteAvantageFavori"
    const data = {
        id: localStorage.getItem("currentCardId"),
        id_avantage: id_avantage
    }
    return await post(url, data)
}

async function checkAvailability(id_avantage: string | number) {
    const url = import.meta.env.VITE_API_URL + "/api/carte/checkAvantageAvailabilities"
    const data = {
        id_avantage: id_avantage,
        array_id: [(await getAccount()).carte.id_carte]
    }
    return await post(url, data)
}

async function addTransactionAdvantage(id_avantage: string | number, id_organisme: string | number, id_carte: string | number) {
    const url = import.meta.env.VITE_API_URL + "/api/carte/addTransaction"
    const data = {
        array_id: [id_carte],
        id_avantage: id_avantage,
        id_organisme: id_organisme,
        date_transaction: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
    return await post(url, data)
}

async function getAdvantageCode(id_avantage: string | number, id_organisme: string | number, id_carte: string | number, mode_paiement: string | number) {
    const url = import.meta.env.VITE_API_URL + "/api/avantage/obtenirCode"
    const data = {
        cartes: [id_carte],
        type: mode_paiement,
        organisme: id_organisme,
        avantage: id_avantage
    }
    return await post(url, data)
}

async function obtainAdvantage(id_avantage: string | number, id_organisme: string | number) {
    const user = await getAccount()
    const id_carte = user.carte.id_carte
    const mode_paiement = user.carte.mode_paiement
    await addTransactionAdvantage(id_avantage, id_organisme, id_carte)
    const response = await getAdvantageCode(id_avantage, id_organisme, id_carte, mode_paiement) as any
    if (response.status_code == 10) {
        await displayToast("Rendez-vous en magasin", "Cet avantage ne nécessite pas de code... Présentez vous sur place avec votre carte !", 5000, "primary")
        return
    }
    if (!response.status) {
        await displayToast("Échec", "Une erreur inconnue est survenue...", 2000, "danger")
        return
    }
    await displayToast("Avantage confirmé", "Retrouvez le code et les instructions dans la page avantages utilisés !", 3000, "success")
}

async function getOrganisme(id_organisme: string | number): Promise<Organisme> {
    const url = `https://backoffice.avantagesjeunes.com/api/organisme/detail/${id_organisme}`
    return await get(url) as any as Organisme
}

export {
    getAvantage,
    addFavori,
    removeFavori,
    obtainAdvantage,
    checkAvailability,
    getOrganisme
}
