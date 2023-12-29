/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginacao from "../../templates/Paginacao";
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
  Typography,
} from "@mui/material";

// import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllSaidas } from "../../redux/actions/saidaActions";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
// estilos da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const saidaSchema = Yup.object().shape({
  // ... outros campos de validação
  dataInicial: Yup.date().required("Campo obrigatório"),
  dataFinal: Yup.date().required("Campo obrigatório").min(Yup.ref('dataInicial'), "A data final deve ser depois da data inicial"),
});

let initialValues = {
  // ... outros valores iniciais
  dataInicial: '2023-10-20',
  dataFinal: new Date(),
};

const GetSaidasList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalValor, setTotalValor] = useState(0); // Variável para armazenar o somatório de valores

  const getAllSaidaStore = useSelector((state) => state.getAllSaidaStore);
  const { saidas = [], loading, error } = getAllSaidaStore;

  // paginacao
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - saidas.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goTo = () => {
    return navigate("/saidas/add");
  };

  useEffect(() => {
    const sum = saidas.reduce((acc, saida) => {
      return acc + saida.Movimento.Valor;
    }, 0);
    const forSum = new Intl.NumberFormat("pt-ao", {
      style: "currency",
      currency: "AOA", // Se essa é a sua moeda, mantenha como está
    }).format(sum);
    setTotalValor(forSum);
    dispatch(getAllSaidas);
  }, [dispatch]);
  useEffect(() => {
    // CALCULAR O TOTAL
    const sum = saidas ? saidas.reduce((acc, saida) => {
      return acc + saida.Movimento.Valor;
    }, 0) : 0;
    const forSum = new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA", // Se essa é a sua moeda, mantenha como está
    }).format(sum);
    setTotalValor(forSum);
    dispatch(getAllSaidas(initialValues.dataInicial, initialValues.dataFinal))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, initialValues.dataInicial, initialValues.dataFinal]);
  return (
    <>
      {error ? (
        <div style={{ maxWidth: "24rem", padding: "2rem" }}>
          <MessageError variant="danger">{error}</MessageError>
        </div>
      ) : loading ? (
        <div style={{ maxWidth: "24rem", marginLeft: "50%" }}>
          <LoadingMessage></LoadingMessage>
        </div>
      ) : (
        <TableContainer component={Paper}>
        <Paper component="div" sx={{display:"flex"}}>
            <Box component="div">
              <Button variant="contained" color="primary" onClick={goTo}>
                Nova Despesa <Add />
              </Button>
            </Box>
            <Box component="div" sx={{display:"flex", marginLeft:"auto"}}>
              <Formik 
                initialValues={initialValues} 
                onSubmit={(values) => {
                  initialValues = values;
                  dispatch(getAllSaidas(values.dataInicial, values.dataFinal))
                }} 
                validationSchema={saidaSchema}>
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
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>DESCRIÇÃO</StyledTableCell>
                <StyledTableCell>VALOR</StyledTableCell>
                <StyledTableCell>BENEFICIÁRIO</StyledTableCell>
                <StyledTableCell>RESPONSÁVEL</StyledTableCell>
                <StyledTableCell>DATA</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {(rowsPerPage > 0
                ? saidas.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : saidas
              ).map((saida) => {
                const formattedValor = new Intl.NumberFormat("pt-ao", {
                  style: "currency",
                  currency: "AOA", // Se essa é a sua moeda, mantenha como está
                }).format(saida.Movimento.Valor);
                return (
                  <StyledTableRow key={saida.Id}>
                    <StyledTableCell>{saida.Id}</StyledTableCell>
                    <StyledTableCell>
                      {saida.Movimento.Descricao}
                    </StyledTableCell>
                    <StyledTableCell>{formattedValor}</StyledTableCell>
                    
                    <StyledTableCell>{saida.Beneficiario}</StyledTableCell>
                    <StyledTableCell>{saida.Responsável}</StyledTableCell>
                    <StyledTableCell>{saida.DataRegistro}</StyledTableCell>
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
                  count={saidas.length}
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
      <Paper elevation={3}>
        <Typography variant="h6" align="center">
          Total Saidas: {totalValor}
        </Typography>
      </Paper>
    </>
  );
};
export default GetSaidasList;
