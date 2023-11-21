import { History, Info, Logout, VerifiedUserRounded } from "@mui/icons-material";

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
        path: "auth/logout",
    },
];
export default logedAppBarPaths;