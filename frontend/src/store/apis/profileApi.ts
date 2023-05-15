import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { IProfile, IUpdatedProfile } from "../types/profile"

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profiles"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/profile",
	}),
	endpoints: (builder) => ({
		getMyProfile: builder.query<IProfile, void>({
			query: () => ({ url: `/my-profile/`, method: "GET" }),
			providesTags: [{ type: "Profiles", id: "LIST" }],
		}),
		getProfileBySlug: builder.query<IProfile, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Profiles", id: "LIST" }],
		}),
		patchProfileBySlug: builder.mutation<IProfile, IUpdatedProfile>({
			query: (slug) => ({
				url: `/update-profile/${slug}/`,
				method: "PATCH",
			}),
			invalidatesTags: [{ type: "Profiles", id: "LIST" }],
		}),
	}),
})

export const {
	useGetMyProfileQuery,
	useGetProfileBySlugQuery,
	usePatchProfileBySlugMutation,
} = profileApi
