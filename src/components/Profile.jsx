import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  CssBaseline,
  Box,
  Avatar,
  Stack,
  Container,
  Collapse,
  Alert,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useMatches from "../hooks/useMatches";
import { setUser } from "../state/user";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Profile = () => {
  let changePassword;
  let google;
  const [collapse, setCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [image, setImage] = useState();
  const seleccionArchivos = document.querySelector("#seleccionArchivos");
  const imagenPrevisualizacion = document.querySelector(
    "#imagenPrevisualizacion"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSend = () => {
    axios
      .put(`https://okqobo-3001.preview.csb.app/api/user/update/${user._id}`, {
        name: name,
        last_name: lastName,
        email: email,
      })
      .then((res) => dispatch(setUser(res.data)));
    setOpen(false);
  };

  const handleSendPassword = () => {
    axios
      .put(`https://okqobo-3001.preview.csb.app/api/user/resetPassword/${user._id}`, {
        password: password,
      })
      .then((res) => dispatch(setPassword(res.data)));
    setOpenPassword(false);
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    const archivos = seleccionArchivos.files;

    if (!archivos || !archivos.length) {
      imagenPrevisualizacion.src = "";
      return;
    }

    reader.addEventListener("loadend", function () {
      imagenPrevisualizacion.src = reader.result;
      setImage(reader.result);
    });

    reader.readAsDataURL(archivos[0]);
  };

  const handleSubmit = () => {
    console.log(image);
    axios
      .post(`https://okqobo-3001.preview.csb.app/api/upload/`, { Base64: image })
      .then((resp) => {
        axios
          .put(`https://okqobo-3001.preview.csb.app/api/user/update/${user._id}`, {
            profile_picture: resp.data,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
          })
          .then(() => {
            setCollapse(true);
            setTimeout(() => {
              setCollapse(false);
            }, 3000);
          });
      });
  };

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let typography;

  if (matches) {
    typography = "h3";
  } else {
    typography = "h4";
  }

  localStorage.getItem("google")
    ? (changePassword = (
        <Typography
          sx={{ display: "flex", justifyContent: "center", mt: 10, mb: 14 }}
        >
          Estas logueado con una cuenta de Google
        </Typography>
      ))
    : (changePassword = (
        <>
          <Stack alignItems="center" spacing={1}>
            <Button variant="contained" component="label">
              Subir imagen
              <input
                hidden
                id="seleccionArchivos"
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
            </Button>
            <img id="imagenPrevisualizacion" alt="" />
          </Stack>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              fullWidth
              sx={{
                marginBottom: 1,
                marginTop: 2,
                backgroundColor: "#03A696",
                "&:hover": {
                  backgroundColor: "#04BF9D",
                  color: "#757575",
                },
              }}
            >
              Editar datos personales
            </Button>
            <Button
              variant="contained"
              onClick={handleClickOpenPassword}
              fullWidth
              sx={{
                marginBottom: 1,
                backgroundColor: "#03A696",
                "&:hover": {
                  backgroundColor: "#04BF9D",
                  color: "#757575",
                },
              }}
            >
              Cambiar contraseña
            </Button>
            <Dialog
              open={open}
              onClose={handleSend}
              maxWidth="md"
              fullWidth={true}
            >
              <DialogContent>
                <TextField
                  onChange={nameChange}
                  label="Nombre"
                  defaultValue={user.name}
                  autoFocus
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  onChange={lastNameChange}
                  label="Apellido"
                  defaultValue={user.last_name}
                  autoFocus
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  onChange={emailChange}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email"
                  defaultValue={user.email}
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>

              <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleSend}>
                  Guardar cambios
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openPassword}
              onClose={handleSendPassword}
              maxWidth="md"
              fullWidth={true}
            >
              <DialogContent>
                <TextField
                  onChange={passwordChange}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  autoFocus
                  label="Nueva contraseña"
                  type="password"
                  id="password"
                  name="password"
                />
              </DialogContent>

              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setOpenPassword(false)}
                >
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleSendPassword}>
                  Guardar cambios
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Button
            color="inherit"
            fullWidth
            sx={{ mt: 5, bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
            onClick={handleSubmit}
          >
            Guardar cambios
          </Button>
        </>
      ));

  return (
    <>
      {!matches?<DrawerHeader/>:<></>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div id="title">
            <Typography component="h1" variant={typography}>
              Mi Perfil
            </Typography>
          </div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Remy Sharp" sx={{ m: 2, width: 66, height: 66 }}>
              <img
                id="imagenPrevisualizacion"
                alt=""
                width={"100%"}
                src={user.profile_picture}
              />
            </Avatar>
          </Stack>
          {changePassword}
        </Box>
        <Button
          color="inherit"
          fullWidth
          sx={{ bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Volver
        </Button>
        <Collapse in={collapse}>
          <Alert variant="filled" severity="success" sx={{ borderRadius: 10 }}>
            Por favor reinicia sesion para cargar la foto de perfil
          </Alert>
        </Collapse>
      </Container>
    </>
  );
};

export default Profile;
