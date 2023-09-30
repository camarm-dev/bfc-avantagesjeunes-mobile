import {get} from "@/functions/fetch/tools";

async function getPosition(address: string) {
    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address)
    return (await get(url))[0]
}

export {
    getPosition
}
