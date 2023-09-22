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
    }

    return await handleResponse(fetch(url, config))
}

async function getAccount() {
    const url = import.meta.env.VITE_API_URL + '/api/compte/getInfo'
    const data = {
        token: localStorage.getItem('currentCardToken'),
        id: localStorage.getItem('currentCardId')
    }
    return (await post(url, data)).compte
}

function logOut(number: string) {
    const cards = getConnectedCards()
    for (const card of cards) {
        if (card.numero == number) {
            cards.splice(cards.indexOf(card), 1)
        }
    }
    localStorage.setItem('userCards', JSON.stringify(cards))
}

export {
    getToken,
    getAccount,
    logOut,
    getConnectedCards
}
