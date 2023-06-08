import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { IStatement } from "../types/statements"
import { customFetchBase } from "./customFetchBase"

export const statementsApi = createApi({
	reducerPath: "statementsApi",
	tagTypes: ["Statements"],
	baseQuery: customFetchBase,
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
