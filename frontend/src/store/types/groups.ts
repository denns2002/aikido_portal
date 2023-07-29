import { IProfile } from './profiles';
export interface IGroup {
    id: number
    name: string
    slug: string
    trainers: number[]
    groupmembers: IGroupMember[]
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

export interface IGroupMember {
    annual_fee: boolean
    first_name: string
    last_name: string
    mid_name: string
    avatar: string
    rank: string
    slug: string
    id: number
}
export interface ITrainerGroupMembers {
    groupmember_set: IGroupMember[]
    name: string
}

export interface ITrainerGroupMembersList {
    count: number
    next: string
    previous: string
    results: ITrainerGroupMembers[]
}

export interface IGroupMember {
    profile: IProfile
    group?: number
}
