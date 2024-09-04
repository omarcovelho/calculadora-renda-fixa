import React, { useState, useEffect } from 'react';
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
  Container
} from '@mui/material';
import SliderWithInput from './SliderWithInput'; // Make sure the path is correct for importing the SliderWithInput component

function Calculator() {
  const [cdbRate, setCdbRate] = useState(100);
  const [lciRate, setLciRate] = useState(93);
  const [cdiAtual, setCdiAtual] = useState(10.5);

  const [investmentTypes, setInvestmentTypes] = useState([]);

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
          <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent style={{ flexGrow: 1 }}>
              <SliderWithInput label="Taxa CDB (%)" value={cdbRate} onChange={setCdbRate} min={70} max={150} />
              <SliderWithInput label="Taxa LCI (%)" value={lciRate} onChange={setLciRate} min={70} max={150} />
              <SliderWithInput label="CDI Atual (%)" value={cdiAtual} onChange={setCdiAtual} min={0} max={20} step={0.5} />
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
      </Grid>
    </Container>
  );
}

export default Calculator;
