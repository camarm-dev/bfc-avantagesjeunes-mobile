import {Account} from "@/types/account"

interface APIResponse {
    code: number,
    message: string,
    data: any
    token?: string
    compte?: Account
    status: boolean
}

interface Card {
    numero: string
    password: string
    id: string
}

export type {
    APIResponse,
    Card
}
