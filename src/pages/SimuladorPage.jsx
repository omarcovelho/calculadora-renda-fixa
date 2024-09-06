import { Button, Card, CardActions, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SliderWithInput from '../components/SliderWithInput'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Decimal from 'decimal.js';

const SimuladorPage = () => {
    // State for inputs
  const [montanteInicial, setMontanteInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(100);
  const [meses, setMeses] = useState(12);
  const [taxaCDB, setTaxaCDB] = useState(100);
  const [taxaLCI, setTaxaLCI] = useState(93);
  const [cdiAtual, setCdiAtual] = useState(10.5);
  const [data, setData] = useState([]); // Dados para o gráfico
  const [montanteFinalCDB, setMontanteFinalCDB] = useState(0); // Montante final CDB
  const [montanteFinalLCI, setMontanteFinalLCI] = useState(0); // Montante final LCI

  // Função para formatar o número no formato de moeda brasileira (Real)
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Função para calcular a alíquota do IR com base no período total de investimento
  const calcularAliquotaIR = (mesesTotais) => {
    if (mesesTotais <= 6) return new Decimal(22.5).div(100); // Até 6 meses
    if (mesesTotais <= 12) return new Decimal(20).div(100);  // De 6 meses a 1 ano
    if (mesesTotais <= 24) return new Decimal(17.5).div(100); // De 1 a 2 anos
    return new Decimal(15).div(100); // Acima de 2 anos
  };

  // Calcula o montante final e gera os dados para o gráfico usando a fórmula de juros compostos com aportes mensais
  useEffect(() => {
    const calcularMontanteComJurosCompostos = (meses, montanteInicial, aporteMensal, taxaMensal) => {
      const montanteInicialDecimal = new Decimal(montanteInicial); // Montante inicial como Decimal
      const aporteMensalDecimal = new Decimal(aporteMensal); // Aporte mensal como Decimal
      const taxaMensalDecimal = new Decimal(taxaMensal); // Taxa mensal como Decimal

      const resultados = [];

      for (let i = 0; i <= meses; i++) {
        // Fórmula corrigida de juros compostos com aportes mensais
        const montante = montanteInicialDecimal
          .mul(Decimal.pow(taxaMensalDecimal.plus(1), i)) // P * (1 + i)^n
          .plus(
            aporteMensalDecimal
              .mul(Decimal.pow(taxaMensalDecimal.plus(1), i).minus(1))
              .div(taxaMensalDecimal)
          ); // A * [(1 + i)^n - 1] / i

        // Converte o montante de volta para o valor original para o gráfico
        resultados.push({ mes: i, valor: montante.toNumber() });
      }

      return resultados;
    };

    // Calcula a taxa de rendimento anual para CDB e LCI usando Decimal.js
    const taxaAnualCDB = new Decimal(taxaCDB).div(100).mul(new Decimal(cdiAtual).div(100)); // Taxa anual do CDB
    const taxaAnualLCI = new Decimal(taxaLCI).div(100).mul(new Decimal(cdiAtual).div(100)); // Taxa anual do LCI

    // Calcula a taxa de rendimento anual efetiva para o CDB ajustada pelo IR
    const aliquotaIR = calcularAliquotaIR(meses);
    const taxaAnualEfetivaCDB = taxaAnualCDB.mul(new Decimal(1).minus(aliquotaIR)); // Taxa anual efetiva após IR

    // Calcula a taxa de rendimento mensal efetiva para CDB e LCI
    const taxaMensalEfetivaCDB = Decimal.pow(taxaAnualEfetivaCDB.plus(1), new Decimal(1).div(12)).minus(1);
    const taxaMensalLCI = Decimal.pow(taxaAnualLCI.plus(1), new Decimal(1).div(12)).minus(1); // Sem IR

    // Calcula o montante para CDB considerando IR e LCI sem IR
    const cdbData = calcularMontanteComJurosCompostos(
      meses,
      montanteInicial,
      aporteMensal,
      taxaMensalEfetivaCDB
    );
    const lciData = calcularMontanteComJurosCompostos(
      meses,
      montanteInicial,
      aporteMensal,
      taxaMensalLCI
    );

    // Combina os dados para o gráfico
    const combinedData = cdbData.map((item, index) => ({
      mes: item.mes,
      CDB: item.valor,
      LCI: lciData[index].valor,
    }));

    setData(combinedData);

    // Calcula o montante final para CDB e LCI
    setMontanteFinalCDB(cdbData[cdbData.length - 1].valor);
    setMontanteFinalLCI(lciData[lciData.length - 1].valor);
  }, [meses, montanteInicial, aporteMensal, taxaCDB, taxaLCI, cdiAtual]);

  return (
    <>
        <Grid container spacing={4}>
        {/* First Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
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
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
          dataKey="mes" 
          label={{ value: 'Meses', position: 'insideBottom', offset: -20 }} // Adjusted position and offset
        />
                <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} /> 
                <Line type="monotone" dataKey="CDB" stroke="#8884d8" name="Investimento CDB" />
                <Line type="monotone" dataKey="LCI" stroke="#82ca9d" name="Investimento LCI" />
                </LineChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default SimuladorPage