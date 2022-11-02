import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import axios from "axios";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

export default function Carousel({foundation, foundationId}) {

    const [pets, setPets] = useState([])
    
    useEffect(()=>{
        axios
            .get(`https://okqobo-3001.preview.csb.app/api/foundation/${foundationId}/pets`)
            .then(pets=>setPets(pets.data))
    },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: true,
          dots: true
        }
        },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

    
  };
  return (
    <Slider {...settings} className='slider'>

      {pets?.map((pet,i) =>{
       return(
        <Box spacing={2} key={i}>
        <div >
          <h3>
            <Card sx={{ maxWidth: 150, maxHeight: 280 }}>
              <CardActionArea>
                {pet.photos[0] && <CardMedia

                  component="img"
                  image={''}
                  alt="pet_img"
                  />
                }
                
                <Link style={{ textDecoration: "none" }}  to={`/pets/${pet._id}`}>

                  <CardContent
                    component={Stack}
                    direction="column"
                    justifyContent="center"
                    sx={{
                      bgcolor: "secondary.main",
                      height: 80,
                    }}
                  >
                    <Typography
                      color="text.main"
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      borderRadius={5}
                    >
                    </Typography>
                  </CardContent>
                  </Link> 
              </CardActionArea>
            </Card>
           
          </h3>
        </div>
        </Box>
      )})}
    </Slider>
  );
}
