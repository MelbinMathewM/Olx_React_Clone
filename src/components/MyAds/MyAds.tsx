import React, { useEffect, useState } from "react";
import './MyAds.css';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Ad {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    photoURL: string;
    uid: string;
}

const MyAds = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                console.log("User logged in: ", user);
            } else {
                setCurrentUser(null);
                console.log("No user is logged in");
            }
        });

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                if (currentUser) {
                    console.log("Fetching ads for user: ", currentUser.uid);

                    const q = query(collection(db, "listings"), where("uid", "==", currentUser.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const adsData: Ad[] = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            title: doc.data().title,
                            category: doc.data().category,
                            price: doc.data().price,
                            description: doc.data().description,
                            photoURL: doc.data().photoURL,
                            uid: doc.data().uid,
                        }));
                        setAds(adsData);
                    } else {
                        console.log("No ads found for this user.");
                    }
                }
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
            setLoading(false);
        };

        if (currentUser) {
            fetchAds();
        }
    }, [currentUser]);

    const handleClick = (id: string | number) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="carder">
            <h3>My Ads</h3>
            <div className="cards-container">
                {loading ? (
                    <p>Loading ads...</p>
                ) : (
                    ads.length > 0 ? (
                        ads.map((item) => (
                            <div key={item.id} className="card" onClick={() => handleClick(item.id)}>
                                <img src={item.photoURL} alt={item.title} className="card-img" />
                                <div className="card-details">
                                    <h2 className="card-price">₹ {item.price}</h2>
                                    <p className="card-title">{item.title}</p>
                                    <p className="card-description">{item.description.split(' ').slice(0, 12).join(' ')}...</p>
                                    <p className="card-category">Category: {item.category}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No ads found for your account.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default MyAds;
