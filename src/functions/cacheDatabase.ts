import {displayToast} from "@/functions/toasts";

export async function getCacheDb(): Promise<IDBDatabase> {
    const openRequest = indexedDB.open('advantagesCache', 1)

    openRequest.onupgradeneeded = function() {
        console.log('[Cache] Database created')
        const db = openRequest.result
        db.createObjectStore('avantages', { keyPath: 'id_avantage' });
    }

    openRequest.onerror = function() {
        console.log("[Cache] Error;", openRequest.error);
        displayToast("Erreur de chargement du cache", "Le cache n'a pas pu être chargé correctement.", 5000, "danger")
    };

    return new Promise(resolve => {
        openRequest.onsuccess = function() {
            resolve(openRequest.result)
        }
    })
}
