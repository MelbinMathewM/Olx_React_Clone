import React from "react";
import './Footer.css';
import car_trade_logo1 from '../../assets/cartrade_tech (1).svg';
import car_trade_logo from '../../assets/cartrade.svg';
import car_wale_logo from '../../assets/carwale.svg';
import mobility_logo from '../../assets/mobility.svg';
import bike_wale_logo from '../../assets/bikewale.svg';
import olx_logo from '../../assets/olx.svg';
import twitter_logo from '../../assets/twitter_logo.png';
import facebook_logo from '../../assets/facebook_logo.png';
import instagram_logo from '../../assets/instagram_logo.png';
import youtube_logo from '../../assets/youtube_logo.png';
import gplay_icon from '../../assets/gplay.png';
import astore_icon from '../../assets/astore.png';



const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-one">
                <ul>
                    <li>
                        <h3>POPULAR LOCATIONS</h3>
                        <ul>
                            <li>Kolkata</li>
                            <li>Mumbai</li>
                            <li>Chennai</li>
                            <li>Pune</li>
                        </ul>
                    </li>
                    <li>
                        <h3>TRENDING LOCATIONS</h3>
                        <ul>
                            <li>Bhubaneshwar</li>
                            <li>Hyderabad</li>
                            <li>Chandigarh</li>
                            <li>Nashik</li>
                        </ul>
                    </li>
                    <li>
                        <h3>ABOUT US</h3>
                        <ul>
                            <li>Tech@OLX</li>
                        </ul>
                    </li>
                    <li>
                        <h3>OLX</h3>
                        <ul>
                            <li>Blog</li>
                            <li>Help</li>
                            <li>Sitemap</li>
                            <li>Legal & Privacy information</li>
                            <li>Vulnerability Disclosure Program</li>
                        </ul>
                    </li>
                    <li>
                        <h3>FOLLOW US</h3>
                        <div className="icons">
                        <ul className="follow-ul-1">
                            <li><img src={facebook_logo} alt="" /></li>
                            <li><img src={instagram_logo} alt="" /></li>
                            <li><img src={twitter_logo} alt="" /></li>
                            <li><img src={youtube_logo} alt="" /></li>
                        </ul>
                        <ul className="follow-ul-2">
                            <li><img src={gplay_icon} alt="" id="foo-img-gplay"/></li>
                            <li><img src={astore_icon} alt=""  id="foo-img-astore"/></li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="footer-two">
                <ul>
                    <li><div id="wjc"><img src={car_trade_logo1} alt="" id="car_logo" /></div></li>
                    <li><img src={olx_logo} alt="" id="olx_logo"/></li>
                    <li><img src={car_wale_logo} alt="" /></li>
                    <li><img src={bike_wale_logo} alt="" /></li>
                    <li><img src={car_trade_logo} alt="" /></li>
                    <li><img src={mobility_logo} alt="" /></li>
                </ul>
                <ul id="ul222">
                    <li>Help-Sitemap</li>
                    <li>All rights reserved © 2006-2024 OLX</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;