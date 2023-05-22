export interface IClub {
    id?: number
    name: string
    info: string
    slug: string
    addresses: number[]
    groups: number[]
    photos: number[]
    is_active: boolean
}

export interface IClubList {
    count: number
    next: string
    previous: string
    results: IClub[]
}