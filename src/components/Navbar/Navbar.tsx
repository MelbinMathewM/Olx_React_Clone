import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search-white.png';
import { useUser } from "../../Context";

interface NavbarProps {
    openLoginModal : () => void;
    openSellModal : () => void;
}

const Navbar : React.FC<NavbarProps> = ({openLoginModal, openSellModal}) => {

    const {user,setUser} = useUser();
    const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("isLogin");
        localStorage.removeItem("Email");
    }

    useEffect(() => {
        const storedIsLogin = localStorage.getItem("isLogin");
        const storedUserEmail = localStorage.getItem("Email");

        if (storedIsLogin === "true" && storedUserEmail) {
            setUser(storedUserEmail?.split('@').slice(0, 1).join(''));
        }
    },[setUser])

    return (
        <>
        <div className="navbar">
                <img src={logo} alt="" className="nav-img" />
            <div className="navbar-right">
                <ul>
                    <li id="li1">
                        <select className="location">
                            <option value="kerala">Kerala</option>
                            <option value="tamilnadu">TamilNadu</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="punjab">Punjab</option>
                        </select>
                    </li>
                    <li className="search-item" id="li2">
                        <input type="search" placeholder="Find Cars, Mobile Phones and More" />
                        <i><img src={search_icon} /></i>
                    </li>
                    <li className="lang">
                        <span>ENGLISH &#10003;</span>
                        <div className="lang-options">
                            <ul>
                                <li>English</li>
                                <li>Hindi</li>
                            </ul>
                        </div>
                    </li>
                    <li
                            className="login-text"
                            onMouseEnter={() => setIsLogoutVisible(true)}
                            onMouseLeave={() => setIsLogoutVisible(false)}
                            onClick={openLoginModal}
                        >
                            <button>{user ? <div className="login-circle"><span>{user.split('').slice(0,1).join('')}</span></div> : 'Login'}</button>
                            {user && isLogoutVisible && (
                                <div className="logout-tooltip">
                                    <p>{user}</p>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </li>
                    <li className="seller-btn"><button onClick={user ? openSellModal : openLoginModal}>+ Sell</button></li>
                </ul>
            </div>
        </div>
        <div className="subbar">
            <ul>
                <li className="first"><h3>All Categories</h3></li>
                <li>Cars</li>
                <li>Motorcycles</li>
                <li>Mobile Phones</li>
                <li>For Sale: Houses & Apartments</li>
                <li>Scooters</li>
                <li>Commercial & Other Vehicles</li>
                <li>For Rent: Houses & Apartments</li>
            </ul>
        </div>
        </>
    )
}


export default Navbar;