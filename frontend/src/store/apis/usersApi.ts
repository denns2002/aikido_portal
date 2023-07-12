import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { ISignInData } from "../types/users"
import { customFetchBase } from "./customFetchBase"
import { ITokens } from "../types/tokens";

export const usersApi = createApi({
	reducerPath: "usersApi",
	tagTypes: ["Authentication"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		postSignIn: builder.mutation<ISignInData, ISignInData>({
			query: (data) => ({
				url: `/users/login/`,
				method: "POST",
				body: data,
			}),
		}),
		postSignOut: builder.mutation<{ refresh: string }, { refresh: string }>(
			{
				query: (refresh) => ({
					url: `/users/logout/`,
					method: "POST",
					body: refresh,
				}),
			}
		),
		putActivatingId: builder.mutation<
			{ is_active: boolean },
			{ id: number; is_active: boolean }
		>({
			query: ({ id, is_active }) => ({
				url: `/users/activating/${id}/`,
				method: "PUT",
				body: { is_active: is_active },
			}),
		}),
		patchActivatingId: builder.mutation<
			{ is_active: boolean },
			{ id: number; is_active: boolean }
		>({
			query: ({ id, is_active }) => ({
				url: `/users/activating/${id}/`,
				method: "PATCH",
				body: { is_active: is_active },
			}),
		}),
		postRefreshToken: builder.mutation<ITokens, { refresh: string }>({
			query: (tokens) => ({
				url: `/auth/refresh/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postVerifyToken: builder.mutation<{ token: string }, { token: string }>(
			{
				query: (token) => ({
					url: `/users/verify/`,
					method: "POST",
					body: token,
				}),
			}
		),
		// patchChangePassword: builder.mutation<IChangePassword, IChangePassword>(
		// 	{
		// 		query: (password) => ({
		// 			url: `/users/change-password/`,
		// 			method: "PATCH",
		// 			body: password,
		// 		}),
		// 	}
		// ),
	}),
})

export const {
	usePostSignInMutation,
	usePostSignOutMutation,
	usePostRefreshTokenMutation,
	usePostVerifyTokenMutation,
	usePatchActivatingIdMutation,
	usePutActivatingIdMutation,
} = usersApi
