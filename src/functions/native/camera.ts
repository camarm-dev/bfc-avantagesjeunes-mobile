import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {modalController} from "@ionic/vue";
import ResizeImageModal from "@/components/ResizeImageModal.vue";


async function openImageResizingModal(image: string, event: string) {
    const modal = await modalController.create({
        component: ResizeImageModal,
        canDismiss: true,
        componentProps: {
            base64Image: image,
            event: event
        }
    })
    window.addEventListener('closeResizingModal', () => {
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

async function saveCardImage(savingId: string, text: string, callback: CallableFunction) {
    const photo = await takePhoto(text)
    const base64Image = `data:image/jpeg;base64,` + photo.base64String as string
    await openImageResizingModal(base64Image, savingId)

    // @ts-ignore
    window.addEventListener(savingId, (event: CustomEvent) => {
        const resizedBase64Image = event.detail.image
        localStorage.setItem(savingId, resizedBase64Image)
        callback()
    })
}

export {
    saveCardImage
}
