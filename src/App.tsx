import { useState } from 'react'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home'
import { UserProvider } from './Context';
import Login from './components/Login/Login';
import Product from './pages/Product/Product';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSellmodal = () => {
    setIsSellModalOpen(true)
  }

  const closeSellModal = () => {
    setIsSellModalOpen(false)
  }

  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home openLoginModal={openLoginModal} closeLoginModal={closeLoginModal} isLoginModalOpen={isLoginModalOpen} openSellModal={openSellmodal} closeSellModal={closeSellModal} isSellModalOpen={isSellModalOpen} />} />
            <Route path='/product/:id' element={<Product openLoginModal={openLoginModal} closeLoginModal={closeLoginModal} isLoginModalOpen={isLoginModalOpen} openSellModal={openSellmodal} closeSellModal={closeSellModal} isSellModalOpen={isSellModalOpen} />} />
          </Routes>
          {isLoginModalOpen && <Login closeLoginModal={closeLoginModal} />}
        </div>
      </Router>
    </UserProvider>
  )
}


export default App
