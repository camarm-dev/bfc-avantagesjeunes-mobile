import {handleResponse, get} from "@/functions/fetch/tools";


async function getAvantage(id: string) {
    const url = import.meta.env.VITE_API_URL + '/api/avantage/detail/' + id
    return await get(url)
}

export {
    getAvantage
}
