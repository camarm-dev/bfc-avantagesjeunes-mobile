import {get, post} from "@/functions/fetch/tools";


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
        array_id: [localStorage.getItem('currentCardId')]
    }
    return await post(url, data)
}

async function useAdvantage(id_avantage: string) {
    const url = import.meta.env.VITE_API_URL + '/api/carte/'
    const data = {

    }
}

export {
    getAvantage,
    addFavori,
    removeFavori
}
