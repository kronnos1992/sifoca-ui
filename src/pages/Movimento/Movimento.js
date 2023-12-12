import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMovimentos } from "../../redux/actions/movimentoActions";
import GetMovimentosList from "./GetMovimentoList";
import { Box } from "@mui/material";

const Movimento = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovimentos);
  }, [dispatch]);

  return (
    <Box style={{ maxWidth: "70%", margin: "auto", padding:"3%" }}>
      <h4 className="text-center">RELATÓRIO DE MOVIMENTOS</h4>
      <GetMovimentosList />
    </Box>
  );
};

export default Movimento;
