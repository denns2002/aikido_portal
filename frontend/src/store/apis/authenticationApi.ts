import { createApi } from "@reduxjs/toolkit/dist/query/react"
import {
	ISignInData,
	ISignUpData,
} from "../types/authentication"
import { ITokens } from "../types"
import { customFetchBase } from "./customFetchBase"

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	tagTypes: ["Authentication"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getConfirmEmail: builder.query<void, string>({
			query: (token) => ({
				url: `/auth/confirm-email/?token=${token}`,
				method: `GET`,
			})
		}),
		postSignIn: builder.mutation<ISignInData, ISignInData>({
			query: (data) => ({
				url: `/auth/login/`,
				method: "POST",
				body: data,
			}),
		}),
		postLogout: builder.mutation<ITokens, ITokens>({
			query: (tokens) => ({
				url: `/auth/logout/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postRefreshToken: builder.mutation<ITokens, {refresh: string}>({
			query: (tokens) => ({
				url: `/auth/refresh/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postAddUser: builder.mutation<ISignUpData, ISignUpData>({
			query: (data) => ({
				url: `/auth/register/`,
				method: "POST",
				body: data,
			}),
		}),
		postVerifyToken: builder.mutation<{refresh: string}, {refresh: string}>({
			query: (token) => ({
				url: `/auth/verify/`,
				method: "POST",
				body: token,
			}),
		}),
	}),
})

export const {
	usePostSignInMutation,
	usePostAddUserMutation,
	usePostLogoutMutation,
	usePostRefreshTokenMutation,
	usePostVerifyTokenMutation
} = authenticationApi
