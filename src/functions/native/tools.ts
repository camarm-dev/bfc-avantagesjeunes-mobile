import {Haptics, ImpactStyle} from '@capacitor/haptics';


async function vibrate() {
    await Haptics.impact({ style: ImpactStyle.Medium })
}

async function endVibration() {
    await Haptics.selectionStart()
}

async function changedVibration() {
    await Haptics.impact({ style: ImpactStyle.Light });
}

export {
    vibrate,
    endVibration,
    changedVibration
}
