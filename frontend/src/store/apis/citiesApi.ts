import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ICitiesList, ICity } from "../types/cities"

export const citiesApi = createApi({
	reducerPath: "citiesApi",
	tagTypes: ["Cities"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/cities",
	}),
	endpoints: (builder) => ({
		getCities: builder.query<ICitiesList, number>({
			query: (page) => ({ url: `/?page=${page}`, method: "GET" }),
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
			query: (city) => ({ url: `/`, method: "POST", body: city }),
			invalidatesTags: [{ type: "Cities", id: "LIST" }],
		}),
		getCity: builder.query<ICity, number>({
			query: (id) => ({ url: `/${id}/`, method: "GET" }),
			providesTags: [{ type: "Cities", id: "LIST" }],
		}),
	}),
})

export const { useGetCitiesQuery, useGetCityQuery, usePostCityMutation } =
	citiesApi
