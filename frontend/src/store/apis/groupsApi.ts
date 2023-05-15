import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IGroup, IGroupList } from "../types/groups"

export const groupsApi = createApi({
	reducerPath: "groupsApi",
	tagTypes: ["Groups"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/group" }),
	endpoints: (builder) => ({
		getGroups: builder.query<IGroupList, number>({
			query: (page) => ({ url: `/?page=${page}`, method: "GET" }),
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
			query: (group) => ({ url: "/", method: "POST", body: group }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		deleteGroup: builder.mutation<void, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Groups", id: "LIST" }],
		}),
		getGroupBySlug: builder.query<IGroup, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "GET" }),
		}),
		patchGroupBySlug: builder.mutation<
			IGroup,
			{ slug: string; group: IGroup }
		>({
			query: ({ slug, group }) => ({
				url: `/${slug}/`,
				method: "PATCH",
				body: group,
			}),
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
} = groupsApi
