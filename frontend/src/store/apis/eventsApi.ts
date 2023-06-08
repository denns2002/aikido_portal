import { createApi } from "@reduxjs/toolkit/query/react"
import { IEvent, IEventList } from "../types/events"
import { customFetchBase } from "./customFetchBase";

export const eventsApi = createApi({
	reducerPath: "eventsApi",
	tagTypes: ["Events"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getEvents: builder.query<IEventList, number>({
			query: (page) => ({ url: `/events/?page=${page}`, method: "GET" }),
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
				url: `/events/`,
				method: "POST",
				body: event,
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		getEventBySlug: builder.query<IEvent, string>({
			query: (slug) => ({ url: `/events/${slug}/`, method: "GET" }),
			providesTags: [{ type: "Events", id: "LIST" }]
		}),
		patchEventBySlug: builder.mutation<
			IEvent,
			{ slug: string; event: IEvent }
		>({
			query: ({ slug, event }) => ({
				url: `/events/${slug}/`,
				method: "PATCH",
				body: event,
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		deleteEventBySlug: builder.mutation<IEvent, string>({
			query: (slug) => ({ url: `/events/${slug}/`, method: "DELETE" }),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		patchCoOrganizersToEvent: builder.mutation<
			number[],
			{ slug: string; coOrgs: number[] }
		>({
			query: ({ slug, coOrgs }) => ({
				url: `/events/${slug}/add-co-org/`,
				method: "PATCH",
				body: {co_organizers: coOrgs},
			}),
			invalidatesTags: [{ type: "Events", id: "LIST" }],
		}),
		patchOrganizersToEvent: builder.mutation<
			number[],
			{ slug: string; orgs: number[] }
		>({
			query: ({ slug, orgs }) => ({
				url: `/events/${slug}/add-org/`,
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
