export interface IClub {
    id: number
    name: string
    info: string
    slug: string
    addresses: number[]
    groups: number[]
    photos: number[]
}

export interface IClubList {
    count: number
    next: string
    previous: string
    results: IClub[]
}