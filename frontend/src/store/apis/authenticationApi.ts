import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {
	ISignInData,
	ISignUpData,
} from "../types/authentication"
import { tokenService } from "../services/tokens"
import { ITokens } from "../types"

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	tagTypes: ["Authentication"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/auth",
		prepareHeaders: (headers) => {
			const access = tokenService.getLocalAccessToken()

			if (access) {
				headers.set("Authorization", `JWT ${access}`)
			}

			return headers
		},
	}),
	endpoints: (builder) => ({
		getConfirmEmail: builder.query<void, string>({
			query: (token) => ({
				url: `/confirm-email/?token=${token}`,
				method: `GET`,
			})
		}),
		postSignIn: builder.mutation<ISignInData, ISignInData>({
			query: (data) => ({
				url: `/login/`,
				method: "POST",
				body: data,
			}),
		}),
		postLogout: builder.mutation<ITokens, ITokens>({
			query: (tokens) => ({
				url: `/logout/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postRefreshToken: builder.mutation<ITokens, {refresh: string}>({
			query: (tokens) => ({
				url: `/refresh/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postAddUser: builder.mutation<ISignUpData, ISignUpData>({
			query: (data) => ({
				url: `/register/`,
				method: "POST",
				body: data,
			}),
		}),
		postVerifyToken: builder.mutation<{refresh: string}, {refresh: string}>({
			query: (token) => ({
				url: `/verify/`,
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
