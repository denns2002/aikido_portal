export interface IGroup {
    id: number | null
    name: string
    number: string
    slug: string
    trainers: number[]
}

export interface GroupsState {
    groups: IGroup[]
    isLoading: boolean
}
