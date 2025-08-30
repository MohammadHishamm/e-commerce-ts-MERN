
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home'
import { LoginPage } from './pages/login'
import Navbar from './components/navbar'


function App() {


  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
