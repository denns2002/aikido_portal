export interface IEvent {
    id?: number
    name: string
    reg_start: string
    reg_end: string
    date_start: string
    date_end: string
    address?: string
    about: string
    is_attestation?: boolean
    attestation_date?: string
    is_seminar?: boolean
    seminar_date?: string
    slug?: string
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
