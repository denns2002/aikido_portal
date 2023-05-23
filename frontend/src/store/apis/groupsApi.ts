import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
	IGroup,
	IGroupList,
	ITrainerGroupList,
	ITrainerList,
} from "../types/groups"
import { tokenService } from "../services/tokens";

export const groupsApi = createApi({
	reducerPath: "groupsApi",
	tagTypes: ["Groups"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/clubs", prepareHeaders: (headers) => {
		const access = tokenService.getLocalAccessToken()
		
		if (access) {
			headers.set("Authorization", `JWT ${access}`)
		}

		return headers
	} }),
	endpoints: (builder) => ({
		getGroups: builder.query<IGroupList, number>({
			query: (page) => ({ url: `/group/?page=${page}`, method: "GET" }),
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
			query: (slug) => ({ url: `/group/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getGroupBySlug: builder.query<IGroup, string>({
			query: (slug) => ({ url: `/group/${slug}/`, method: "GET" }),
		}),
		patchGroupBySlug: builder.mutation<
			IGroup,
			{ slug: string; group: IGroup }
		>({
			query: ({ slug, group }) => ({
				url: `/group/${slug}/`,
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
				url: `/group-trainer-change/${groupSlug}/`,
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
				url: `/group-trainer/${slug}/?page=${page}`,
				method: "GET",
			}),
		}),
		getTrainerGroups: builder.query<ITrainerGroupList, number>({
			query: (page) => ({
				url: `/trainer-groups/?page=${page}`,
				method: "GET",
			}),
		}),
		getTrainerGroup: builder.query<
			ITrainerList,
			{ slug: string; page: number }
		>({
			query: ({ slug, page }) => ({
				url: `/trainer-groups/${slug}/?page=${page}`,
				method: "GET",
			}),
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
	useGetTrainerGroupQuery,
} = groupsApi
