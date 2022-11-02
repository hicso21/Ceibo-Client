import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import useMatches from "../hooks/useMatches"
import { useNavigate } from "react-router";


function AdoptionForm() {
  const { user } = useSelector((state) => state);
  const  {pets}  = useSelector((state) => state);
  const { foundations } = useSelector((state) => state);
  const [name, setName] = useState(user.name);
  const [last_name, setLastName] = useState(user.last_name);
  const [numberPhone, setNumberPhone] = useState(user.numberPhone);
  const [age, setAge] = useState(user.age);
  const [civilStatus, setCivilStatus] = useState(user.civilStatus);
  const [location, setLocation] = useState(user.location);
  const [availableSpace, setAvailableSpace] = useState(user.availableSpace);
  const [kids, setKids] = useState(user.kids);
  const [otherPets, setOtherPets] = useState(user.otherPets);
  const [message, setMessage] = useState(user.message)
  const navigate = useNavigate();

  
  const nameChange = (e) => {
    setName(e.target.value);
  };

  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const numberPhoneChange = (e) => {
    setNumberPhone(e.target.value);
  }; 

  const ageChange = (e) => {
    setAge(e.target.value);
  }; 

  const civilStatusChange = (e) => {
    setCivilStatus(e.target.value);
  }; 

  const locationChange = (e) => {
    setLocation(e.target.value);
  }; 

  const availableSpaceChange = (e) => {
    setAvailableSpace(e.target.value);
  }; 

  const kidsChange = (e) => {
    setKids(e.target.value);
  }; 

  const otherPetsChange = (e) => {
    setOtherPets(e.target.value);
  }; 

  const messageChange = (e) => {
    setMessage(e.target.value);
  }; 

  const handleSend = () => {
    axios
      .put(`https://okqobo-3001.preview.csb.app/api/user/form/${user._id}`, {
      name: name,
      last_name: last_name,
      numberPhone: numberPhone,
      age: age,
      civilStatus: civilStatus,
      location: location,
      availableSpace: availableSpace,
      kids: kids,
      otherPets: otherPets,
      message: message,
      foundations : foundations,
      pets : pets ,
      email: user.email
      })
      .then(() => {navigate("/thanksAdoption")})
  };

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  if (matches) {
  } else {
  }

  return (
    <div className="App">
      <Grid sx={{ marginTop: 10, marginBottom: 10 }}>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto", borderRadius: "17px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Formulario de Adopción
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Desde "Patitas Con Techo" realizamos este formulario para así
              poder comprender el contexto del adoptante y cuidar a nuestros
              animales.
            </Typography>
            <form>
              <Grid container spacing={2} marginTop={2}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    id="firstName"
                    fullWidth
                    required
                    onChange={nameChange}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    id="lastName"
                    fullWidth
                    required
                    onChange={lastNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Numero de telefono"
                    variant="outlined"
                    id="numberPhone"
                    fullWidth
                    required
                    onChange={numberPhoneChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Edad"
                    variant="outlined"
                    id="age"
                    fullWidth
                    required
                    onChange={ageChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Estado Civil
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="civilStatus"
                      label="Estado Civil"
                      onChange={civilStatusChange}
                    >
                      <MenuItem value={"Soltero"}>Soltero/a</MenuItem>
                      <MenuItem value={"Casado"}>Casado/a</MenuItem>
                      <MenuItem value={"Otro"}>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    id="location"
                    fullWidth
                    required
                    onChange={locationChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Espacio disponible para la mascota
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="availableSpace"
                      label="Espacio disponible para la mascota"
                      onChange={availableSpaceChange}
                    >
                      <MenuItem value={"Casa"}>Casa</MenuItem>
                      <MenuItem value={"Departamento"}>Departamento</MenuItem>
                      <MenuItem value={"Patio"}>Patio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      ¿Convive con niños?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="kids"
                      label="¿Convive con niños?"
                      onChange={kidsChange}
                    >
                      <MenuItem value={"Si"}>Si</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      ¿Tiene más mascotas?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="otherPets"
                      label="¿Tiene más mascotas?"
                      onChange={otherPetsChange}
                    >
                      <MenuItem value={"Si"}>Si</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="¿Algo que nos quieras contar?"
                    multiline
                    rows={4}
                    id="message"
                    placeholder="Alguna experiencia previa con otra mascota, algo importante que tengamos que saber, etc"
                    variant="outlined"
                    fullWidth
                    onChange={messageChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSend}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default AdoptionForm;
