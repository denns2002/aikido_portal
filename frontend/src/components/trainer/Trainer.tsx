import { useState } from "react"
import {
    useGetGroupBySlugQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"

function Trainer() {
	const { data: groups, isLoading: groupsAreLoading } = useGetTrainerGroupsQuery(1)
	const [activeGroup, setActiveGroup] = useState(groups?.results[0].slug)
    const { data: group, isLoading: groupIsLoading} = useGetGroupBySlugQuery(activeGroup ? activeGroup : "")

	console.log(groups)

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
            <div>
                
            </div>)}
		</div>
	)
}

export default Trainer
