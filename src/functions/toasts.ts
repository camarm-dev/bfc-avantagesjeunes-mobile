import { toastController } from "@ionic/vue";

async function displayToast(header: string, message: string, duration: number, style: "primary" | "warning" | "danger") {
    const toast = await toastController.create({
        header,
        message,
        duration,
        color: style
    })
    await toast.present()
}

export {
    displayToast
}
