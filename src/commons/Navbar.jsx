import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  ImageListItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import logo from "../assets/logoCeibo.png";
import Home from "@mui/icons-material/Home";
import Pets from "@mui/icons-material/Pets";
import Profile from "@mui/icons-material/Person";
import Favorite from "@mui/icons-material/StarRate";
import History from "@mui/icons-material/History";
import Message from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../hooks/useMatches";
import { sendLogoutRequest } from "../state/user";
import { search } from "../state/search";
import { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import axios from "axios";
import backgroundImage from '../assets/fondo-huellas - Edited.png'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha((theme.palette.color = "#FFD600"), 0.15),
  "&:hover": {
    backgroundColor: alpha((theme.palette.color = "#FFD600"), 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: 20,
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
  );
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PersistentDrawerLeft({ prop }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  let params = useLocation()
  let path = useLocation();
  let drawerColor;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(user.email)
    {axios
    .get(`https://okqobo-3001.preview.csb.app/api/user/notifications/${user?._id}`)
    .then((res) => {
      setNotifications(res.data)
    })}
  }, [pathname]);

  if (
    pathname === "/favorites" ||
    pathname === "/fundaciones" ||
    pathname === "/mascotas"
  ) {
    drawerColor = backgroundImage;
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: drawerColor,
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = function (e) {
    dispatch(search(busqueda));
    navigate(`/mascotas`);
    setBusqueda("");
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleLogOut = async () => {
    dispatch(sendLogoutRequest());
    navigate("/");
    handleDrawerClose();
  };

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  //style variables
  let loginMenu;
  let appBarStyle;
  let drawerHeader;
  let DrawerList;
  let SearchStyle;
  let ToolbarStyle;
  let IconButtonStyle;
  let UserNameStyle;
  let ButtonLogoStyle;
  let DrawerStyle;
  let LogoStyle;
  let logoutStack;
  let logoutButton;
  let top;
  let openDrawer;
  let marginDrawer;
  let drawerButton;
  let navbarContent;
  let PCTStyle;
  let main;
  let footer;
  let mainHeight;
  let bottomDrawer;

  //desktop or mobile
  if (matches) {
    mainHeight = {
      minHeight: 878,
      display: "flex",
      flexDirection: "column",
      bgcolor:backgroundImage
    };
    footer = <Footer />;
    drawerButton = <></>;
    if ((pathname = "/")) {
      openDrawer = false;
      marginDrawer = false;
    }
    marginDrawer = true;
    openDrawer = true;
    logoutButton = {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    };
    logoutStack = { height: "70%", justifyContent: "end" };
    LogoStyle = { padding: 0, maxWidth: 56, justifyContent: "end" };
    ButtonLogoStyle = {
      paddingLeft: 0,
      width: "50%",
      display: "flex",
      justifyContent: "end",
    };
    PCTStyle = {
      paddingLeft: 0,
      width: "50%",
      display: "flex",
      justifyContent: "start",
    };
    UserNameStyle = {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    };
    ToolbarStyle = { paddingRight: 0, maxHeight: 67, display: "flex" };
    IconButtonStyle = { mr: 2, ...(open && { display: "none" }) };
    DrawerStyle = {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    };
    appBarStyle = {
      position: "fixed",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFFFFF")
          : (theme.palette.color = "#FFFFFF"),
    };
    SearchStyle = {
      width: 300,
      borderRadius: 10,
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#F1F2F1")
          : (theme.palette.color = "#1e244b"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#000000"),
    };
    DrawerList = {
      height: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    };
    drawerHeader = {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#FFFFFF"),
    };
    top = (
      <>
        <Typography sx={UserNameStyle}>{user.name ? user.name : ""}</Typography>
      </>
    );
    if (user.email) {
      navbarContent = (
        <>
          {drawerButton}
          <Box sx={{ display: "flex", flexDirection: "row", width: 550 }}>
            <Search sx={SearchStyle} id="searchDisplay">
              <StyledInputBase
                id="search"
                value={busqueda}
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  e.preventDefault();
                  setBusqueda(e.target.value);
                }}
                sx={{
                  width: 300,
                  ":hover": { bgcolor: "white" },
                  ":disabled": { bgcolor: "white" },
                }}
              />
            </Search>
            <Button sx={{ padding: 0 }} onClick={handleSubmit}>
              <SearchIcon sx={{ color: "black" }} />
            </Button>
          </Box>
          <Button
            onClick={() => {
              navigate("/");
            }}
            sx={ButtonLogoStyle}
          >
            <ImageListItem sx={LogoStyle}>
              <img alt="" src={logo} loading="lazy" />
            </ImageListItem>
          </Button>
        </>
      );
    } else {
      navbarContent = (
        <>
          <Typography variant="h6" sx={PCTStyle}>
            Patitas Con Techo
          </Typography>
          <Button sx={ButtonLogoStyle}>
            <ImageListItem sx={LogoStyle}>
              <img alt="" src={logo} loading="lazy" />
            </ImageListItem>
          </Button>
        </>
      );
    }
    path.pathname === "/messages"
      ? (main = (
          <>
            {prop}
            <DrawerHeader />
          </>
        ))
      : (main = (
          <>
            <DrawerHeader />
            {prop}
            <DrawerHeader />
          </>
        ));
    path.pathname === "/login" || path.pathname === "/register"
      ? (main = (
          <>
            <DrawerHeader />
            {prop}
            <DrawerHeader />
          </>
        ))
      : (<></>);
  } else {
    pathname === "/history"
      ? (bottomDrawer = <></>)
      : (bottomDrawer = (
          <>
            <DrawerHeader />
            <DrawerHeader />
          </>
        ));

    footer = <></>;
    drawerButton = (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={IconButtonStyle}
      >
        <MenuIcon />
      </IconButton>
    );

    marginDrawer = false;
    openDrawer = open;
    LogoStyle = { padding: 0, maxWidth: 56 };
    ButtonLogoStyle = {
      paddingLeft: 0,
      width: "50%",
      justifyContent: "center",
    };
    UserNameStyle = {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    };
    ToolbarStyle = { paddingRight: 0, maxHeight: 67, display: "flex" };
    IconButtonStyle = { mr: 2, ...(open && { display: "none" }) };
    PCTStyle = { p: 2 };
    DrawerStyle = {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    };
    appBarStyle = {
      position: "fixed",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFFFFF")
          : (theme.palette.color = "#FFFFFF"),
    };
    SearchStyle = {
      borderRadius: 10,
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#F1F2F1")
          : (theme.palette.color = "#1e244b"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#000000"),
    };
    DrawerList = {
      pt: "0px",
      height: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    };
    drawerHeader = {
      height: 73.48,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "##FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#FFFFFF"),
    };
    top = (
      <>
        <Typography sx={UserNameStyle}>{user.name ? user.name : ""}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </>
    );
    navbarContent = (
      <>
        {drawerButton}
        <Box sx={{ display: "flex", flexDirection: "row", width: 550 }}>
          <Search sx={SearchStyle} id="searchDisplay">
            <StyledInputBase
              id="search"
              value={busqueda}
              placeholder="Buscar…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                e.preventDefault();
                setBusqueda(e.target.value);
              }}
              sx={{
                width: 300,
                ":hover": { bgcolor: "white" },
                ":disabled": { bgcolor: "white" },
              }}
            />
          </Search>
          <Button sx={{ padding: 0 }} onClick={handleSubmit}>
            <SearchIcon sx={{ color: "black" }} />
          </Button>
        </Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
          sx={ButtonLogoStyle}
        >
          <ImageListItem sx={LogoStyle}>
            <img alt="" src={logo} loading="lazy" />
          </ImageListItem>
        </Button>
      </>
    );
    main = <>{prop}</>;
  }

  !user.email
    ? (loginMenu = (
        <>
          <Divider />
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/login");
                  handleDrawerClose();
                }}
                sx={DrawerList}
              >
                Iniciar Sesion
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/register");
                  handleDrawerClose();
                }}
                sx={DrawerList}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </>
      ))
    : (loginMenu = (
        <>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/profile"}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Profile />
                </ListItemIcon>
                <ListItemText primary={"Mi perfil"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/notifications"}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Badge badgeContent={notifications.length} color="primary">
                    <NotificationsActiveIcon color="action" />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={"Notificaciones"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/favorites"}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary={"Mis favoritos"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/history"}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary={"Historial de adopción"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/messages"}
            onClick={() => {
              handleDrawerClose();
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary={"Mensajes"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Stack>
            <Divider />
            <Button
              onClick={() => {
                handleLogOut();
                handleDrawerClose();
              }}
              sx={DrawerList}
            >
              Cerrar Sesion
            </Button>
          </Stack>
        </>
      ));

  return (
    <>
      <Box sx={{ display: "flex", bgcolor:backgroundImage }}>
        <CssBaseline />
        <AppBar open={openDrawer} sx={appBarStyle}>
          <Toolbar style={{ color: "black" }} sx={ToolbarStyle}>
            {navbarContent}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={DrawerStyle}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader sx={drawerHeader}>{top}</DrawerHeader>
          <List sx={DrawerList}>
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={"/"}
              onClick={() => {
                handleDrawerClose();
              }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary={"Menu Principal"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {["Mascotas", "Fundaciones"].map((text, i) => (
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/${text.toLowerCase()}`}
                onClick={() => {
                  handleDrawerClose();
                }}
                key={i}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {
                        <>
                          {i === 0 ? <Pets /> : <></>}
                          {i === 1 ? <Home /> : <></>}
                        </>
                      }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            {loginMenu}
          </List>
        </Drawer>
        <Main open={marginDrawer} sx={mainHeight} style={matches?{}:{minHeight:650}}>
          {params.pathname === '/' || params.pathname === '/messages'?<DrawerHeader/>:<></>}
          {main}
          {bottomDrawer}
          <Footer />
        </Main>
      </Box>
    </>
  );
}
