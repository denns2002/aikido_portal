import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IEvent, IEventList } from "../types/events"

export const eventsApi = createApi({
	reducerPath: "eventsApi",
	tagTypes: ["Events"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/events" }),
	endpoints: (builder) => ({
		getEvents: builder.query<IEventList, number>({
			query: (page) => ({ url: `/?page=${page}`, method: "GET" }),
			providesTags: (result) =>
				result
					? [
							...result.results.map(({ id }) => ({
								type: "Events" as const,
								id,
							})),
							{ type: "Events", id: "LIST" },
					  ]
					: [{ type: "Events", id: "LIST" }],
		}),
		postEvent: builder.mutation<
			IEvent,
			IEvent
		>({
			query: (event) => ({
				url: `/`,
				method: "POST",
				body: event,
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		getEventBySlug: builder.query<IEvent, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "GET" }),
		}),
		patchEventBySlug: builder.mutation<
			IEvent,
			{ slug: string; event: IEvent }
		>({
			query: ({ slug, event }) => ({
				url: `/${slug}/`,
				method: "PATCH",
				body: event,
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		deleteEventBySlug: builder.mutation<IEvent, string>({
			query: (slug) => ({ url: `/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		patchCoOrganizersToEvent: builder.mutation<
			number[],
			{ slug: string; coOrgs: number[] }
		>({
			query: ({ slug, coOrgs }) => ({
				url: `/${slug}/add-co-org/`,
				method: "PATCH",
				body: {organizers: coOrgs},
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		patchOrganizersToEvent: builder.mutation<
			number[],
			{ slug: string; orgs: number[] }
		>({
			query: ({ slug, orgs }) => ({
				url: `/${slug}/add-org/`,
				method: "PATCH",
				body: {organizers: orgs},
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
	}),
})

export const {
	useGetEventsQuery,
	useDeleteEventBySlugMutation,
	useGetEventBySlugQuery,
	usePatchCoOrganizersToEventMutation,
	usePatchEventBySlugMutation,
	usePatchOrganizersToEventMutation,
	usePostEventMutation,
} = eventsApi
