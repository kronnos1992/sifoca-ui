/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginacao from "../../templates/Paginacao";
// mui table
import {
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
  Typography,
} from "@mui/material";

// import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllSaidas } from "../../redux/actions/saidaActions";
import MessageError from "../../templates/Error/MessageError";
import LoadingMessage from "../../templates/Loading/LoadingMessage";

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
          <Button variant="contained" color="primary" onClick={goTo}>
            Nova Despesa <Add />
          </Button>
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
