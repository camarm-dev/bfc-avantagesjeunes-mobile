import {get, handleResponse, post} from "@/functions/fetch/tools"
import {APIResponse} from "@/functions/fetch/interfaces"
import {removeCredentials} from "@/functions/credentials"
import {Account} from "@/types/account"

// TODO
async function checkFirstConnectionCode(number: string, code: string): Promise<APIResponse> {
    const url = import.meta.env.VITE_API_URL + "/api/compte/checkCodeConnexionInfos"
    const data = {
        numero: number,
        code_connexion: code,
        token: ""
    }
    // TODO; need headers ?
    return await post(url, data)
}

// TODO
async function finishSigning(number: string, email: string, password: string) {
    const url = import.meta.env.VITE_API_URL + "/api/compte/???"
    const data = {
        numero: number,
        email,
    }
}

async function getToken(number: string, password: string, checks = true): Promise<APIResponse> {
    const url = import.meta.env.VITE_API_URL + "/api/compte/login"
    const data = {
        numero: number,
        password: password
    }

    const config = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded,application/json",
            "KOREDGE-API-KEY": "cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B"
        }
    } as any

    return await handleResponse(fetch(url, config), checks, config)
}

async function getAccount(): Promise<Account> {
    const url = import.meta.env.VITE_API_URL + "/api/compte/getInfo"
    const data = {
        token: localStorage.getItem("currentCardToken"),
        id: localStorage.getItem("currentCardId")
    }
    return (await post(url, data)).compte as Account
}

async function getUser(id: number): Promise<Account> {
    const url = import.meta.env.VITE_API_URL + `/api/compte/detail/${id}`
    return (await get(url)).compte as Account
}


async function updateAccount(user: Account) {
    const url = import.meta.env.VITE_API_URL + "/api/compte/update"
    const data = {
        token: localStorage.getItem("currentCardToken"),
        id: localStorage.getItem("currentCardId"),
        data: user
    }
    return await post(url, data)
}

async function updatePhoto(image: string) {
    const url = import.meta.env.VITE_API_URL + "/api/compte/updatePhoto"
    const data = {
        token: localStorage.getItem("currentCardToken"),
        id: localStorage.getItem("currentCardId"),
        logo: image
    }
    return await post(url, data)
}

function logOut() {
    removeCredentials().then(() => {
        localStorage.removeItem("userAppearance")
        localStorage.removeItem("currentCardToken")
        localStorage.removeItem("currentCardId")
        localStorage.removeItem("frontCardImage")
        localStorage.removeItem("backCardImage")
        localStorage.removeItem("advantagesCache")
        localStorage.removeItem("userApiUrl")
        location.reload()
    })
}

export {
    checkFirstConnectionCode,
    getToken,
    getAccount,
    updateAccount,
    logOut,
    getUser,
    updatePhoto
}
