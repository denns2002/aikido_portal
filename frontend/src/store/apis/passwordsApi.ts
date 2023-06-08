import { createApi } from "@reduxjs/toolkit/dist/query/react"
import {
	IChangePassword,
	IResetPasswordEmailRequest,
	ISetPassword,
} from "../types/passwords"
import { customFetchBase } from "./customFetchBase";

export const passwordsdsApi = createApi({
	reducerPath: "passwordsdsApi",
	tagTypes: ["Passwords"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		patchChangePassword: builder.mutation<IChangePassword, IChangePassword>(
			{
				query: (password) => ({
					url: `/auth/change-password/`,
					method: "PATCH",
					body: password,
				}),
			}
		),
		patchCompletePasswordReset: builder.mutation<
			ISetPassword,
			ISetPassword
		>({
			query: (password) => ({
				url: `/auth/password-reset-complete/`,
				method: "PATCH",
				body: password,
			}),
		}),
		getVerifyPasswordReset: builder.query<
			ISetPassword,
			{ token: string; uidb64: string }
		>({
			query: ({ token, uidb64 }) => ({
				url: `/auth/password-reset/${uidb64}/${token}/`,
				method: "GET",
			}),
		}),
		postRequestPasswordReset: builder.mutation<
			IResetPasswordEmailRequest,
			IResetPasswordEmailRequest
		>({
			query: (email) => ({
				url: `/auth/request-pass-reset/`,
				method: "POST",
				body: email,
			}),
		}),
	}),
})

export const {
	useGetVerifyPasswordResetQuery,
	usePatchChangePasswordMutation,
	usePatchCompletePasswordResetMutation,
	usePostRequestPasswordResetMutation,
} = passwordsdsApi
