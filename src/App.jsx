import { Container, AppBar, Toolbar, Typography, CssBaseline, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Calculator from './components/Calculator';
import ReactGA from 'react-ga4';
import { Chat } from '@mui/icons-material';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ComparadorPage from './pages/ComparadorPage';
import SimuladorPage from './pages/SimuladorPage';
import Header from './components/Header';
import { useEffect } from 'react';
import { initGA, logPageView } from './analytics';

// Component to log page views
const Analytics = () => {
    const location = useLocation();
  
    useEffect(() => {
      logPageView(location.pathname); // Log page view when route changes
    }, [location]);
  
    return null; // This component does not render anything
  };

const App = () => {

  // Cria um tema customizado
  const theme = createTheme({
    palette: {
      background: {
        default: '#f5f5f5', // Define um fundo padrão mais escuro (use grey.200 ou qualquer outra cor)
      },
    },
  });

  return (
    <ThemeProvider theme={theme}> {/* Aplica o tema global */}
        <Container maxWidth={false} style={{ height: '100vh', padding: 0 }}>
        <CssBaseline />
        <Header />
        <Analytics />
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
    </ThemeProvider>
  );
}

export default App;
