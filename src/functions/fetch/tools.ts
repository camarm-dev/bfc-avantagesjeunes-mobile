import {getToken, logOut} from "@/functions/fetch/account"
import { APIResponse } from "@/functions/fetch/interfaces"
import { displayToast } from "@/functions/toasts"
import {getCredentials} from "@/functions/credentials"


// const successCodes = [200, 201]

function getIDFromToken(token: string) {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))

    return JSON.parse(jsonPayload)["id_compte"]
}

async function post(url: string, data: any, cors = true) {
    if (data) data["token"] = localStorage.getItem("currentCardToken")

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded,application/json",
            "KOREDGE-API-KEY": "cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B",
            "Sec-Fetch-Site": "same-site"
        },
        mode: cors ? "cors": "no-cors",
        url: url
    } as any

    if (data) config.body = JSON.stringify(data)

    return await handleResponse(fetch(url, config), true, config)
}


async function get(url: string) {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded,application/json",
            "KOREDGE-API-KEY": "cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B"
        },
        url: url
    } as any
    return await handleResponse(fetch(url, config), true, config)
}


async function handleResponse(request: Promise<Response>, checks = true, requestConfig: Request): Promise<APIResponse> {
    const requestClone = {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
    }
    if (requestConfig.body) requestClone.body = requestConfig.body
    try {
        const response = await request
        const data = await response.json()
        return data
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    } catch (err: any) {
        console.log(err)
        if (checks) {
            const userCards = await getCredentials()
            if (userCards.length > 0) {
                let userCreds = {
                    numero: "",
                    password: ""
                }
                for (const card of userCards) {
                    if (card.id == localStorage.getItem("currentCardId")) {
                        userCreds = card
                    }
                }
                localStorage.setItem("currentCardToken", (await getToken(userCreds.numero, userCreds.password)).token || "")
                const newRequest = fetch(requestConfig.url, requestClone)
                return await handleResponse(newRequest,false, requestConfig)
            } else {
                // await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
                logOut()
                // setTimeout(() => {
                //     location.href = '/resume'
                // }, 3000)
            }
        } else {
            if (err.response) await displayToast(`Error ${err.response.data.status}`, err.response.data.message, 2000, "danger")
            else {
                // await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
                // setTimeout(() => {
                //     location.href = '/resume'
                // }, 3000)
            }
        }
        if (err.response) {
            err.response.code = err.response.status
            return err.response
        }
        return { code: 500, message: "Unknown error occurred", data: {}, status: false }
    }
}

export {
    handleResponse,
    post,
    get,
    getIDFromToken
}
