import { Link } from "react-router-dom";
import { IClub } from "../../store/types/clubs";

interface ClubCardProps {
    club: IClub
}

function ClubCard({club}: ClubCardProps) {
    return (
		<Link to={`/clubs/${club.slug}`} className="">
			<div className="rounded-md border-2 border-sky-700 text-black p-1 w-80">
                <p className="m-1 text-center font-medium text-size text-lg">{club.name}</p>
                <hr className="bg-white mx-1 my-1" />
                <div className="m-1 font-medium">
                    {club.is_active ? "Клуб активен" : "Клуб неактивен"}
                </div>
                <div className="m-1">
                    <span className="font-medium">О клубе: </span>
                    {club.info}
                </div>
            </div>
		</Link>
	)
}

export default ClubCard;