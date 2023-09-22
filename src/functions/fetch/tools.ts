// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "@/functions/fetch/account";
import { APIResponse } from "@/functions/fetch/interfaces";
import { displayToast } from "@/functions/toasts";


// const successCodes = [200, 201]

function getIDFromToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)['id_compte'];
}

async function post(url: string, data: any) {
    data['token'] = localStorage.getItem('currentCardToken')

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


async function get(url: string) {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded,application/json',
            'KOREDGE-API-KEY': 'cNkLdXwQc7G8fRe0FGGCOOZcrkJHbY3B'
        }
    }
    return await handleResponse(fetch(url, config))
}


async function handleResponse(request: Promise<Response>, checks = true): Promise<APIResponse> {
    try {
        const response = await request
        const data = await response.json()
        return data
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    } catch (err: any) {
        console.log(err)
        if (checks) {
            const stringUserCreds = localStorage.getItem('userCards')
            if (stringUserCreds) {
                const userCards = JSON.parse(stringUserCreds)
                let userCreds = {
                    numero: '',
                    password: ''
                }
                for (const card of userCards) {
                    if (card.id == localStorage.getItem('currentCardId')) {
                        const userCreds = card
                    }
                }
                localStorage.setItem('currentCardToken', (await getToken(userCreds.numero, userCreds.password)).token || '')
                const cloned = (await request).clone()
                const promisedNewRequest = new Promise(resolve => {
                    resolve(cloned)
                })
                return handleResponse(promisedNewRequest, false)
            } else {
                await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
                setTimeout(() => {
                    location.href = '/dash/resume'
                }, 3000)
            }
        } else {
            if (err.response) await displayToast(`Error ${err.response.data.status}`, err.response.data.message, 2000, 'danger')
            else {
                await displayToast('Error', 'Unable to access API: forbidden. Please (re)login.', 3000, 'danger')
                setTimeout(() => {
                    location.href = '/dash/resume'
                }, 3000)
            }
        }
        err.response.code = err.response.status
        return err.response
    }
}

export {
    handleResponse,
    post,
    get,
    getIDFromToken
}