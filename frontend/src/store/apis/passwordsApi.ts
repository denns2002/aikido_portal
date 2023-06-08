import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {
	IChangePassword,
	IResetPasswordEmailRequest,
	ISetPassword,
} from "../types/passwords"
import { tokenService } from "../services/tokens"
import { customFetchBase } from "./customFetchBase";

export const passwordsdsApi = createApi({
	reducerPath: "passwordsdsApi",
	tagTypes: ["Passwords"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		patchChangePassword: builder.mutation<IChangePassword, IChangePassword>(
			{
				query: (password) => ({
					url: `/change-password/`,
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
	useGetVerifyPasswordResetQuery,
	usePatchChangePasswordMutation,
	usePatchCompletePasswordResetMutation,
	usePostRequestPasswordResetMutation,
} = passwordsdsApi
