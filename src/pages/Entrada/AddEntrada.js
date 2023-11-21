import {
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { insertEntrada} from "../../redux/actions/entradaActions";
import { entradaTypes } from "../../redux/constants/entradaTypes";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import SuccessMessage from "../../templates/Success/SuccessMessage";


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

  const handleSubmit = async(values, { setSubmitting }) => {
    initialValues = values;
    dispatch(insertEntrada(values));
    setSubmitting(false);
    console.log('Form submitted with values:', values);
  }

  useEffect(() => {
    if (success) {
        dispatch({ type: entradaTypes.RESET_INSERT_ENTRADA });
        setTimeout(() => {
        navigate("/entradas/");
      }, 1000);
    }
  }, [dispatch, navigate, success]);

  return (
    <Container>
      <Paper component="div" elevation={2} className="offset-lg-3 col-lg-8">
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
            <CardHeader
              sx={{
                textAlign: "center",
              }}
              title="FORMULARIO DE REGISTROS DE ENTRADAS"
            />
            <CardContent>
              <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={entradaSchema}>
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
                        type="valor"
                        id="valor"
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
                    <Button type="submit" fullWidth>
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
