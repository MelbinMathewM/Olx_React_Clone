import React, { useState } from "react";
import { UserProvider } from "../../Context";
import Navbar from "../../components/Navbar/Navbar";
import Ads from "../../components/Ads/Ads";
import Login from "../../components/Login/Login";
import Footer from "../../components/Footer/Footer";
import Sell from "../../components/Sell/Sell";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import AdDetail from "../../components/AdDetail/AdDetail";

interface NavbarProps {
    openLoginModal : () => void;
    closeLoginModal : () => void;
    isLoginModalOpen : boolean;
    openSellModal : () => void;
    closeSellModal : () => void;
    isSellModalOpen : boolean;
}

const Product : React.FC<NavbarProps> = ({openLoginModal, closeLoginModal, isLoginModalOpen, openSellModal, closeSellModal, isSellModalOpen}) => {

    
    return (
            <div>
            <Navbar openLoginModal={openLoginModal} openSellModal={openSellModal} />
                <Ads />
                {isLoginModalOpen && <Login closeLoginModal={closeLoginModal} />}
                {isSellModalOpen && <Sell closeSellModal={closeSellModal} />}
                <ProductDetail />
                <AdDetail />
                <Footer />
            </div>
    )
}

export default Product;