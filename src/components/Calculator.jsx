import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Button,
  Icon,
  IconButton
} from '@mui/material';
import SliderWithInput from './SliderWithInput'; // Make sure the path is correct for importing the SliderWithInput component
import { Chat, HelpOutlineRounded, QuestionMark } from '@mui/icons-material';

function Calculator() {
  const [cdbRate, setCdbRate] = useState(100);
  const [lciRate, setLciRate] = useState(93);
  const [cdiAtual, setCdiAtual] = useState(10.5);

  const [investmentTypes, setInvestmentTypes] = useState([]);

  // Creating a reference for the card
  const infoCardRef = useRef(null);

  // Function to scroll to the card
  const scrollToInfoCard = () => {
    if (infoCardRef.current) {
      infoCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let newInvestmentTypes = [
      { name: "CDB com resgate até 180 dias", cdiPercent: (cdbRate / 100) * (1 - (22.5 / 100)) },
      { name: "CDB com resgate de 181 a 360 dias", cdiPercent: (cdbRate / 100) * (1 - (20.0 / 100)) },
      { name: "CDB com resgate de 361 a 720 dias", cdiPercent: (cdbRate / 100) * (1 - (17.5 / 100)) },
      { name: "CDB com resgate acima de 720 dias", cdiPercent: (cdbRate / 100) * (1 - (15 / 100)) },
      { name: "LCI", cdiPercent: lciRate / 100 }
    ];

    // Ensure all computed values are defined
    newInvestmentTypes = newInvestmentTypes.map(item => ({
      ...item,
      cdiPercent: item.cdiPercent || 0, // Ensures it falls back to 0 if undefined
      cdiReal: (item.cdiPercent || 0) * (cdiAtual || 0) // Ensures calculation does not fail if cdiAtual is undefined
    }));

    newInvestmentTypes.sort((a, b) => (b.cdiPercent || 0) - (a.cdiPercent || 0));

    newInvestmentTypes.forEach((item, index) => {
      item.rank = index + 1;
    });

    setInvestmentTypes(newInvestmentTypes);
  }, [cdbRate, lciRate, cdiAtual]);

  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', position:  'relative' }}>
            <CardContent style={{ flexGrow: 1 }}>
              <SliderWithInput label="Taxa CDB (% CDI)" value={cdbRate} onChange={setCdbRate} min={70} max={200} />
              <SliderWithInput label="Taxa LCI (% CDI)" value={lciRate} onChange={setLciRate} min={70} max={200} />
              <SliderWithInput label="CDI Atual (%)" value={cdiAtual} onChange={setCdiAtual} min={0} max={50} step={0.5} />
              <IconButton
                onClick={scrollToInfoCard}
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                >
                <HelpOutlineRounded />
                </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
            <TableContainer component={Paper} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Investimento</TableCell>
                      <TableCell>% CDI Real</TableCell>
                      <TableCell>CDI Real</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {investmentTypes.map((type, index) => (
                      <TableRow key={index}>
                        <TableCell>{type.rank}</TableCell>
                        <TableCell>{type.name}</TableCell>
                        <TableCell>{(type.cdiPercent * 100).toFixed(2)}%</TableCell>
                        <TableCell>{(type.cdiReal).toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card ref={infoCardRef} style={{ marginTop: '20px', padding: '16px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Comparação de Rendimento: LCI vs CDB com Calculadora de Renda Fixa
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
            A <strong>calculadora de renda fixa</strong> é projetada para comparar o rendimento de investimentos em CDB e LCI. Para usar essa <strong>calculadora de renda fixa</strong>, o usuário precisa inserir as taxas de rendimento (brutas) de ambos os tipos de investimento para gerar uma comparação clara entre eles. A calculadora leva em consideração a isenção de imposto de renda (IR) para LCI e a tributação regressiva de IR aplicável aos CDBs.
            <br /><br />
            <strong>LCI:</strong> Ao inserir a taxa de rendimento de uma LCI na <strong>calculadora de renda fixa</strong>, o usuário verá que o rendimento líquido é o mesmo que o rendimento bruto, pois a LCI é isenta de IR.
            <br /><br />
            <strong>CDB:</strong> Para o CDB, o usuário deve inserir a taxa de rendimento bruta na <strong>calculadora de renda fixa</strong>. A calculadora então aplica automaticamente a alíquota de imposto de renda conforme a tabela regressiva de IR:
          </Typography>
          {/* Unordered list must be outside Typography to avoid nesting errors */}
          <ul>
            <li>Até 180 dias: 22,5%</li>
            <li>De 181 a 360 dias: 20%</li>
            <li>De 361 a 720 dias: 17,5%</li>
            <li>Acima de 720 dias: 15%</li>
          </ul>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
            Com base nisso, o rendimento líquido é calculado como:
            <br /><br />
            <code>Taxa Real CDB = Taxa Bruta × (1 - (Alíquota do IR / 100))</code>
            <br /><br />
            Ao inserir as taxas de rendimento de ambos os investimentos na <strong>calculadora de renda fixa</strong>, o usuário pode visualizar de forma clara o impacto da tributação e tomar decisões informadas sobre onde investir.
          </Typography>
        </CardContent>
      </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Calculator;
