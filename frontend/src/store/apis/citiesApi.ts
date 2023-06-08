import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { ICitiesList, ICity } from "../types/cities"
import { customFetchBase } from "./customFetchBase"

export const citiesApi = createApi({
	reducerPath: "citiesApi",
	tagTypes: ["Cities"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getCities: builder.query<ICitiesList, number>({
			query: (page) => ({ url: `/cities/?page=${page}`, method: "GET" }),
			providesTags: (result) =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: "Cities" as const,
								id,
							})),
							{ type: "Cities", id: "LIST" },
					  ]
					: [{ type: "Cities", id: "LIST" }],
		}),
		postCity: builder.mutation<ICity, ICity>({
			query: (city) => ({ url: `/cities/`, method: "POST", body: city }),
			invalidatesTags: [{ type: "Cities", id: "LIST" }],
		}),
		getCity: builder.query<ICity, number>({
			query: (id) => ({ url: `/cities/${id}/`, method: "GET" }),
			providesTags: [{ type: "Cities", id: "LIST" }],
		}),
	}),
})

export const { useGetCitiesQuery, useGetCityQuery, usePostCityMutation } =
	citiesApi
