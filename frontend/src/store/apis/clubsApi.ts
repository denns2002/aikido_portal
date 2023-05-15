import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IClub, IClubList } from "../types/clubs"

export const clubsApi = createApi({
	reducerPath: "clubsApi",
	tagTypes: ["Clubs"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/clubs",
	}),
	endpoints: (builder) => ({
		getClubs: builder.query<IClubList, number>({
			query: (page) => ({ url: `/?page=${page}`, method: "GET" }),
			providesTags: (result) =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: "Clubs" as const,
								id,
							})),
							{ type: "Clubs", id: "LIST" },
					  ]
					: [{ type: "Clubs", id: "LIST" }],
		}),
		postClub: builder.mutation<IClub, IClub>({
			query: (club) => ({ url: `/`, method: "POST", body: club }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		getClubBySlug: builder.query<IClub, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchClubBySlug: builder.mutation<IClub, { slug: string; club: IClub }>(
			{
				query: ({ slug, club }) => ({
					url: `/${slug}/`,
					method: "PATCH",
					body: club,
				}),
				invalidatesTags: [{ type: "Clubs", id: "LIST" }],
			}
		),
		deleteClubBySlug: builder.mutation<void, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
	}),
})

export const {
	useDeleteClubBySlugMutation,
	useGetClubBySlugQuery,
	useGetClubsQuery,
	usePatchClubBySlugMutation,
	usePostClubMutation,
} = clubsApi
