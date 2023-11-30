import {
  AccountBalance,
  Add,
  Balance,
  InsightsTwoTone,
  List,
  Outbound,
  SupervisedUserCircle,
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
  {
    title: "USUÁRIOS",
    icon: <SupervisedUserCircle />,
    subNav: [
      {
        title: "Exibir Todos",
        icon: <List />,
        path: "/auth/users",
      },
      {
        title: "Inserir",
        icon: <Add />,
        path: "/auth/signup",
      },
    ],
  }
];
export default SidePath;
