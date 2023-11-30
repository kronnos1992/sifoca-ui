import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Card, CardContent, CardHeader, Container, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../redux/actions/authActions';
import { useEffect } from 'react';
import MessageError from '../../templates/Error/MessageError';
import LoadingMessage from '../../templates/Loading/LoadingMessage';
import {useNavigate} from 'react-router-dom';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Campo Obrigatório'),
    password: Yup.string().required('Campo Obrigatório'),
  });

  let initialValues = {
    username: "",
    password: "",
  };

const LoginPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLoginStore = useSelector((state) => state.userLoginStore);
    const {infoUsuario, loading, error } = userLoginStore;
    
    const handleSubmit = (values, { setSubmitting }) => {
        initialValues = values;
        dispatch(handleLogin(values.username, values.password));
        setSubmitting(false);
        console.log('Form submitted with values:', values);
    }

    useEffect(()=>{
        if (infoUsuario) {
            //props.history.push(redirect);
            setTimeout(() => {
                return navigate("/");
            }, 1000); // 1000 milissegundos = 3 segundos
        }
    }, [infoUsuario, navigate, props.history])

    return (
        <Container>
            <Paper component="div" elevation={2} className="offset-lg-3 col-lg-8">
                { loading && <LoadingMessage></LoadingMessage>} 
                { error && <MessageError variant="danger">Usuário não encontrado. </MessageError> }
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
                        title="PAINEL DE ACESSO"
                        />
                        <CardContent>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            label="Username"
                                            name="username"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            required
                                            type="username"
                                            id="username"
                                            autoComplete="current-username"
                                            error={errors.username && touched.username}
                                            />
                                        <ErrorMessage name="username" component="div" />

                                        <Field
                                            as={TextField}
                                            label="Password"
                                            name="password"
                                            type="password"
                                            fullWidth
                                            margin="normal"
                                            required
                                            id="password"
                                            autoComplete="current-password"
                                            error={errors.password && touched.password}
                                            />
                                        <ErrorMessage name="password" component="div" />

                                        <Button type="submit" variant="contained" color="primary" fullWidth>
                                            Login
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
}
export default LoginPage;
