export interface IClub {
    id?: number
    name: string
    info: string
    address?: string
    slug: string
    is_active: boolean
    groups: number[]
    photos: number[]
    managers?: number[]
}

export interface IClubList {
    count: number
    next: string
    previous: string
    results: IClub[]
}