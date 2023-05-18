import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { tokenService } from "../services/tokens"
import { IStatement } from "../types/statements"

export const statementsApi = createApi({
	reducerPath: "statementsApi",
	tagTypes: ["Statements"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/statements",
		prepareHeaders: (headers) => {
			const access = tokenService.getLocalAccessToken()

			if (access) {
				headers.set("Authorization", `JWT ${access}`)
			}

			return headers
		},
	}),
	endpoints: (builder) => ({
		getSatementBySlug: builder.query<IStatement, number>({
			query: (id) => ({ url: `/statements/${id}/`, method: "GET" }),
		}),
		postSatement: builder.mutation<IStatement, IStatement>({
			query: (statement) => ({
				url: `/statements/`,
				method: "POST",
				body: statement,
			}),
		}),
	}),
})

export const { useGetSatementBySlugQuery, usePostSatementMutation } =
	statementsApi
