
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home'
import { LoginPage } from './pages/login'
import Navbar from './components/navbar'
import DarkVeil from './components/prism'
import { Box } from '@mui/material'
import { Register } from './pages/register'

function App() {
  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#000'
    }}>
      {/* Dark Veil Background */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <DarkVeil 
          hueShift={240}
          noiseIntensity={0.02}
          scanlineIntensity={0.1}
          speed={1.2}
          scanlineFrequency={0.5}
          warpAmount={0.1}
        />
      </Box>
      
      {/* Content Layer */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh'
      }}>
        <BrowserRouter>
          <Navbar />
          <Routes>  
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  )
}

export default App
