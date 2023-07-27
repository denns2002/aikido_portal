import { createApi } from "@reduxjs/toolkit/query/react"
import {
	IGroup,
	IGroupList,
	ITrainerGroupList,
	ITrainerGroupMembersList,
	ITrainerList,
} from "../types/groups"
import { customFetchBase } from './customFetchBase';

export const groupsApi = createApi({
	reducerPath: "groupsApi",
	tagTypes: ["Groups"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getGroups: builder.query<IGroupList, number>({
			query: (page) => ({ url: `/groups/?page=${page}`, method: "GET" }),
			providesTags: (result) =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: "Groups" as const,
								id,
							})),
							{ type: "Groups", id: "LIST" },
					  ]
					: [{ type: "Groups", id: "LIST" }],
		}),
		postGroup: builder.mutation<IGroup, IGroup>({
			query: (group) => ({ url: "/group/", method: "POST", body: group }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		deleteGroup: builder.mutation<void, string>({
			query: (slug) => ({ url: `/groups/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getGroupBySlug: builder.query<IGroup, string>({
			query: (slug) => ({ url: `/groups/${slug}/`, method: "GET" }),
		}),
		patchGroupBySlug: builder.mutation<
			IGroup,
			{ slug: string; group: IGroup }
		>({
			query: ({ slug, group }) => ({
				url: `/groups/${slug}/`,
				method: "PATCH",
				body: group,
			}),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		patchChangeGroupTrainer: builder.mutation<
			IGroup,
			{ groupSlug: string; trainer: number }
		>({
			query: ({ groupSlug, trainer }) => ({
				url: `/groups/group-trainer-change/${groupSlug}/`,
				method: "PATCH",
				body: { trainer: trainer },
			}),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getGroupTrainer: builder.query<
			ITrainerList,
			{ slug: string; page: number }
		>({
			query: ({ slug, page }) => ({
				url: `/clubs/group-trainer/${slug}/?page=${page}`,
				method: "GET",
			}),
			providesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getTrainerGroups: builder.query<ITrainerGroupList, number>({
			query: (page) => ({
				url: `/trainer-groups/?page=${page}`,
				method: "GET",
			}),
			providesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getTrainerGroupBySlug: builder.query<
			ITrainerGroupMembersList,
			{ slug: string; page: number }
		>({
			query: ({ slug, page }) => ({
				url: `/trainer-groups/${slug}?page=${page}`,
				method: "GET",
			}),
			providesTags: [{ type: "Groups", id: "LIST" }],
		}),
		deleteGroupMember: builder.mutation<void, string>({
			query: (slug) => ({ url: `/clubs/group-member-delete/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
	}),
})

export const {
	usePostGroupMutation,
	useDeleteGroupMutation,
	useGetGroupBySlugQuery,
	useGetGroupsQuery,
	usePatchGroupBySlugMutation,
	usePatchChangeGroupTrainerMutation,
	useGetGroupTrainerQuery,
	useGetTrainerGroupsQuery,
	useGetTrainerGroupBySlugQuery,
	useDeleteGroupMemberMutation
} = groupsApi
