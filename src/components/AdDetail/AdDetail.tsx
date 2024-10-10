import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './AdDetail.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Ad {
    id: string,
    title: string,
    category : string,
    price: number,
    description: string,
    photoURL: string
}

const AdDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Ad | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "listings"));
                const adsData: Ad[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    category : doc.data().category,
                    price: doc.data().price,
                    description: doc.data().description,
                    photoURL: doc.data().photoURL,
                })) as Ad[];
                const specificProduct = adsData.find(ad => ad.id === id);
                setProduct(specificProduct || null);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
            setLoading(false)
        }
        fetchAds();
    }, [id]);

    if (loading) return <div></div>;

    if (!product) return <div></div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-image">
                    <img src={product.photoURL} alt={product.title} />
                </div>
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">₹ {product.price}</p>
                    <p className="product-category">Category: {product.category}</p>
                </div>
            </div>
            <div className="product-description">
                <h3>Product Details</h3>
                <p>{product.description}</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae consectetur iure volupt</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati minus fuga provident commodi.</p>
            </div>
        </div>
    );
};

export default AdDetail;
