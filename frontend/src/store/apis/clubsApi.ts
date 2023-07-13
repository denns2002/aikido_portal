import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { IClub, IClubList } from "../types/clubs"
import { customFetchBase } from "./customFetchBase";

export const clubsApi = createApi({
	reducerPath: "clubsApi",
	tagTypes: ["Clubs"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getClubs: builder.query<IClubList, number>({
			query: (page) => ({ url: `/clubs/clubs/?page=${page}`, method: "GET" }),
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
			query: (club) => ({ url: `/clubs/clubs/`, method: "POST", body: club }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		getClubBySlug: builder.query<IClub, string>({
			query: (slug) => ({ url: `/clubs/clubs/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchClubBySlug: builder.mutation<IClub, { slug: string; club: IClub }>(
			{
				query: ({ slug, club }) => ({
					url: `/clubs/clubs/${slug}/`,
					method: "PATCH",
					body: club,
				}),
				invalidatesTags: [{ type: "Clubs", id: "LIST" }],
			}
		),
		deleteClubBySlug: builder.mutation<void, string>({
			query: (slug) => ({ url: `/clubs/clubs/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Clubs", id: "LIST" }],
		}),
		patchArchiveClub: builder.mutation<
			void,
			{ slug: string; is_active: boolean }
		>({
			query: ({ slug, is_active }) => ({
				url: `/clubs/clubs/${slug}/archive/`,
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
				url: `/clubs/clubs/group-member-change/${userSlug}/`,
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
