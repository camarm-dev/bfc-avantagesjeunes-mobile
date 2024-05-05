import {Avantage} from "@/types/avantages";
import {getCacheDb} from "@/functions/cacheDatabase";

let database = await getCacheDb()

function getCache() {
    const transaction = database.transaction('avantages', 'readwrite')
    return transaction.objectStore('avantages')
}

export async function deleteCache() {
    indexedDB.deleteDatabase('advantagesCache')
    database = await getCacheDb()
}

export async function cacheAdvantage(avantage: Avantage) {
    if (!avantage.id_avantage) {
        return false
    }
    const cache = getCache()
    const request = cache.add(avantage)
    return await new Promise((resolve, reject) => {
        request.onsuccess = resolve
        request.onerror = reject
    })
}

export async function getCachedAdvantage(id: number | string): Promise<Avantage | false> {
    const cache = getCache()
    const request = cache.get(id)
    return await new Promise(resolve => {
        request.onsuccess = () => {
            resolve(request.result)
        }
        request.onerror = () => {
            resolve(false)
        }
    })
}

export async function getCacheStats(): Promise<{ length: number, size: number }> {
    const cache = getCache()
    const request  = cache.getAll()
    return await new Promise(resolve => {
        request.onsuccess = () => {
            const result = request.result
            resolve({ length: Object.keys(result).length, size: (new Blob([JSON.stringify(result)])).size })
        }
    })
}
