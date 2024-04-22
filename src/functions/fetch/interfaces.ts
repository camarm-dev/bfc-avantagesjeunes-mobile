interface APIResponse {
    code: number,
    message: string,
    data: any
    token?: string
    compte?: any
}

interface Card {
    numero: string
    password: string
}

export type {
    APIResponse,
    Card
}
