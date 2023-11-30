import { History, Info, Logout } from "@mui/icons-material";

const logedAppBarPaths = [
    {
        icon: <Info/>,
        title: "Sobre Mim",
        path: "/auth/about",
    },
    {
        icon: <History />,
        title: "Minhas Vendas",
        path: "/auth/history",
    },
    {
        icon: <Logout />,
        title: "Sair",
        path: "#Logout"
    },
];
export default logedAppBarPaths;