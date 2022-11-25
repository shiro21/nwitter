import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
    return (
        <nav id="navigation_page">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">My Page {userObj.displayName}</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;