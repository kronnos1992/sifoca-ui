// BarChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box, Card, CardHeader } from '@mui/material';
import { format } from 'date-fns';

const formatToKwanza =( value) => {
 const formattedValue = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    maximumFractionDigits: 3,
  }).format(value);
  
  return `${formattedValue}`;
}

const EntradasAreaChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const formattedData = data.map(item => ({
      date: format(new Date(item.Movimento.DataRegistro), 'dd/MM/yyyy'),
      area: item.Movimento.Area,
      value: item.Movimento.Valor
    }));
    
    const xAxisData = formattedData.map(item => `${item.date}\n${item.area}`);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: params => {
          const value = params[0].value;
          return `${params[0].name}: ${formatToKwanza(value)}`;
        }
      },
      
      xAxis: {
        type: 'category',
        name: 'ÁREA \n DATA',
        align: 'top',
        data: xAxisData,
        axisLabel: {
          rotate: 30,
          interval: 0

        }
      },
      yAxis: {
        type: 'value',
        name: 'MONTANTE',
        //axisLabel: {
        //  formatter: formatToKwanza // Aplicando a formatação para Kwanza angolano no eixo Y
        //}
      },
      series: [
        {
          name: 'ENTRADAS',
          data: formattedData.map(item => item.value),
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{ offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }]
            ),
            
          },
          label: {
            show: true,
            position: 'top',
            formatter: params => formatToKwanza(params.value) // Exibição de valores nas barras formatados para Kwanza angolano
          }
        },
        {
        name: 'Datas',
        type: 'line',
        data: formattedData.map(item => item.value),
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: 'rgba(255, 0, 0, 0.8)',
        },
        lineStyle: { // Adicione esta parte para definir a aparência da linha
          color: 'rgba(255, 0, 0, 0.8)', // Cor da linha que conecta os marcadores
          width: 2, // Largura da linha
          type: 'solid', // Tipo de linha (pode ser 'solid', 'dashed', 'dotted', etc.)
        },
        markPoint: {
          symbol: 'pin',
          symbolSize: 0,
          label: {
            position: 'top',
            color: '#333',
            fontSize: 10,
            show: true,
          },
          data: formattedData.map(item => ({
            coord: [formattedData.indexOf(item), item.value],
            name: `${item.date}\n${item.area}`
          }))
        }
      }

      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      }
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <Card>
      <CardHeader sx={{ textAlign: "center" }} title="ENTRADAS  POR ÁREA (Kz)" />
      <Box component="div" ref={chartRef} style={{ width: '600px', height: '315px', marginLeft:"3rem" }} />
    </Card>
  )
};

export default EntradasAreaChart;
