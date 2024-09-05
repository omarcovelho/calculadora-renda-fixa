import { Container, AppBar, Toolbar, Typography, CssBaseline, Button, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Calculator from './components/Calculator';
import ReactGA from 'react-ga4';
import { Chat } from '@mui/icons-material';
import { Link, Route, Routes } from 'react-router-dom';
import ComparadorPage from './pages/ComparadorPage';
import SimuladorPage from './pages/SimuladorPage';
import Header from './components/Header';

function App() {

  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: "Landing Page" })

  return (
    <Container maxWidth={false} style={{ height: '100vh', padding: 0 }}>
      <CssBaseline />
      <Header />
      <Container style={{ marginTop: 20 }}>
        <Routes>
            <Route path="/" element={<ComparadorPage />} />
            <Route path="/comparador" element={<ComparadorPage />} />
            <Route path="/simulador" element={<SimuladorPage />} />
        </Routes>
      </Container>
      <Box sx={{ padding: '10px 0', textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2" color="text.secondary">
          <Chat sx={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Powered by ChatGPT
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
