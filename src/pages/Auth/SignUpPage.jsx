import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Avatar, Button, Card, CardContent, CardHeader, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MessageError from '../../templates/Error/MessageError';
import LoadingMessage from '../../templates/Loading/LoadingMessage';
import SuccessMessage from '../../templates/Success/SuccessMessage';
import { handleSignup } from '../../redux/actions/authActions';
import {SupervisedUserCircle, ViewListTwoTone} from '@mui/icons-material';
import { authTypes } from '../../redux/constants/authTypes';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object().shape({
    NomeCompleto: Yup.string().required('Campo Obrigatório'),
    Departamento: Yup.string().required('Campo Obrigatório'),
    DataNascimento: Yup.string().required('Campo Obrigatório'),
    Usuario: Yup.string().required('Campo Obrigatório'),
    Senha: Yup.string().required('Campo Obrigatório'),
    Email: Yup.string().email('insira um email válido').required('Campo Obrigatório'),
    Telefone: Yup.string().required('Campo Obrigatório'),
});

let initialValues = {
    NomeCompleto: '',
    Departamento: '',
    DataNascimento: new Date(),
    Usuario: '',
    Senha: '',
    Email: '',
    Telefone: '',
};

function SignUpPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialValues);

  const addUserStore = useSelector((state) => state.addUserStore);
  const { loading, error, success } = addUserStore;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(handleSignup(values));
    setSubmitting(false);
    resetForm();
    setFormValues(); // Define os valores do formulário como vazios novamente
    console.log('Form submitted with values:', values);
  };

  const goTo = () => {
    return(
      navigate("/auth/users")
    )
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: authTypes.USUARIO_REGISTRO_RESET }); 
      setFormValues(initialValues); // Define os valores do formulário como vazios após o sucesso
    }
  }, [dispatch, setFormValues, success]);
  
  
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
            {`usuário ${initialValues.Usuario} registrado com sucesso`}
          </SuccessMessage>
        )}
        <Card>
          <Avatar  sx={{ margin:"1rem", marginLeft:"45%",width: 100, height: 100 }}>
              <SupervisedUserCircle sx={{width: 100, height: 100}} />
          </Avatar>
          <CardHeader
          sx={{
            textAlign: "center",
          }}
          title="FORMULARIO DE REGISTROS DE USUÁRIOS"
          />
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="NomeCompleto"
                    label="Nome Completo"
                    type="NomeCompleto"
                    id="NomeCompleto"
                    autoComplete="current-NomeCompleto"
                    error={errors.NomeCompleto && touched.NomeCompleto}
                    />
                    <ErrorMessage
                      name="NomeCompleto"
                      component="div"
                      className="error-message"
                  />
                  <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Email"
                      label="Email"
                      type="email"
                      id="Email"
                      sx={{ maxWidth: "23rem"}}
                      autoComplete="current-Email"
                      error={errors.Email && touched.Email}
                    />
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="error-message"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Telefone"
                      label="Telefone"
                      type="Telefone"
                      id="Telefone"
                      sx={{ maxWidth: "22.8rem", marginLeft:"0.1rem"}}
                      autoComplete="current-Telefone"
                      error={errors.Telefone && touched.Telefone}
                    />
                    <ErrorMessage
                      name="Telefone"
                      component="div"
                      className="error-message"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Usuario"
                      label="Usuario"
                      type="Usuario"
                      id="Usuario"
                      autoComplete="current-Usuario"
                      error={errors.Usuario && touched.Usuario}
                    />
                    <ErrorMessage
                      name="Usuario"
                      component="div"
                      className="error-message"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Senha"
                      label="Senha"
                      type="password"
                      id="Senha"
                      autoComplete="current-Senha"
                      error={errors.Senha && touched.Senha}
                    />
                    <ErrorMessage
                      name="Senha"
                      component="div"
                      className="error-message"
                    />
                    <FormControl fullWidth sx={{ maxWidth: "14rem" }}>
                      <InputLabel id="Departamento">DEPARTAMENTO</InputLabel>
                      <Field
                        as={Select}
                        name="Departamento"
                        label="Departamento"
                        variant="outlined"
                        required
                        sx={{margin:"0.1rem", minWidth:"18rem"}}
                        type="Departamento"
                        id="Departamento"
                        autoComplete="current-Departamento"
                        error={errors.Departamento && touched.Departamento}
                      >
                        <MenuItem value={"RECEPÇÃO"}>RECEPÇÃO</MenuItem>
                        <MenuItem value={"RESTAURANTE"}>RESTAURANTE</MenuItem>
                        {/* <MenuItem value={""}>TPA</MenuItem> */}
                      </Field>
                      <ErrorMessage
                        name="Departamento"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                    <Field
                          as={TextField}
                          variant="outlined"
                          margin="normal"
                          required
                          name="DataNascimento"
                          label="DATA DE NASCIMENTO"
                          id="DataNascimento"
                          type="date"
                          sx={{margin:"0.1rem", minWidth:"40%", marginLeft:"5rem"}}
                          autoComplete="current-DataNascimento"
                          error={errors.DataNascimento && touched.DataNascimento}
                          />
                          <ErrorMessage
                          name="DataNascimento"
                          component="div"
                          className="error-message"
                      />
                  <Button title='GUARDAR' sx={{backgroundColor:"silver", marginTop:"1rem"}} variant='contained' type="submit" fullWidth>
                    GUARDAR
                  </Button>
                </Form>
              )}
            </Formik>
            <Button sx={{backgroundColor:"silver", marginTop:"1rem"}} variant='contained' type="button" onClick={goTo}>
              LISTA DE USUÁRIOS <ViewListTwoTone/>
            </Button>
          </CardContent>
        </Card>
    </Paper>
  </Container>
  )
}

export default SignUpPage