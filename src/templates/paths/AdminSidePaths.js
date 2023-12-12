import {
  Add,
  Dashboard,
  JoinFull,
  List,
  PermIdentity,
  SupervisedUserCircle,
} from "@mui/icons-material";

const AdminSidePath = [
  {
    title: "DASHBOARD",
    icon: <Dashboard />,
    path: "/admin/dashboard",
  },
  {
    title: "USUÁRIOS",
    icon: <SupervisedUserCircle />,
    subNav: [
      {
        title: "Exibir Todos Usuarios",
        icon: <List />,
        path: "/auth/users",
      },
      {
        title: "Inserir Novo Usuario",
        icon: <Add />,
        path: "/auth/signup",
      },
    ],
  },
  {
    title: "PERFIL DE USUARIO",
    icon: <PermIdentity/>,
    subNav: [
      {
        title: "Exibir Todos Perfis",
        icon: <List />,
        path: "/auth/roles",
      },
      {
        title: "Inserir Novo Perfil",
        icon: <Add />,
        path: "/auth/addrole",
      },
      {
        title: "Adicionar Usuario ao Perfil",
        icon: <JoinFull />,
        path: "/auth/userole",
      },
    ],
  }
];
export default AdminSidePath;
