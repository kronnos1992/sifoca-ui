// Dashboard.js
import React, { useEffect } from 'react';
import EntradasAreaChart from './Shared/EntradasAreaChart';
import { useDispatch, useSelector } from 'react-redux';
import { getEntradasChart } from '../../redux/actions/entradaActions';
import { Box, Button, Card, CardContent, CardHeader, Paper, TextField } from '@mui/material';
import EntradasFormaChart from './Shared/EntradasFormaChart';
import EntradasTipoChart from './Shared/EntradasTipoChart';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Search } from '@mui/icons-material';
import * as Yup from "yup";
import { EntradasCard } from './Shared/EntradasCard';
import { SaidasCard } from './Shared/SaidasCard';


let initialValues = {
  // ... outros valores iniciais
  dataInicial: '2023-10-20',
  dataFinal: new Date(),
  operador: ""
};

const entradaSchema = Yup.object().shape({
  // ... outros campos de validação
  //operador: Yup.string().required("Campo Requerido"),
  dataInicial: Yup.date().required("Campo obrigatório"),
  dataFinal: Yup.date().required("Campo obrigatório").min(Yup.ref('dataInicial'), "A data final deve ser depois da data inicial"),
});

const Dashboard = () => {
  const dispatch = useDispatch()
  const getEntradaStore = useSelector((state) => state.getEntradaStore)
  const {entradas = []} = getEntradaStore;

  const getAllSaidaStore = useSelector((state) => state.getAllSaidaStore);
  const { saidas = [] } = getAllSaidaStore;

  useEffect(() => {
    dispatch(getEntradasChart(initialValues.dataInicial, initialValues.dataFinal, initialValues.operador))
  }, [dispatch])
  
  return (
    <Paper elevation={2} component="div" variant='elevation' sx={{padding:"0.2rem"}}>
      <Card elevation={1} sx={{ margin:"1rem"}}>
        <Box  component="div" sx={{display:"flex", flexDirection:"column", padding:"0.2rem"}}>
            <Formik
                initialValues={initialValues} 
                onSubmit={(values) => {
                  initialValues = values;
                  dispatch(getEntradasChart(values.dataInicial, values.dataFinal, values.operador))
                }} 
                validationSchema={entradaSchema}>
              {({ errors, touched }) => (
                <Form >
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="dataInicial"
                    label="Data Inicial"
                    type="date"
                    id="dataInicial"
                    autoComplete="current-dataInicial"
                    sx={{margin:"0.1rem"}}
                    error={errors.dataInicial && touched.dataInicial}
                    />
                  <ErrorMessage
                    name="dataInicial"
                    component="div"
                    className="error-message"
                  />
              
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="dataFinal"
                    label="Data Final"
                    type="date"
                    id="dataFinal"
                    sx={{margin:"0.1rem"}}
                    autoComplete="current-dataFinal"
                    error={errors.dataFinal && touched.dataFinal}
                  />
                  <ErrorMessage
                    name="dataFinal"
                    component="div"
                    className="error-message"
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    name="operador"
                    id="operador"
                    sx={{margin:"0.1rem"}}
                    autoComplete="current-operador"
                    error={errors.operador && touched.operador}
                  />
                  <ErrorMessage
                    name="operador"
                    component="div"
                    className="error-message"
                  />
              
                  <Button type="submit" variant="contained" sx={{minHeight:"3.5rem"}}>
                      PROCURAR <Search />
                  </Button>
                </Form>
              )}
            </Formik>
        </Box>
      </Card >
      <Card elevation={1} sx={{ margin:"1rem"}}>
        <CardHeader sx={{textAlign:"center"}} title='ANÁLISE DE DADOS'></CardHeader>
        <Box component="div" sx={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <CardContent sx={{maxWidth:"22%", maxHeight:"100%"}}>
            <EntradasCard data={entradas}/>
          </CardContent>
          <CardContent sx={{maxWidth:"22%", maxHeight:"100%"}}>
            <SaidasCard data={saidas}/>
          </CardContent>
        </Box>
        <Box sx={{display:"flex", flex:"left"}}>
          <CardContent sx={{maxWidth:"45%", maxHeight:"100%"}}>
            <EntradasAreaChart data={entradas}/>
          </CardContent>
          <CardContent sx={{maxWidth:"30%", maxHeight:"100%"}}>
            <EntradasFormaChart data={entradas}/>
          </CardContent>
          <CardContent sx={{maxWidth:"30%", maxHeight:"100%"}}>
            <EntradasTipoChart data={entradas}/>
          </CardContent>
        </Box>
      </Card>
    </Paper>
  );
};

export default Dashboard;
