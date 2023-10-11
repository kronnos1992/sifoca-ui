import { SaveSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { newSaida } from "../../redux/actions/saidaActions";
import { saidaTypes } from "../../redux/constants/saidaTypes";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import SuccessMessage from "../../templates/Success/SuccessMessage";
//import { handleLogin } from "../../../redux/actions/authActions";

const saidaSchema = Yup.object().shape({
  descricao: Yup.string().required("Campo obrigatório"),
  operador: Yup.string().required("Campo obrigatório"),
  area: Yup.string().required("Campo obrigatório"),
  valor: Yup.number().required("Campo obrigatório"),
});

let initialValues = {
  descricao: "",
  valor: 0,
  operador: "",
  area: "",
};

const AddSaida = () => {
  const newSaidaStore = useSelector((state) => state.newSaidaStore);
  const { loading, error, success } = newSaidaStore;
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    initialValues = values;
    newSaida(dispatch, initialValues);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: saidaTypes.RESET_INSERT_SAIDA });
      setTimeout(() => {
        window.location.reload();
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
            {`${initialValues.descricao} Saida registrada com sucesso`}
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
                        name="operador"
                        label="operador"
                        type="operador"
                        id="operador"
                        autoComplete="current-operador"
                        error={errors.operador && touched.operador}
                      />
                      <ErrorMessage
                        name="operador"
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
                        sx={{ minWidth: "14.7rem" }}
                        autoComplete="current-valor"
                        error={errors.valor && touched.valor}
                      />
                      <ErrorMessage
                        name="valor"
                        component="div"
                        className="error-message"
                      />
                      <FormControl sx={{ m: 2, minWidth: "14.7rem" }}>
                        <InputLabel id="area">Área</InputLabel>
                        <Field
                          as={Select}
                          name="area"
                          label="Área"
                          variant="outlined"
                          required
                          type="area"
                          id="area"
                        >
                          <MenuItem value="">Área</MenuItem>
                          <MenuItem value={"Restaurante"}>Restaurante</MenuItem>
                          <MenuItem value={"Recepção"}>Recepção</MenuItem>
                        </Field>
                        <ErrorMessage
                          name="area"
                          component="div"
                          className="error-message"
                        />
                      </FormControl>
                    </Box>
                    <Button variant="contained" type="submit" fullWidth>
                      <Link
                        style={{
                          fontStyle: "normal",
                          textDecorationLine: "none",
                          color: "#f0f0c0",
                        }}
                        to="/"
                      >
                        <SaveSharp />
                      </Link>
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
