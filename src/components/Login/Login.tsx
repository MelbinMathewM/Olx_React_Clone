import React, { useContext, useEffect, useState } from "react";
import './Login.css';
import { auth, provider } from '../../firebase';
import {signInWithPopup} from 'firebase/auth'
import img1 from '../../assets/promoted/loginscroll1.webp';
import img2 from '../../assets/promoted/loginscroll2.webp';
import img3 from '../../assets/promoted/loginscroll3.webp';
import { useUser } from "../../Context";

type Arr = [
    { text : string,
        img : any
    },
    { text : string,
        img : any
    },
    { text : string,
        img : any
    }
]
type val = string | null;

interface LoginProps {
    closeLoginModal : () => void;
}

const Login : React.FC<LoginProps> = ({closeLoginModal}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [value,setValue] = useState<val>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

    const {setUser} = useUser();

    const slides : Arr = [
        {text : "Help us become one of the safest places to buy and sell.", img : img1},
        {text : "Close deals from the comfort of your home.", img : img2},
        {text: "Keep all your favourites in one place.", img: img3 }
    ]


    const handleClick = () => {
        signInWithPopup(auth,provider)
        .then((data) => {
            const userEmail = data.user.email;
            setValue(userEmail);
            setIsLogin(true);
            setUser(userEmail?.split('@').slice(0,1).join(''));

            localStorage.setItem("isLogin", "true");
            localStorage.setItem('Email', userEmail || '');

            setIsLoginModalOpen(false);
            closeLoginModal()
        })
    }

    useEffect(() => {
        const storedIsLogin = localStorage.getItem("isLogin");
        const storedUserEmail = localStorage.getItem("Email");
    
        if (storedIsLogin === "true" && storedUserEmail) {
            setIsLogin(true);
            setValue(storedUserEmail);
            setUser(storedUserEmail?.split('@').slice(0, 1).join(''));
        }
    }, [setUser]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        console.log(currentSlide,'wjj');
        
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }


    return (
        <div className="modal-overlay">
            <div className="login-container">
                <p className="close" onClick={closeLoginModal}>x</p>
                <div className="scroller">
                    {slides.map((slide, index) => (
                        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                            <img src={slide.img} alt={`Slide ${index + 1}`} />
                            <p>{slide.text}</p>
                        </div>
                    ))}
                </div>
                <div className="navigation">
                    <button className="slide-btn1" onClick={prevSlide}>&lt;</button>
                    <div className="dots">
                        {slides.map((_, index) => (
                            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
                        ))}
                    </div>
                    <button className="slide-btn2" onClick={nextSlide}>&gt;</button>
                </div>
                <div className="logger">
                    <button className="log-btn log-btn1">Continue with phone</button>
                    <button className="log-btn log-btn2" onClick={handleClick}>Continue with Google</button>
                    <h4>OR</h4>
                    <p>Login with email</p>
                </div>
                <div className="footer">
                    <p>All your personal details are safe with us.</p>
                    <p>If you continue, you are accepting <span>OLX Terms and Conditions and Privacy Policy</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login;