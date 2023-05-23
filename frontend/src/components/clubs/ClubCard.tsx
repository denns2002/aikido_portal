import { Link } from "react-router-dom";
import { IClub } from "../../store/types/clubs";

interface ClubCardProps {
    club: IClub
}

function ClubCard({club}: ClubCardProps) {
    return (
		<Link to={`/clubs/${club.slug}`}>
			<div className="rounded-md bg-sky-700 text-white p-1">
                <p className="m-1">{club.name}</p>
                <hr className="bg-white mx-1 my-1" />
                <div className="m-1">
                    {club.is_active ? "Клуб активен" : "Клуб неактивен"}
                </div>
                <div className="m-1">
                    О клубе: {club.info}
                </div>
            </div>
		</Link>
	)
}

export default ClubCard;