import React, { useEffect, useState } from "react";
import './Cards.css';
import { useNavigate } from "react-router-dom";

interface Datar {
    category: string;
    description: string;
    id: string | number;
    image: any;
    price: number;
    rating: {
        rate: number,
        count: number
    };
    title: string
}

const Cards = () => {

    const [data, setData] = useState<Datar[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data: Datar[]) => {
                setData(data);
                setLoading(false);
            });
    }, [])

    const handleClick = (id : string | number) => {        
        navigate(`/product/${id}`)

    }

    if (loading) return <div>loading...</div>
    return (
        <div className="carder">
            <h3>Fresh recommendations</h3>
            <div className="cards-container">
                {data.map((item, index) => (
                    <div key={index} className="card" onClick={() => handleClick(item.id)}>
                        <img src={item.image} alt={item.title} className="card-img" />
                        <div className="card-details">
                            <h2 className="card-price">₹ {item.price}</h2>
                            <p className="card-title">{item.title}</p>
                            <p className="card-description">{item.description.split(' ').slice(0, 12).join(' ')}</p>
                            <p className="card-category">Category: {item.category}</p>
                            <div className="card-rating">
                                <span>Rating: {item.rating.rate} ⭐</span>
                                <span>({item.rating.count} reviews)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards;