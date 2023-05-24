import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IClub, IClubList } from "../types/clubs"
import { tokenService } from "../services/tokens"

export const clubsApi = createApi({
	reducerPath: "clubsApi",
	tagTypes: ["Clubs"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/clubs",
		prepareHeaders: (headers) => {
			const access = tokenService.getLocalAccessToken()

			if (access) {
				headers.set("Authorization", `JWT ${access}`)
			}

			return headers
		},
	}),
	endpoints: (builder) => ({
		getClubs: builder.query<IClubList, number>({
			query: (page) => ({ url: `/club/?page=${page}`, method: "GET" }),
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
			query: (club) => ({ url: `/club/`, method: "POST", body: club }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		getClubBySlug: builder.query<IClub, string>({
			query: (slug) => ({ url: `/club/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchClubBySlug: builder.mutation<IClub, { slug: string; club: IClub }>(
			{
				query: ({ slug, club }) => ({
					url: `/club/${slug}/`,
					method: "PATCH",
					body: club,
				}),
				invalidatesTags: [{ type: "Clubs", id: "LIST" }],
			}
		),
		deleteClubBySlug: builder.mutation<void, string>({
			query: (slug) => ({ url: `/club/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchArchiveClub: builder.mutation<
			void,
			{ slug: string; is_active: boolean }
		>({
			query: ({ slug, is_active }) => ({
				url: `/clubs/${slug}/archive/`,
				method: "PATCH",
				body: { is_active: is_active },
			}),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchChangeUserGroup: builder.mutation<
			void,
			{ userSlug: string; groupSlug: number }
		>({
			query: ({ userSlug, groupSlug }) => ({
				url: `/group-member-change/${userSlug}/`,
				method: "PATCH",
				body: { group: groupSlug },
			}),
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
	usePatchArchiveClubMutation,
	usePatchChangeUserGroupMutation,
} = clubsApi
