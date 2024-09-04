import { Container, AppBar, Toolbar, Typography, CssBaseline, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Calculator from './components/Calculator';
import ReactGA from 'react-ga4';

function App() {

  ReactGA.initialize('G-9F3XEBGWYL');
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: "Landing Page" })

  return (
    <Container maxWidth={false} style={{ height: '100vh', padding: 0 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <MonetizationOnIcon sx={{ mr: 2 }} /> 
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Calculadora Renda Fixa
          </Typography>
          <Button color="inherit">Comparador LCI/CDB</Button>
          <Button color="inherit">Simulação</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20 }}>
        <Calculator />
      </Container>
    </Container>
  );
}

export default App;
