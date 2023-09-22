interface DuleEvent {
    name: string
    startsAt: string
    endsAt: string
    updatedAt: string
    displayStartsAt?: string
    displayEndsAt?: string
    id?: string
    _id?: string
}

interface DuleNote {
    name: string
    content: string
    updatedAt: string
    id?: string
    _id?: string
}

interface DuleTask {
    tasklist: string
    content: string
    updatedAt: string
    checked: boolean
    id?: string
    _id?: string
}

interface DuleTasklist {
    name: string
    tasks: DuleTask[]
    id?: string
    _id?: string
}

interface DuleRecentActivityItem {
    name: string,
    tasks: number
    tasksCompleted: number,
    isTasklist: boolean
}

interface DuleIncomingEventItem {
    name: string
    label: string
    id: string
    isReminder: boolean
}

interface Reminder {
    ringsAt: Date | string
    isReminder: boolean
    name: string
    notificationDescriptor: number
}

interface Reminders {
    [key: string]: Reminder
}

export type {
    DuleEvent,
    DuleNote,
    DuleTask,
    DuleTasklist,
    DuleRecentActivityItem,
    DuleIncomingEventItem,
    Reminder,
    Reminders
}
