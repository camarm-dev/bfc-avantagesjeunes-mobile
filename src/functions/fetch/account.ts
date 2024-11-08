import {get, handleResponse, post} from "@/functions/fetch/tools"
import {APIResponse} from "@/functions/fetch/interfaces"
import {removeCredentials} from "@/functions/credentials"
import {Account, FinishSigningData} from "@/types/account"

async function checkFirstConnectionCode(number: string, code: string): Promise<APIResponse> {
    const url = import.meta.env.VITE_API_URL + "/api/compte/checkCodeConnexionInfos"
    const data = {
        numero: number,
        code_connexion: code,
        token: ""
    }
    return await post(url, data, true, false)
}

async function changePasswordOnAccountCreation(number: string, id: number, password: string, passwordConfirm: string, code: string, photo: string) {
    const url = import.meta.env.VITE_API_URL + "/api/compte/create"
    const data = {
        numero: number,
        passwordNew: password,
        passwordConfirm: passwordConfirm,
        id_carte: id,
        code_connexion: code,
        logo: photo
    }
    return await post(url, data, true, false)
}

async function finishAccountCreation(id: number, account: FinishSigningData) {
    const url = import.meta.env.VITE_API_URL + "/api/carte/createOrUpdate"
    const data = {
        id_carte: id,
        data: account
    }
    return await post(url, data, true, false)
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
        localStorage.removeItem("firstConnectionDisclaimer")
        location.reload()
    })
}

export {
    checkFirstConnectionCode,
    finishAccountCreation,
    changePasswordOnAccountCreation,
    getToken,
    getAccount,
    updateAccount,
    logOut,
    getUser,
    updatePhoto
}
