import { useParams } from 'react-router-dom';
import { useGetClubBySlugQuery } from "../../store/apis";

function Club() {
    const {slug} = useParams()
    
    const {data} = useGetClubBySlugQuery(slug ? slug : "")
    
    return ( <div>
        {/* {data?.name} */}
        SSS
    </div> );
}

export default Club;