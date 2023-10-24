import {get, post} from "@/functions/fetch/tools";
import {getAccount} from "@/functions/fetch/account";
import {displayToast} from "@/functions/toasts";


async function getAvantage(id: string) {
    const url = import.meta.env.VITE_API_URL + '/api/avantage/detail/' + id
    return await get(url)
}

async function addFavori(id_avantage: string) {
    const url = import.meta.env.VITE_API_URL + '/api/social/addAvantageFavori'
    const data = {
        id: localStorage.getItem('currentCardId'),
        id_avantage: id_avantage
    }
    return await post(url, data)
}

async function removeFavori(id_avantage: string) {
    const url = import.meta.env.VITE_API_URL + '/api/social/deleteAvantageFavori'
    const data = {
        id: localStorage.getItem('currentCardId'),
        id_avantage: id_avantage
    }
    return await post(url, data)
}

async function checkAvailability(id_avantage: string) {
    const url = import.meta.env.VITE_API_URL + '/api/carte/checkAvantageAvailabilities'
    const data = {
        id_avantage: id_avantage,
        array_id: [(await getAccount()).carte.id_carte]
    }
    return await post(url, data)
}

async function addTransactionAdvantage(id_avantage: string, id_organisme: string, id_carte: string) {
    const url = import.meta.env.VITE_API_URL + '/api/carte/addTransaction'
    const data = {
        array_id: [id_carte],
        id_avantage: id_avantage,
        id_organisme: id_organisme,
        date_transaction: new Date
    }
    return await post(url, data)
}

async function getAdvantageCode(id_avantage: string, id_organisme: string, id_carte: string, mode_paiement: string) {
    const url = import.meta.env.VITE_API_URL + '/api/avantage/obtenirCode'
    const data = {
        cartes: [id_carte],
        type: mode_paiement,
        organisme: id_organisme,
        avantage: id_avantage
    }
    return await post(url, data)
}

async function obtainAdvantage(id_avantage: string, id_organisme: string) {
    const user = await getAccount()
    console.log(id_organisme)
    const id_carte = user.carte.id_carte
    const mode_paiement = user.carte.mode_paiement
    await addTransactionAdvantage(id_avantage, id_organisme, id_carte)
    const response = await getAdvantageCode(id_avantage, id_organisme, id_carte, mode_paiement)
    if (response.status_code == 10) {
        await displayToast('Rendez-vous en magasin', 'Cet avantage ne nécessite pas de code... Présentez vous sur place avec votre carte !', 5000, 'primary')
        return
    }
    if (!response.status) {
        await displayToast('Échec', 'Une erreur inconnue est survenue...', 2000, 'danger')
        return
    }
}

export {
    getAvantage,
    addFavori,
    removeFavori,
    obtainAdvantage,
    checkAvailability
}
