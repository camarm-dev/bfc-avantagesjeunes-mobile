import { Geolocation } from '@capacitor/geolocation';

async function hasPermission() {
    const response = await Geolocation.checkPermissions()
    return response.location === 'granted'
}

async function askPermission() {
    await Geolocation.requestPermissions()
}

async function getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition()
    return [coordinates.coords.longitude, coordinates.coords.latitude]
}

export {
    hasPermission,
    askPermission,
    getCurrentLocation
}
