import { useLocation, useParams } from "react-router-dom"
import { getAge, getCorrectDate } from "../../functions"
import { IEvent } from "../../store/types"
import Dropdown from "../custom/Dropdown"
import { useState } from "react"
import { getRankProps } from "../../functions/getRankProps"

function EventParticipants() {
	const location = useLocation()

	const { slug } = useParams()

	const [activeGroup, setActiveGroup] = useState("")

	const event: IEvent = {
		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
		name: "XI Центральный семинар по прикладному айкидо",
		date_start: "2023-01-02",
		date_end: "2023-01-03",
		reg_start: "2023-01-01",
		reg_end: "2023-01-01",
	}

	const groups = [
		{
			name: "Бебрики1",
		},
		{
			name: "Бебрики2",
		},
		{
			name: "Бебрики3",
		},
		{
			name: "Бебрики4",
		},
		{
			name: "Бебрики5",
		},
	]

	const members = [
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
		{
			first_name: "Иван",
			last_name: "Тытенко",
			mid_name: "Дмитриевич",
			rank: "1 дан",
            birth_date: "2002-11-03"
		},
	]

	return slug === "upcoming-test" ? (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start)} -{" "}
					{getCorrectDate(event?.date_end)}
				</span>
				<span className="text-white font-bold text-base">
					Регистрация: {getCorrectDate(event?.reg_start)} -{" "}
					{getCorrectDate(event?.reg_end)}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4 gap-4">
				<Dropdown title="Выбрать группу" defaultShow={true}>
					<div className="w-full flex flex-row gap-2">
						{groups.map((group, index) => {
							return (
								<div
									key={index}
									className={`cursor-pointer text-base font-medium border-sky-500 border-2 rounded-md p-1 transition-all duration-300 ${
										activeGroup === group.name
											? "bg-sky-500 text-white"
											: "bg-white text-black"
									}`}
									onClick={() => setActiveGroup(group.name)}
								>
									{group.name}
								</div>
							)
						})}
					</div>
				</Dropdown>
				<Dropdown title="Список участников" defaultShow={true}>
					<div className="w-full flex flex-col gap-4">
						{members.map((member, index) => {
                            const rankProps = getRankProps(member.rank)

							return (
								<div key={index} className="w-full shadow-md flex flex-row">
									<div className="p-2 flex-1 border-r-[1px] border-sky-500 text-xl font-medium">
										{member.last_name} {member.first_name} {member.mid_name}
									</div>
									<div className="flex flex-col p-2 w-[10rem] border-x-[1px] border-sky-500 text-xl gap-1">
										<div className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}>
                                            {rankProps.text}
                                        </div>
									</div>
									<div className="p-2 w-[5rem] border-l-[1px] border-sky-500 text-xl font-medium">
										{getAge(member.birth_date)} лет
									</div>
								</div>
							)
						})}
					</div>
				</Dropdown>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start)} -{" "}
					{getCorrectDate(event?.date_end)}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4 gap-4">
				<Dropdown title="Выбрать группу" defaultShow={true}>
					<div className="w-full flex flex-row gap-2">
						{groups.map((group, index) => {
							return (
								<div
									key={index}
									className={`cursor-pointer text-base font-medium border-sky-500 border-2 rounded-md p-1 transition-all duration-300 ${
										activeGroup === group.name
											? "bg-sky-500 text-white"
											: "bg-white text-black"
									}`}
									onClick={() => setActiveGroup(group.name)}
								>
									{group.name}
								</div>
							)
						})}
					</div>
				</Dropdown>
				<Dropdown title="Список участников" defaultShow={true}>
					<div className="w-full flex flex-col gap-4">
						{members.map((member, index) => {
                            const rankProps = getRankProps(member.rank)

							return (
								<div key={index} className="w-full shadow-md flex flex-row">
									<div className="p-2 flex-1 border-r-[1px] border-sky-500 text-xl font-medium">
										{member.last_name} {member.first_name} {member.mid_name}
									</div>
									<div className="flex flex-col p-2 w-[10rem] border-x-[1px] border-sky-500 text-xl gap-1">
										<div className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}>
                                            {rankProps.text}
                                        </div>
									</div>
									<div className="p-2 w-[5rem] border-l-[1px] border-sky-500 text-xl font-medium">
										{getAge(member.birth_date)} лет
									</div>
								</div>
							)
						})}
					</div>
				</Dropdown>
			</div>
		</div>
	)
}

export default EventParticipants
