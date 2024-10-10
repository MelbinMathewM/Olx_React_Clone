import  React, { useEffect, useState } from 'react';
import arr from '../../assets/promoted/promoted';
import './Promoted.css';

const mockFetch = () : Promise<Solar[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arr)
        },500);
    })
}

interface Solar {
    image : any;
    title : string
}

const Promoted = () => {
    const [data, setData] = useState<Solar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        mockFetch()
        .then((res : Solar[]) => {
            setData(res);
            setLoading(false)
        })
        .catch((err) => {
            console.error('Error fetching data' , err);
            setLoading(false);
        })
    },[])
    if(loading){
        <div>Loading...</div>
    }
    return (
        <div className='promo'>
            <h3>PROMOTED CONTENT</h3>
            <ul>
            {data.map((item,index) => (
                <li key={index}>
                    <div>
                        <img src={item.image}/>
                        <p>{item.title}</p>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Promoted;