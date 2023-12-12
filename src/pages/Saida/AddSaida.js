import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { newSaida } from "../../redux/actions/saidaActions";
import { saidaTypes } from "../../redux/constants/saidaTypes";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import SuccessMessage from "../../templates/Success/SuccessMessage";
//import { handleLogin } from "../../../redux/actions/authActions";

const saidaSchema = Yup.object().shape({
  Descricao: Yup.string().required("Campo obrigatório"),
  Beneficiario: Yup.string().required("Campo obrigatório"),
  Valor: Yup.number().required("Campo obrigatório"),
});

let initialValues = {
  Descricao: "",
  Valor: 0,
  Beneficiario: "",
};

const AddSaida = () => {
  const newSaidaStore = useSelector((state) => state.newSaidaStore);
  const { loading, error, success } = newSaidaStore;
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    initialValues = values;
    dispatch(newSaida(initialValues));
    setSubmitting(false);
    resetForm();
    //setTimeout(() => {
    //  navigate("/entradas/");
    //}, 2000);
    setFormValues(initialValues); // Define os valores do formulário como vazios novamente
    console.log('Form submitted with values:', values);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        //window.location.reload();
        dispatch({ type: saidaTypes.RESET_INSERT_SAIDA });
      }, 3000); // 3000 milissegundos = 3 segundos
    }
  }, [dispatch, success]);

  return (
    <Container>
      <Paper component="div" elevation={2} className="offset-lg-3 col-lg-6">
        {loading && <LoadingMessage></LoadingMessage>}
        {error && (
          <MessageError variant="danger">
            Erro no cadastro: {error}
          </MessageError>
        )}
        {success && (
          <SuccessMessage variant="success">
            {`${initialValues.Descricao} Saida registrada com sucesso`}
          </SuccessMessage>
        )}
        <Box
          sx={{ padding: "2%", marginTop: "20%" }}
          component="div"
          className="container"
        >
          <Card>
            <CardHeader
              sx={{
                textAlign: "center",
              }}
              title="FORMULARIO DE REGISTROS DE SAIDAS"
            />
            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={saidaSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Box sx={{ justifyContent: "space-between" }}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Descricao"
                        label="Descrição"
                        type="Descricao"
                        id="Descricao"
                        autoComplete="current-Descricao"
                        error={errors.Descricao && touched.Descricao}
                      />
                      <ErrorMessage
                        name="Descricao"
                        component="div"
                        className="error-message"
                      />

                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Beneficiario"
                        label="Beneficiario"
                        type="Beneficiario"
                        id="Beneficiario"
                        autoComplete="current-Beneficiario"
                        error={errors.Beneficiario && touched.Beneficiario}
                      />
                      <ErrorMessage
                        name="Beneficiario"
                        component="div"
                        className="error-message"
                      />
                      <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        name="Valor"
                        label="Valor"
                        type="number"
                        id="Valor"
                        sx={{ minWidth: "14.7rem" }}
                        autoComplete="current-valor"
                        error={errors.Valor && touched.Valor}
                      />
                      <ErrorMessage
                        name="Valor"
                        component="div"
                        className="error-message"
                      />
                    </Box>
                    <Button variant="contained" type="submit" fullWidth>
                      Validar
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddSaida;
