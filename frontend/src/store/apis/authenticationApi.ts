import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import { IChangePassword, IResetPasswordEmailRequest, ISetPassword } from "../types/authentication"

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	tagTypes: ["Authentication"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/auth" }),
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
		getCompletePassword: builder.query<
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
				url: `/password-reset-complete/`,
				method: "PATCH",
				body: email,
			}),
		}),
	}),
})
