import {changedVibration} from "@/functions/native/tools";
import {RefresherCustomEvent} from "@ionic/vue";

function refresh(event: RefresherCustomEvent) {
    const reloadEvent = new Event('reload')
    window.dispatchEvent(reloadEvent)
    setTimeout(async () => {
        await event.target.complete()
        await changedVibration()
    }, 1500)
}

export {
    refresh
}
