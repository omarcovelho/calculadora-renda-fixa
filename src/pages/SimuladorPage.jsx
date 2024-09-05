import { Button, Card, CardActions, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import SliderWithInput from '../components/SliderWithInput'

const SimuladorPage = () => {
    // State for inputs
  const [montanteInicial, setMontanteInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(100);
  const [meses, setMeses] = useState(12);
  const [taxaCDB, setTaxaCDB] = useState(100);
  const [taxaLCI, setTaxaLCI] = useState(93);
  const [cdiAtual, setCdiAtual] = useState(10.5);

  // Função para calcular a alíquota do IR com base no período de investimento
  const calcularAliquotaIR = (meses) => {
    if (meses <= 6) return 22.5 / 100; // Até 6 meses
    if (meses <= 12) return 20 / 100;  // De 6 meses a 1 ano
    if (meses <= 24) return 17.5 / 100; // De 1 a 2 anos
    return 15 / 100; // Acima de 2 anos
  };

  // Função para calcular o montante final
  const calcularMontanteFinal = (tipo, taxa, montanteInicial, aporteMensal, meses, cdiAtual) => {
    const taxaEfetivaBruta = ((cdiAtual * taxa) / 10000) / 12; // Taxa efetiva bruta mensal
    
    let taxaEfetivaLiquida = taxaEfetivaBruta;
    
    // Calculo da taxa líquida para CDB, considerando o IR
    if (tipo === 'CDB') {
      const aliquotaIR = calcularAliquotaIR(meses);
      taxaEfetivaLiquida = taxaEfetivaBruta * (1 - aliquotaIR); // Aplicando a alíquota de IR
    }

    const montanteFinal =
      montanteInicial * Math.pow(1 + taxaEfetivaLiquida, meses) +
      aporteMensal * ((Math.pow(1 + taxaEfetivaLiquida, meses) - 1) / taxaEfetivaLiquida);

    return montanteFinal;
  };

  // Função para formatar o número no formato de moeda brasileira (Real)
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Calcular montante final para CDB e LCI
  const montanteFinalCDB = calcularMontanteFinal('CDB', taxaCDB, montanteInicial, aporteMensal, meses, cdiAtual);
  const montanteFinalLCI = calcularMontanteFinal('LCI', taxaLCI, montanteInicial, aporteMensal, meses, cdiAtual);


  return (
    <>
        <Grid container spacing={4}>
        {/* First Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {/* Input fields with SliderWithInput */}
              <SliderWithInput
                label="Montante Inicial"
                min={0}
                max={500000}
                step={100}
                value={montanteInicial}
                onChange={setMontanteInicial}
                format='currency'
                icon='R$'
              />
              <SliderWithInput
                label="Aporte Mensal"
                min={0}
                max={50000}
                step={100}
                value={aporteMensal}
                onChange={setAporteMensal}
                format='currency'
                icon='R$'
              />
              <SliderWithInput
                label="Meses"
                min={0}
                max={120}
                step={1}
                value={meses}
                onChange={setMeses}
              />
              <SliderWithInput
                label="Taxa CDB (% CDI)"
                min={0}
                max={200}
                value={taxaCDB}
                onChange={setTaxaCDB}
                icon='%' 
              />
              <SliderWithInput
                label="Taxa LCI (% CDI)"
                min={0}
                max={200}
                value={taxaLCI}
                onChange={setTaxaLCI}
                icon='%' 
              />
              <SliderWithInput
                label="CDI Atual"
                min={0}
                max={50}
                step={0.5}
                value={cdiAtual}
                onChange={setCdiAtual}
                icon='%' 
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
        <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Investimento</TableCell>
                      <TableCell align="right">Montante Final (R$)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>CDB</TableCell>
                      <TableCell align="right">{formatarValor(montanteFinalCDB)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>LCI</TableCell>
                      <TableCell align="right">{formatarValor(montanteFinalLCI)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SimuladorPage