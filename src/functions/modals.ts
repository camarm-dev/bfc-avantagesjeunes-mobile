import { modalController } from "@ionic/vue";
import { Component } from "vue";
import { ComponentRef } from "@ionic/core"

const closeModalEvent = new Event('closeModals')

function closeModals() {
    window.dispatchEvent(closeModalEvent)
}

async function createModal(component: Component, refName: string, refs: any, props = { }, isSheet: boolean = false, breakpoints: number[] = [0, 0.75, 0.95]) {
    refs[refName].value = await modalController.create({
        component: component as ComponentRef,
        canDismiss: true,
        componentProps: props,
        presentingElement: isSheet ? undefined: refs['page'].$el,
        initialBreakpoint: isSheet ? breakpoints[1]: undefined,
        breakpoints: isSheet ? breakpoints: undefined,
    })
    await refs[refName].value.present()
}

export {
    closeModals,
    createModal
}
