import { useParams, NavLink } from 'react-router-dom';
import { useGetEventBySlugQuery } from "../../store/apis"
import {
	TbSettings,
} from "react-icons/tb"

function Event() {
	const { slug } = useParams()

	const { data: event } = useGetEventBySlugQuery(slug ? slug : "")

	console.log(slug, event)

	return (
		<div>
			<div className="mt-2 p-2 rounded-md bg-sky-700 text-white w-[30rem] font-bold">
				<div className="m-1 text-xl flex flex-row">
                    {event?.name}
                    <div className="flex-1" />
                    <NavLink to={`/events/${slug}/edit`}>
                        <TbSettings className="h-5 w-5 cursor-pointer" />
                    </NavLink>
                </div>
				<hr className="bg-white mx-1 my-1" />
				<div className="m-1">
					О мероприятии:{" "}
					<div className="font-light">{event?.about}</div>
				</div>
				<hr className="bg-white mx-1 my-1" />
				<div className="m-1">
					Мероприятие проходит:{" "}
					<span className="font-light">
						{event?.date_start} - {event?.date_end}
					</span>
				</div>
				<div className="m-1">
					Регистрация:{" "}
					<span className="font-light">
						{event?.reg_start} - {event?.reg_end}
					</span>
				</div>
				{event?.is_seminar ? (
					<>
						<hr className="bg-white mx-1 my-1" />
						<div className="m-1">
							Дата семинара:{" "}
							<span className="font-light">
								{event?.seminar_date}
							</span>
						</div>
					</>
				) : null}
				{event?.is_attestation ? (
					<>
						<hr className="bg-white mx-1 my-1" />
						<div className="m-1">
							Дата аттестации:{" "}
							<span className="font-light">
								{event?.attestation_date}
							</span>
						</div>
					</>
				) : null}
			</div>
		</div>
	)
}

export default Event
