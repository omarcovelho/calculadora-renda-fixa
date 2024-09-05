import { Container, AppBar, Toolbar, Typography, CssBaseline, Button, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Calculator from './components/Calculator';
import ReactGA from 'react-ga4';
import { Chat } from '@mui/icons-material';

function App() {

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
          {/* <Button color="inherit">Comparador LCI/CDB</Button>
          <Button color="inherit">Simulação</Button> */}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20 }}>
        <Calculator />
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
