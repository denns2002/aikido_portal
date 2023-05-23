import { Link } from "react-router-dom"
import { IEvent } from "../../store/types/events"

interface EventCardProps {
	event: IEvent
}

function EventCard({ event }: EventCardProps) {
	return (
		<Link to={`/events/${event.slug}`}>
			<div className="rounded-md bg-sky-700 text-white p-1">
                <p className="m-1">{event.name}</p>
                <hr className="bg-white mx-1 my-1" />
                <div className="m-1">
                    Мероприятие проходит: {event.date_start} - {event.date_end}
                </div>
                <div className="m-1">
                    Регистрация: {event.reg_start} - {event.reg_start}
                </div>
            </div>
		</Link>
	)
}

export default EventCard
