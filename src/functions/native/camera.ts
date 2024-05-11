import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import {modalController} from "@ionic/vue"
import ResizeImageModal from "@/components/ResizeImageModal.vue"
import {displayToast} from "@/functions/toasts";
import { Preferences } from '@capacitor/preferences';


async function openImageResizingModal(image: string, event: string) {
    const modal = await modalController.create({
        component: ResizeImageModal,
        canDismiss: true,
        componentProps: {
            base64Image: image,
            event: event
        }
    })
    window.addEventListener("closeResizingModal", () => {
        modal.dismiss()
    })
    await modal.present()
}

async function takePhoto(text: string) {
    return await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: false,
        promptLabelHeader: text
    })
}

async function getPhoto() {
    const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 20,
        allowEditing: true
    })
    return image.base64String as string
}

async function saveCardImage(savingId: string, text: string, callback: CallableFunction) {
    const photo = await takePhoto(text)
    const base64Image = "data:image/jpeg;base64," + photo.base64String as string
    await openImageResizingModal(base64Image, savingId)

    // @ts-ignore
    window.addEventListener(savingId, (event: CustomEvent) => {
        const resizedBase64Image = event.detail.image
        try {
            setImage(savingId, resizedBase64Image).then(() => {
                callback()
            })
        } catch (e) {
            displayToast('Error', `${e}`, 10000, 'danger')
        }
    })
}

async function getImage(imageId: string) {
    return (await Preferences.get({ key: imageId })).value
}

async function setImage(imageId: string, base64Image: string) {
    await Preferences.set({
        key: imageId,
        value: base64Image,
    });
}

export {
    saveCardImage,
    getPhoto,
    getImage
}
