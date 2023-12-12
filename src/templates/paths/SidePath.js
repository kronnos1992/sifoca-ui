import {
  AccountBalance,
  Balance,
  InsightsTwoTone,
  Outbound,
} from "@mui/icons-material";

const SidePath = [
  {
    title: "MOVIMENTOS",
    icon: <Balance />,
    subNav: [
      {
        title: "Geral",
        icon: <AccountBalance />,
        path: "/movimentos",
      },
      {
        title: "Entradas",
        icon: <InsightsTwoTone />,
        path: "/entradas",
      },
      {
        title: "Saídas",
        icon: <Outbound />,
        path: "/saidas",
      },
    ],
  },
];
export default SidePath;
