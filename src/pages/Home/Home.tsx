import React, { useState } from "react";
import './Home.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Promoted from "../../components/Promoted/Promoted";
import Ads from "../../components/Ads/Ads";
import Login from "../../components/Login/Login";
import Cards from "../../components/Cards/Cards";
import Sell from "../../components/Sell/Sell";
import MyAds from "../../components/MyAds/MyAds";

interface NavbarProps {
    openLoginModal : () => void;
    closeLoginModal : () => void;
    isLoginModalOpen : boolean;
    openSellModal : () => void;
    closeSellModal : () => void;
    isSellModalOpen : boolean;
}

const Home : React.FC<NavbarProps> = ({openLoginModal, closeLoginModal, isLoginModalOpen, openSellModal, closeSellModal, isSellModalOpen}) => {
    
    return (
            <div>
                <Navbar openLoginModal={openLoginModal} openSellModal={openSellModal}/>
                <Ads />
                {isLoginModalOpen && <Login closeLoginModal={closeLoginModal} />}
                {isSellModalOpen && <Sell closeSellModal={closeSellModal}/> }
                <Cards />
                <MyAds />
                <Ads />
                <Promoted />
                <Footer />
            </div>
    )
}

export default Home;