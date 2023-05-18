import { IProfile } from './profile';
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

export interface ITrainer {
    trainer: IProfile
}

export interface ITrainerList {
    count: number
    next: string
    previous: string
    results: ITrainer[]
}

export interface ITrainerGroup {
    name: string 
    number: number
    groupmember_count: number
    slug: string
}

export interface ITrainerGroupList {
    count: number
    next: string
    previous: string
    results: ITrainerGroup[]
}
