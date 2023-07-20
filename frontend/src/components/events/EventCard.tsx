import { Link } from "react-router-dom"
import { IEvent } from "../../store/types/events"
import { getCorrectDate } from "../../functions"
import { TbPhotoCancel } from "react-icons/tb"

interface EventCardProps {
	event: IEvent
}

function EventCard({ event }: EventCardProps) {
	return (
		<div className="border-[1px] border-sky-700 rounded-md transition-all duration-200 shadow-md w-44 p-2">
			<div className="h-36 w-40 bg-slate-300 flex justify-center items-center">
				<TbPhotoCancel className="text-white h-10 w-10" />
			</div>
			<div className="text-sm font-medium my-1">{event?.name}</div>
			<div className="flex justify-center mt-5 mb-2">
				<Link to={`/events/${event.slug}`} className="text-xs bg-slate-500 py-0.5 px-4 rounded-full text-white font-medium">
					подробнее
				</Link>
			</div>
		</div>
	)
}

export default EventCard
