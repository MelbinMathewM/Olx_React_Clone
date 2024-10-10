import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import './ProductDetail.css';

interface ProductDetailData {
    category: string;
    description: string;
    id: string | number;
    image: any;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    title: string;
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data: ProductDetailData) => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    const openChatModal = () => {
        setIsChatModalOpen(true); 
    };

    const closeChatModal = () => {
        setIsChatModalOpen(false);
    };


    if (loading) return <div></div>;

    if (!product) return <div></div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">₹ {product.price}</p>
                    <p className="product-category">Category: {product.category}</p>
                    <div className="product-rating">
                        Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
                    </div>
                    <div className="seller-contact">
                        <button onClick={openChatModal}>Chat with Seller</button>
                    </div>
                </div>
            </div>

            <div className="product-description">
                <h3>Product Details</h3>
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae consectetur iure volupt</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati minus fuga provident commodi.</p>
            </div>
            {isChatModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Chat with Seller</h2>
                            <button className="close-button" onClick={closeChatModal}>x</button>
                        </div>
                        <div className="modal-body">
                            <textarea placeholder="Type your message here..." rows={5}></textarea>
                            <button className="send-button" onClick={closeChatModal}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
