import { useState } from "react"
import {
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"

function Trainer() {
	const { data: groups, isLoading: groupsAreLoading } = useGetTrainerGroupsQuery(1)
	const [activeGroup, setActiveGroup] = useState(groups?.results[0].slug)
    const { data: group, isLoading: groupIsLoading} = useGetTrainerGroupQuery({slug: activeGroup ? activeGroup : "", page: 1})

	console.log(group)

	return (
		<div className="flex flex-col w-[48rem] h-full">
			{groupsAreLoading ? null : (
				<div className="flex flex-row gap-2">
					{groups?.results.map((group, index) => {
						return (
							<div
								key={index}
								className={`rounded-md border-sky-700 border-solid border-2 p-1 ${
									activeGroup === group.slug
										? "bg-sky-700 text-white"
										: "bg-white text-sky-700"
								}`}
                                onClick={() => setActiveGroup(group.slug)}
							>
								{group.name} ({group.groupmember_count})
							</div>
						)
					})}
				</div>
			)}
            {groupIsLoading ? null : (
            <div className="rounded-md border-2 border-sky-700 p-2 mt-5 flex flex-col">
				{group?.results[0].groupmember_set?.map((member, index) => {
					return (
						<div key={index} className="flex flex-row-reverse">
							<div className="w-30">
								{member.rank}
							</div>
							
							<div className="flex-1" />
							{member.last_name} {member.first_name}
						</div>
					)
				})}	
            </div>)}
		</div>
	)
}

export default Trainer
