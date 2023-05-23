import { useParams } from 'react-router-dom';
import { useGetEventBySlugQuery } from "../../store/apis";

function Event() {
    const {slug} = useParams()
    
    const {data} = useGetEventBySlugQuery(slug ? slug : "")

    console.log(slug, data);
    
    return ( <div>
        {data?.name}
    </div> );
}

export default Event;