import { modalController } from "@ionic/vue";
import { Component } from "vue";
import { ComponentRef } from "@ionic/core"

const closeModalEvent = new Event('closeModals')

function closeModals() {
    window.dispatchEvent(closeModalEvent)
}

async function createModal(component: Component, refName: string, refs: any, props = { }) {
    refs[refName].value = await modalController.create({
        component: component as ComponentRef,
        canDismiss: true,
        componentProps: props,
        presentingElement: refs['page'].$el
    })
    await refs[refName].value.present()
}

export {
    closeModals,
    createModal
}
