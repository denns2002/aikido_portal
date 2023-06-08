import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { IProfile, IUpdatedProfile } from "../types/profile"
import { customFetchBase } from "./customFetchBase";

export const profileApi = createApi({
	reducerPath: "profileApi",
	tagTypes: ["Profiles"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getMyProfile: builder.query<IProfile, void>({
			query: () => ({ url: `/me/`, method: "GET" }),
			providesTags: [{ type: "Profiles", id: "LIST" }],
		}),
		getProfileBySlug: builder.query<IProfile, string>({
			query: (slug) => ({ url: `/profiles/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Profiles", id: "LIST" }],
		}),
		patchProfileBySlug: builder.mutation<
			IProfile,
			{ slug: string; profile: IUpdatedProfile }
		>({
			query: ({ slug, profile }) => ({
				url: `/profiles/${slug}/update-profile/`,
				method: "PATCH",
				body: profile,
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
