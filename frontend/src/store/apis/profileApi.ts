import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IProfile, IUserRegister } from "../types/profile";
import { customFetchBase } from "./customFetchBase";

export const profileApi = createApi({
  reducerPath: "profileApi",
  tagTypes: ["Profiles"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getMyProfile: builder.query<IProfile, void>({
      query: () => ({ url: `/my-profile/`, method: "GET" }),
      providesTags: [{ type: "Profiles", id: "LIST" }],
    }),
    getProfileBySlug: builder.query<IProfile, string>({
      query: (slug) => ({ url: `/profiles/${slug}/`, method: "GET" }),
      providesTags: [{ type: "Profiles", id: "LIST" }],
    }),
    patchProfileBySlug: builder.mutation<
      IProfile,
      { slug: string; profile: IProfile }
    >({
      query: ({ slug, profile }) => ({
        url: `/profiles/${slug}`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: [{ type: "Profiles", id: "LIST" }],
    }),
    postRegisterUser: builder.mutation<IUserRegister, IUserRegister>({
      query: (userData) => ({
        url: `/profiles/register`,
        method: "POST",
		body: userData
      }),
    }),
	putProfileBySlug: builder.mutation<
      IProfile,
      { slug: string; profile: IProfile }
    >({
      query: ({ slug, profile }) => ({
        url: `/profiles/${slug}`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: [{ type: "Profiles", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useGetProfileBySlugQuery,
  usePatchProfileBySlugMutation,
  usePostRegisterUserMutation,
  usePutProfileBySlugMutation
} = profileApi;
