import { Card, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const SaidasCard = ({ data }) => {
    const [totalValor, setTotalValor] = useState(0);

    useEffect(() => {
        // CALCULAR O TOTAL
        const sum = data ? data.reduce((acc, ent) => {
            return acc + ent.Movimento.Valor;
        }, 0) : 0;

        const forSum = new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA", // Se essa é a sua moeda, mantenha como está
        }).format(sum);
        setTotalValor(forSum);
    }, [data])

    return (
        <Container component="div" elevation={2}>
            <Card sx={{ backgroundColor: '#3e85e3', padding: '5px' }}>
                <Typography variant="h5" textAlign="center" color="white">
                    TOTAL DESPESAS {totalValor}
                </Typography>
            </Card>
        </Container>
    )
}
