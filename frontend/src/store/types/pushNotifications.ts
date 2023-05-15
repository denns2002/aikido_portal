export interface IPushNotification {
    id: string
	type: PushNotificationType
	message: string
}

export enum PushNotificationType {
	Success,
	Error
}

export interface PushNotificationsState {
    notifications: IPushNotification[]
}
