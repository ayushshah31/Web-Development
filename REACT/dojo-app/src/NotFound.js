import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div>
            <h2>Sorry</h2>
            <p>That Page cannot be found</p>
            <Link to={"/"}>Back to Home Page....</Link>
        </div>
     );
}
 
export default NotFound