import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {useNavigate} from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { insertEntrada} from "../../redux/actions/entradaActions";
import { entradaTypes } from "../../redux/constants/entradaTypes";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import SuccessMessage from "../../templates/Success/SuccessMessage";
import { CurrencyExchange } from "@mui/icons-material";

const entradaSchema = Yup.object().shape({
  descricao: Yup.string().required("Campo obrigatório"),
  tipoPagamento: Yup.string().required("Campo obrigatório"),
  assinante: Yup.string().required("Campo obrigatório"),
  valor: Yup.number().required("Campo obrigatório"),
  formaPagamento: Yup.string().required("Campo obrigatório"),
});

let initialValues = {
  descricao: "",
  valor: 0,
  tipoPagamento: "",
  assinante: "",
  formaPagamento:""
};

const AddEntrada = () => {
  const navigate = useNavigate();
  const newEntradaStore = useSelector((state) => state.newEntradaStore);
  const { loading, error, success } = newEntradaStore;
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(insertEntrada(values));
    setSubmitting(false);
    setTimeout(() => {
      navigate("/entradas/");
    }, 2000);
    setFormValues(initialValues); // Define os valores do formulário como vazios novamente
    console.log('Form submitted with values:', values);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: entradaTypes.RESET_INSERT_ENTRADA }); 
      setFormValues(initialValues); // Define os valores do formulário como vazios após o sucesso
    }
  }, [dispatch, navigate, success]);

  return (
    <Container>
      <Paper sx={{marginTop:"6rem"}} component="div" elevation={2} className="offset-lg-3 col-lg-8">
        {loading && <LoadingMessage></LoadingMessage>}
        {error && (
          <MessageError variant="danger">
            Erro no cadastro: {error}
          </MessageError>
        )}
        {success && (
          <SuccessMessage variant="success">
            {`${initialValues.descricao} registrado com sucesso`}
          </SuccessMessage>
        )}
        <Card>
            <Avatar  sx={{ margin:"1rem", marginLeft:"45%",width: 100, height: 100 }}>
                <CurrencyExchange sx={{width: 80, height: 80}} />
            </Avatar>
            <CardHeader
              sx={{
                textAlign: "center",
              }}
              title="FORMULARIO DE REGISTROS DE ENTRADAS"
            />
            <CardContent>
              <Formik 
                initialValues={initialValues}
                validationSchema={entradaSchema}
                onSubmit={handleSubmit} 
                >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="descricao"
                      label="Descrição"
                      type="descricao"
                      id="descricao"
                      autoComplete="current-descricao"
                      error={errors.descricao && touched.descricao}
                      />
                      <ErrorMessage
                        name="descricao"
                        component="div"
                        className="error-message"
                      />

                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="assinante"
                        label="Assinante"
                        type="assinante"
                        id="assinante"
                        autoComplete="current-assinante"
                        error={errors.assinante && touched.assinante}
                      />
                      <ErrorMessage
                        name="assinante"
                        component="div"
                        className="error-message"
                      />

                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        name="valor"
                        label="Valor"
                        type="number"
                        id="Valor"
                        sx={{ maxWidth: "8rem" }}
                        autoComplete="current-valor"
                        error={errors.valor && touched.valor}
                      />
                      <ErrorMessage
                        name="valor"
                        component="div"
                        className="error-message"
                      />

                      <FormControl fullWidth sx={{ m: 2, maxWidth: "14rem" }}>
                        <InputLabel id="formaPagamento">FORMA DE PAGAMENTO</InputLabel>
                        <Field
                          as={Select}
                          name="formaPagamento"
                          label="formaPagamento"
                          variant="outlined"
                          required
                          type="formaPagamento"
                          id="formaPagamento"
                          autoComplete="current-formaPagamento"
                          error={errors.formaPagamento && touched.formaPagamento}
                        >
                          <MenuItem value={"CASH"}>CASH</MenuItem>
                          <MenuItem value={"TRANSFERENCIA"}>TRANFERÊNCIA</MenuItem>
                          <MenuItem value={"TPA"}>TPA</MenuItem>
                        </Field>
                        <ErrorMessage
                          name="formaPagamento"
                          component="div"
                          className="error-message"
                        />
                      </FormControl>

                      <FormControl sx={{ m: 2, minWidth: "14.7rem" }}>
                        <InputLabel id="tipoPagamento">
                          TIPO DE PAGAMENTO
                        </InputLabel>
                        <Field
                          as={Select}
                          name="tipoPagamento"
                          label="Tipo de Pagamento"
                          variant="outlined"
                          required
                          type="tipoPagamento"
                          id="tipoPagamento"
                          autoComplete="current-tipoPagamento"
                          error={errors.tipoPagamento && touched.tipoPagamento}
                        >
                          <MenuItem value={"PRONTO PAGAMENTO"}>
                            PRONTO PAGAMENTO
                          </MenuItem>
                          <MenuItem value={"CRÉDITO"}>CRÉDITO</MenuItem>
                        </Field>
                        <ErrorMessage
                          name="tipoPagamento"
                          component="div"
                          className="error-message"
                        />
                      </FormControl>
                    <Button type="submit" title='GUARDAR' sx={{backgroundColor:"silver", marginTop:"1rem"}} variant='contained'fullWidth>
                      GUARDAR
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default AddEntrada;
