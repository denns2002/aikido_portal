export interface IGroup {
    id: number
    name: string
    number: string
    slug: string
    trainers: number[]
}

export interface IGroupList {
    count: number
    next: string
    previous: string
    results: IGroup[]
}
