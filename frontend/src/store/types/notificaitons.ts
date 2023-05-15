export interface INotification {
	id: number
	title: string
	message: string
	timestamp: string
}

export interface INotificationWrapper {
	id: number
	notification: INotification
	is_read: boolean
	user: number
}

export interface INotificationList {
	count: number
	next: string
	previous: string
	results: INotificationWrapper[]
}
