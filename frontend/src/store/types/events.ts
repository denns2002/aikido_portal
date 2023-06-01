export interface IEvent {
    id?: number
    name: string
    reg_start: string
    reg_end: string
    date_start: string
    date_end: string
    about: string
    is_attestation?: boolean
    attestation_date?: string
    is_seminar?: boolean
    seminar_date?: string
    slug?: string
    addresses?: number | null
    members?: number[]
    organizers?: number[]
    co_organizers?: number[]
}

export interface IEventList {
    count: number
    next: string
    previous: string
    results: IEvent[]
}

export const monthes = {
    "01": "января",
    "02": "февраля",
    "03": "марта",
    "04": "апреля",
    "05": "мая",
    "06": "июня",
    "07": "июля",
    "08": "августа",
    "09": "сентября",
    "10": "октября",
    "11": "ноября",
    "12": "декабря",
}