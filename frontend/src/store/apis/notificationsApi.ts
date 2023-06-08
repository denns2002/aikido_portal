import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {
	INotification,
	INotificationList,
	INotificationWrapper,
} from "../types/notificaitons"
import { tokenService } from "../services/tokens"
import { customFetchBase } from "./customFetchBase"

export const notificationsApi = createApi({
	reducerPath: "notificationsApi",
	tagTypes: ["Notifications"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getNotifications: builder.query<INotificationList, number>({
			query: (page) => ({ url: `/?page=${page}`, method: "GET" }),
			providesTags: (result) =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: "Notifications" as const,
								id,
							})),
							{ type: "Notifications", id: "LIST" },
					  ]
					: [{ type: "Notifications", id: "LIST" }],
		}),
		postAddNotification: builder.mutation<INotification, INotification>({
			query: (notification) => ({
				url: `/add/`,
				method: "POST",
				body: notification,
			}),
			invalidatesTags: [{ type: "Notifications", id: "LIST" }],
		}),
		postConnectNotifications: builder.mutation<
			INotificationWrapper,
			INotificationWrapper
		>({
			query: (wrapper) => ({
				url: `/connect/`,
				method: "POST",
				body: wrapper,
			}),
			invalidatesTags: [{ type: "Notifications", id: "LIST" }],
		}),
	}),
})

export const {
	useGetNotificationsQuery,
	usePostAddNotificationMutation,
	usePostConnectNotificationsMutation,
} = notificationsApi
