import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Box, Card, CardHeader } from '@mui/material';

echarts.use([TooltipComponent, TitleComponent, PieChart, CanvasRenderer]);

const EntradasFormaChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const chartData = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: 'ENTRADA',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: data.map(item => ({
              name: item.FormaPagamento,
              value: item.Movimento.Valor,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        title: {
          //text: 'ENTRADAS POR FORMA DE PAGAMENTO',
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          },
        },
        legend: { // Configurações da legenda
          orient: 'horizontal',
          bottom:20,
          data: data.map(item => item.FormaPagamento),
        },
      };

      myChart.setOption(chartData);

      // Cleanup
      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return (
    <Card>
      <CardHeader sx={{ textAlign: "center" }} title="ENTRADAS POR FORMA DE PAGAMENTO (Kz)" />
      <Box component="div" ref={chartRef} style={{ width: '300px', height: '285px', marginLeft:"3rem" }} />
    </Card>
  )
};

export default EntradasFormaChart;
