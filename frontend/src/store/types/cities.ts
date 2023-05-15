export interface IRegion {
	name: string
}

export interface ICity {
	region: IRegion
	name: string
	id: number
}

export interface ICitiesList {
    count: number
	next: string
	previous: string
	results: ICity[]
}