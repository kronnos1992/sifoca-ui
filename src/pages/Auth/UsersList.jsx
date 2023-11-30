import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paginacao from "../../templates/Paginacao";
import * as Yup from "yup";

// mui table
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

// import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Add, Search } from "@mui/icons-material";
import { getAllEntradas } from "../../redux/actions/entradaActions";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getAllUsers } from "../../redux/actions/authActions";

// estilos da cecula da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

//Estilo das linhas das tabelas
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// esquema de validação
const entradaSchema = Yup.object().shape({
  // ... outros campos de validação
  dataInicial: Yup.date().required("Campo obrigatório"),
  dataFinal: Yup.date().required("Campo obrigatório").min(Yup.ref('dataInicial'), "A data final deve ser depois da data inicial"),
});

//valores iniciais na entrada
let initialValues = {
  // ... outros valores iniciais
  dataInicial: '2023-10-20',
  dataFinal: new Date(),
};

function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllUserStore = useSelector((state) => state.getAllUserStore);
  const { users = [], loading, error } = getAllUserStore;

  const goTo = () => {
    return navigate("/auth/signup");
  };

  // paginacao
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  
  const handleChangePage = (event, newPage) => {
    setPage( newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);

  return (
    <>
    {error ? (
      <div style={{ maxWidth: "50rem", padding: "2rem" }}>
        <MessageError variant="danger">Erro de autenticação. {error}</MessageError>
      </div>
      ) : loading ? (
      <div style={{ maxWidth: "50rem", marginLeft: "50%" }}>
        <LoadingMessage></LoadingMessage>
      </div>
      ) : (
      <TableContainer component={Paper} sx={{maxWidth:"60%", marginLeft:"18%", marginTop:"5%"}}>
          <Paper component="div" sx={{display:"flex"}}>
            <Box component="div">
              <Button variant="contained" color="primary" onClick={goTo} sx={{minHeight:"3.5rem"}}>
                Novo Usiario <Add />
              </Button>
            </Box>
            <Box component="div" sx={{display:"flex", marginLeft:"auto"}}>
              <Formik 
                initialValues={initialValues} 
                onSubmit={(values) => {
                  initialValues = values;
                  dispatch(getAllEntradas(values.dataInicial, values.dataFinal))
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
                    
                    <Button type="submit" variant="contained" sx={{minHeight:"3.5rem"}}>
                        PROCURAR <Search />
                    </Button>
                </Form>
                    )}
              </Formik>
            </Box>
          </Paper>            
        <Table sx={{cursor:"pointer"}} aria-label="custom pagination table">
          <TableHead>
              <StyledTableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>NOME COMPLETO</StyledTableCell>
                  <StyledTableCell>EMAIL</StyledTableCell>
                  <StyledTableCell>TELEFONE</StyledTableCell>
                  <StyledTableCell>DEPARTAMENTO</StyledTableCell>
                  <StyledTableCell>DATA DE NASCIMENTO</StyledTableCell>
                  <StyledTableCell>DATA DE REGISTRO</StyledTableCell>
              </StyledTableRow>
          </TableHead>
          <TableBody sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          {(rowsPerPage > 0
            ? users.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : users
          ).map((user) => {
          return (
          <StyledTableRow key={user.Id}>
              <StyledTableCell>{user.Id}</StyledTableCell>
              <StyledTableCell>{user.NomeCompleto}</StyledTableCell>
              <StyledTableCell>{user.Email}</StyledTableCell>
              <StyledTableCell>{user.PhoneNumber}</StyledTableCell>
              <StyledTableCell>{user.Departamento}</StyledTableCell>
              <StyledTableCell>{user.DataNascimento}</StyledTableCell>
              <StyledTableCell>{user.DataRegistro}</StyledTableCell>
          </StyledTableRow>
          );
          })}
          {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
              <TableRow>
                <TablePagination
                colSpan={4}
                labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
            }
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {
                "aria-label": "rows",
                },
                native: true,
                }}
                    rowsPerPageOptions={[2, 5, 10, { label: "tudo", value: -1 }]}
                    labelRowsPerPage={"Linhas por pagina"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={Paginacao}
                />
              </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )}
  </>
  )
}

export default UsersList