import {get} from "@/functions/fetch/tools"

async function getPosition(address: string) {
    const url = "https://geocode.maps.co/search?q=" + encodeURIComponent(address)
    const response = await get(url) as unknown as [unknown]
    return response[0]
}

export {
    getPosition
}
