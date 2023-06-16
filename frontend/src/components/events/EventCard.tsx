import { Link } from "react-router-dom"
import { IEvent, monthes } from "../../store/types/events"
import { RxCross2 } from "react-icons/rx"

interface EventCardProps {
	event: IEvent
}

function EventCard({ event }: EventCardProps) {
	function getCorrectDate(date: string) {
		const arr = date.split("-")

        const time = arr[2].split("T").length > 1 ? arr[2].split("T")[1] : ""

		type ObjectKey = keyof typeof monthes

		return [
			time ? arr[2][0] === "0" ? arr[2][1] : arr[2].slice(0,1) : arr[2][0] === "0" ? arr[2][1] : arr[2],
			monthes[arr[1] as ObjectKey],
			arr[0],
		].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
	}

	return (
		<Link
			to={`/events/${event.slug}`}
			className="rounded-lg w-[30rem] border-2 border-sky-700 transition-all duration-200 hover:border-sky-500 h-[10.3rem]"
		>
			<div className="p-1 h-full w-full">
				<p className="m-1 font-medium text-size text-lg">
					{event.name}
				</p>
				<hr className="bg-sky-700 -mx-1 my-1 h-0.5" />
				<div className="m-1">
					<span className="font-medium">Мероприятие проходит:</span>{" "}
					{getCorrectDate(event.date_start)}
					{event.date_start !== event.date_end
						? " - " + getCorrectDate(event.date_end)
						: null}
				</div>
				<div className="m-1">
					<span className="font-medium">Регистрация:</span>{" "}
					{getCorrectDate(event.reg_start)}
					{event.reg_start !== event.reg_end
						? " - " + getCorrectDate(event.reg_end)
						: null}
				</div>
				<hr className="bg-white mx-1 my-1"/>
				<div className="m-1">
					<span className="font-medium">Семинар: {" "}</span>
					{event.is_seminar && event.seminar_date ? (
						getCorrectDate(event.seminar_date)
					) : (
						<span className="text-red-700">отсутствует</span>
					)}
				</div>
				<div className="m-1">
					<span className="font-medium">Аттестация: {" "}</span>
					{event.is_attestation && event.attestation_date ? (
						getCorrectDate(event.attestation_date)
					) : (
						<span className="text-red-700">отсутствует</span>
					)}
				</div>
			</div>
		</Link>
	)
}

export default EventCard
