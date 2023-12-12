import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import SubMenu from "./Submenu";
import appBarPaths from "./paths/AppBarPath";
import SidePath from "./paths/SidePath";

import { images as image } from "../assets/utils";
import "./template.css";
import {useDispatch, useSelector } from "react-redux";
import logedAppBarPaths from "./paths/LogedAppBarPaths";
import { Button, Menu, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {handleLogout} from "../redux/actions/authActions"
import AdminSidePath from "./paths/AdminSidePaths";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",

  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
  width: drawerWidth,

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  padding: "10px",
  listStyle: "none",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SidebarComponent({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOut = (path) => {
    if (path === '#Logout') {
      setTimeout(() => {
        dispatch(handleLogout())
        window.location.reload();
        navigate("/auth/login");
      }, 1000);
      // Por exemplo, limpar o token de autenticação, redirecionar para a página de login, etc.
      console.log('Usuário deslogado');
    } else {
      // Lógica para redirecionar para outras rotas, se necessário
      console.log(`Redirecionando para ${path}`);
    }
  }
    // inicialização e validação do login

    const userLoginStore = useSelector((state) => state.userLoginStore);

    const { infoUsuario } = userLoginStore;   

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            className="appButton"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Logotipo do navbar */}
          <Typography variant="h6" noWrap component="div" paddingTop="0.3rem">
            <Link
              style={{
                textAlign: "center",
                color: "#f0f0e0",
                textDecoration: "none",
              }}
              to="/"
            >
              <div className="logo-link">
                <img className="logo" src={image.logo} alt="SIFOCA-LOGO" />
              </div>
            </Link>
          </Typography>
          {
            infoUsuario?
            (
              <>
              <Typography variant="h6" noWrap component="div" marginLeft="auto">
                <Button onClick={handleClick}>
                  {infoUsuario.FullUserName} {console.log(infoUsuario)}
                  <ExpandMore />
                </Button>
              </Typography>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {logedAppBarPaths.map((route, index) => (
                <MenuItem key={index} onClick={() => handleOut(route.path)}>
                  {route.path === '#Logout' ? (
                    // Se for o link de logout, não use um Link do React Router, apenas exiba o texto
                    <span className="appLink">
                      {route.icon}
                      {route.title}
                    </span>
                  ) : (
                    <Link to={route.path} className="appLink">
                      {route.icon}
                      {route.title}
                    </Link>
                  )}
                </MenuItem>
              ))}
              <Link to="#Logout"onClick={handleOut}></Link>
            </Menu>
              </>
            ):
            (
              <Typography variant="h6" noWrap component="div" marginLeft="auto">
                {appBarPaths.map((route, index) => (
                  <Link key={index} to={route.path} className="appLink">
                    {route.icon}
                    {route.title}
                  </Link>
                ))}
              </Typography>
            )
          }
        </Toolbar>
      </AppBar>

      {/* Botão de encolher a sidebar*/}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "black" }}>
          <IconButton className="appButton" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* se for administrador */}
        {
          infoUsuario && infoUsuario.IsMaster ?(
            AdminSidePath.map((item) => {
              return <SubMenu item={item} key={item.title} />;
            })
          ):
          (
           <></> 
          )
        }

        {
          infoUsuario?(
            SidePath.map((item) => {
              return <SubMenu item={item} key={item.title} />;
            })
          ):
          (
            <Box component="div" sx={{marginTop:"16%", padding:"15%" }}>
              <Button sx={{backgroundColor:"black"}} >
                <Link 
                  style={{textDecoration:"none", color:"silver",}}  
                  to="/auth/login">VOCÊ NÃO ESTÁ LOGADO, <br /> LOGAR-SE?
                </Link>
              </Button> 
            </Box>
          )
        }
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}