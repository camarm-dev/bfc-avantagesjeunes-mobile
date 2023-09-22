import {LocalNotifications} from '@capacitor/local-notifications'
import {displayToast} from "@/functions/toasts";
import {Reminder, Reminders} from "@/functions/interfaces";

const Notifications = LocalNotifications

async function setupActions() {
    await Notifications.registerActionTypes({
        types: [
            {
                id: 'repeat',
                actions:[
                    {
                        id: 'repeat-5-minutes',
                        title: 'Remind me in 5 minutes'
                    },
                    {
                        id: 'repeat-15-minutes',
                        title: 'Remind me in 15 minutes'
                    }
                ]
            }
        ]
    })
    Notifications.addListener('localNotificationActionPerformed', (action) => {
        let date
        if (action.actionId == 'repeat-5-minutes') {
            date = new Date()
            date.setMinutes(date.getMinutes() + 5, 0, 0)
        } else {
            date = new Date()
            date.setMinutes(date.getMinutes() + 15, 0, 0)
        }
        addReminder(date, `${action.notification.extra.name} (+${date.getMinutes()}min)`)
    })
}

async function hasPermission() {
    return (await Notifications.checkPermissions()).display == 'granted'
}

async function checkAndAskPermission() {
    if (!await hasPermission()) {
        await Notifications.requestPermissions()
    } else {
        await setupActions()
    }
}

function getReminders(): Reminders {
    return JSON.parse(localStorage.getItem('userReminders') || "{}")
}

function saveReminders(reminders: Reminders) {
    localStorage.setItem('userReminders', JSON.stringify(reminders))
}

async function deleteReminder(uid: string) {
    const reminders = getReminders()
    if (uid in reminders) {
        const toDelete = reminders[uid]
        delete reminders[uid]
        await Notifications.cancel({
            notifications: [
                {
                    id: toDelete.notificationDescriptor
                }
            ]
        })
        saveReminders(reminders)
    }
}

async function addReminder(ringsAt: Date | string, name: string) {
    await checkAndAskPermission()
    if (await hasPermission()) {
        const reminders = getReminders()
        const uid = `id${new Date().getTime()}`
        const ringsAtDate = new Date(ringsAt)
        const hours = `${ringsAtDate.getHours().toString().length == 1 ? '0': ''}${ringsAtDate.getHours().toString()}`
        const minutes = `${ringsAtDate.getMinutes().toString().length == 1 ? '0': ''}${ringsAtDate.getMinutes().toString()}`
        const notificationDescriptor = (await Notifications.schedule({
            notifications: [
                {
                    title: `${name}`,
                    body: `It's time ! '${name}'`,
                    largeBody: `You have set the reminder '${name}' for ${hours}:${minutes}`,
                    sound: '/public/tone.ogg',
                    smallIcon: 'ic_stat_notify',
                    largeIcon: 'ic_stat_notify',
                    actionTypeId: 'repeat',
                    extra: {
                        id: uid,
                        name: name
                    },
                    id: Math.random(),
                    schedule: {
                        at: new Date(ringsAt)
                    }
                }
            ]
        })).notifications[0].id
        reminders[uid] = {
            ringsAt: ringsAt,
            name: name,
            isReminder: true,
            notificationDescriptor: notificationDescriptor
        } as Reminder
        saveReminders(reminders)
    } else {
        await displayToast('Operation aborted', 'Reminder cannot be added because notifications permission cannot be acquired.', 4000, 'danger')
    }
}

export {
    addReminder,
    deleteReminder,
    getReminders
}

