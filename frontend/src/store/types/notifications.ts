export interface INotification {
    id: string
	type: NotificationType
	message: string
}

export enum NotificationType {
	Success,
	Error
}

export interface NotificationsState {
    notifications: INotification[]
}
