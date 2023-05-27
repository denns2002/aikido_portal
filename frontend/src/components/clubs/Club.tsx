import { useParams } from 'react-router-dom';
import { useGetClubBySlugQuery } from "../../store/apis";

function Club() {
    const {slug} = useParams()
    
    const {data} = useGetClubBySlugQuery(slug ? slug : "")

    console.log(slug, data);
    
    return ( <div>
        {data?.name}
    </div> );
}

export default Club;