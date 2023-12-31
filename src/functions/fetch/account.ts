import {handleResponse, post} from "@/functions/fetch/tools";
import {APIResponse, Card} from "@/functions/fetch/interfaces";

function getConnectedCards(): Card[] {
    return JSON.parse(localStorage.getItem('userCards') || "[]")
}

async function getToken(number: string, password: string): Promise<APIResponse> {
    const url = import.meta.env.VITE_API_URL + '/api/compte/login'
    const data = {
        numero: number,
        password: password
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded,application/json',
            'KOREDGE-API-KEY': 'cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B'
        }
    } as any

    return await handleResponse(fetch(url, config), true, config)
}

async function getAccount() {
    const url = import.meta.env.VITE_API_URL + '/api/compte/getInfo'
    const data = {
        token: localStorage.getItem('currentCardToken'),
        id: localStorage.getItem('currentCardId')
    }
    return (await post(url, data)).compte
}


async function updateAccount(user: any) {
    const url = import.meta.env.VITE_API_URL + '/api/compte/update'
    const data = {
        token: localStorage.getItem('currentCardToken'),
        id: localStorage.getItem('currentCardId'),
        data: user
    }
    return await post(url, data)
}

function logOut() {
    localStorage.removeItem('userCards')
    localStorage.removeItem('userAppearance')
    localStorage.removeItem('currentCardToken')
    localStorage.removeItem('currentCardId')
    localStorage.removeItem('cardImageRecto')
    localStorage.removeItem('cardImageVerso')
    location.reload()
}

export {
    getToken,
    getAccount,
    updateAccount,
    logOut,
    getConnectedCards
}
