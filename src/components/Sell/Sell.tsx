import React, { useEffect, useState } from 'react';
import './Sell.css';
import { collection,addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { getAuth } from 'firebase/auth/cordova';

interface SellProps {
    closeSellModal : () => void;
}

interface FormDataType {
    title: string;
    description: string;
    price: number;
    category: string;
    photo: File | null;
    uid : string;
}

const Sell : React.FC<SellProps> = ({ closeSellModal }) => {
    const [formData, setFormData] = useState<FormDataType>({
        title: '',
        description: '',
        price: 0,
        category: '',
        photo: null,
        uid : ''
    });

    const auth = getAuth()
    const currentUser = auth.currentUser;

    useEffect(() => {
        if(currentUser){
            setFormData((prevData) => ({
                ...prevData,
                uid : currentUser.uid
            }))
        }
    },[currentUser])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (e.target instanceof HTMLInputElement && e.target.files) {
            setFormData({
                ...formData,
                [name]: e.target.files[0] // Handle file input separately
            });
        } else {
            setFormData({
                ...formData,
                [name]: value // Handle other input types
            });
        }
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(formData.photo){
                const storageRef = ref(storage, `images/${formData.photo.name}`);
                const uploadTaskSnapshot = await uploadBytes(storageRef, formData.photo);
                
                const downlodURL = await getDownloadURL(uploadTaskSnapshot.ref);

                await addDoc(collection(db, "listings"),{
                    title : formData.title,
                    description : formData.description,
                    price : formData.price,
                    category : formData.category,
                    photoURL : downlodURL,
                    uid : currentUser?.uid,
                    createdAt : new Date()
                })
            }
            console.log('hii');
            closeSellModal();
        }catch(error){
            console.error("Error uploading the form data:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="sell-container">
                <p className="close" onClick={closeSellModal}>x</p>
                <h2 id='sell-h2'>Sell Your Item</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="cars">Cars</option>
                        <option value="motorcycles">Motorcycles</option>
                        <option value="mobile-phones">Mobile Phones</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        {/* Add more categories as needed */}
                    </select>

                    <label htmlFor="file-upload" className='custom-file-upload'> + Upload Photo:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="photo"
                        accept="image/*" // Only allow image files
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="sell-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Sell;
