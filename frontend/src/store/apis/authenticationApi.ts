import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {
	IChangePassword,
	IResetPasswordEmailRequest,
	ISetPassword,
	ISignInData,
	ISignUpData,
} from "../types/authentication"
import { tokenService } from "../services/tokens"

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
		postSignIn: builder.mutation<ISignInData, ISignInData>({
			query: (data) => ({
				url: `/login/`,
				method: "POST",
				body: data,
			}),
		}),
		postAddUser: builder.mutation<ISignUpData, ISignUpData>({
			query: (data) => ({
				url: `/register/`,
				method: "POST",
				body: data,
			}),
		}),
		patchChangePassword: builder.mutation<IChangePassword, IChangePassword>(
			{
				query: (password) => ({
					url: `/change-password/`,
					method: "PATCH",
					body: password,
				}),
			}
		),
		getConfirmEmail: builder.query<void, string>({
			query: (token) => ({
				url: `/confirm-email/?token=${token}`,
				method: `GET`,
			})
		}),
		patchCompletePasswordReset: builder.mutation<
			ISetPassword,
			ISetPassword
		>({
			query: (password) => ({
				url: `/password-reset-complete/`,
				method: "PATCH",
				body: password,
			}),
		}),
		getVerifyPasswordReset: builder.query<
			ISetPassword,
			{ token: string; uidb64: string }
		>({
			query: ({ token, uidb64 }) => ({
				url: `/password-reset/${uidb64}/${token}/`,
				method: "GET",
			}),
		}),
		postRequestPasswordReset: builder.mutation<
			IResetPasswordEmailRequest,
			IResetPasswordEmailRequest
		>({
			query: (email) => ({
				url: `/request-pass-reset/`,
				method: "POST",
				body: email,
			}),
		}),
	}),
})

export const {
	usePostSignInMutation,
	useGetVerifyPasswordResetQuery,
	usePatchChangePasswordMutation,
	usePatchCompletePasswordResetMutation,
	usePostRequestPasswordResetMutation,
	usePostAddUserMutation,
} = authenticationApi
