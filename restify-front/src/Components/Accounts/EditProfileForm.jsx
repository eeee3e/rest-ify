import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';


import defaultAvatar from '../../Assets/profile.png';
import background from '../../Assets/restaurants.jpg';
import axiosInstance from '../../Services/axios';
import Edit from '@mui/icons-material/Edit';


function EditProfileForm() {

  const [fdata, setFData] = useState(
    { username: '',
      fname: '',
      lname: '',
      email: '',
      pw: '',
      pw2: '',
      phone: '',
  })
  const [fimage, setFImage] = useState(defaultAvatar)

  const theme = createTheme();

  const navigate = useNavigate();

  const handleChange = (e) => {
		setFData({ ...fdata, [e.target.name]: e.target.value });
	};
  
  const handleChangeImage = (e) => {
    setFImage(e.target.files[0])
  }


  useEffect(() => {
    // preload current user data into state
  })

	const submitForm = (e) => {
		e.preventDefault();
		console.log(fdata, fimage);
    
    let formData = new FormData();
    formData.append('username', fdata.username);
    formData.append('first_name', fdata.fname);
    formData.append('last_name', fdata.lname);
    formData.append('email', fdata.email);
    formData.append('phone_number', fdata.phone);
    formData.append('password', fdata.pw);
    formData.append('password2', fdata.pw2);
    formData.append('avatar', fimage);

		axiosInstance
			.put(`accounts/edit/1`, formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
			.then((res) => {
        navigate('/home');
			})
      .catch((error) => {
        if (error.response.data) {
          alert(`${Object.entries(error.response.data)[0][0]}: ${Object.entries(error.response.data)[0][1]}`);
        }
        else{
          alert(error);
        }
        
      });
	};

  return (
    <ThemeProvider theme={theme}>
      <Grid  container component="main" 
        sx={{ 
          height: '100%',
          backgroundColor: '#181414'
          }}>
        <center>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                <Edit />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Profile
              </Typography>
              <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  autoComplete="fname"
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  
                  fullWidth
                  name="pw"
                  label="Password"
                  type="password"
                  id="pw"
                  autoComplete="pw"
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  
                  fullWidth
                  name="pw2"
                  label="Confirm password"
                  type="password"
                  id="pw2"
                  autoComplete="pw2"
                  onChange={handleChange}
                />

                <Typography align="center"
                            sx={{ m: 2}}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={handleChangeImage}
                  >
                    Change Avatar
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      hidden
                    />
                  </Button>
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 4 }}
                >
                  Edit
                </Button>

              </Box>
            </Box>
          </Grid>
        </center>
      </Grid>
    </ThemeProvider>
  );
}
export default EditProfileForm;