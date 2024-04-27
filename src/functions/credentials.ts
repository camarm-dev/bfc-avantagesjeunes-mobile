import {Card} from "@/functions/fetch/interfaces";
import { SecureStorage } from "@aparajita/capacitor-secure-storage";

export async function setCredentials(object: Card[]): Promise<void> {
    return await SecureStorage.setItem('connectedCardsCredentials', JSON.stringify(object))
}

export async function getCredentials(): Promise<Card[]> {
    return JSON.parse(await SecureStorage.getItem('connectedCardsCredentials') || '[]') as Card[]
}

export async function removeCredentials() {
    return await SecureStorage.removeItem('connectedCardsCredentials')
}
