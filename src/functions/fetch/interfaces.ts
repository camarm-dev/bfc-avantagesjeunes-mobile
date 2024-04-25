interface APIResponse {
    code: number,
    message: string,
    data: any
    token?: string
    compte?: any
    status: boolean
}

interface Card {
    numero: string
    password: string
}

export type {
    APIResponse,
    Card
}
