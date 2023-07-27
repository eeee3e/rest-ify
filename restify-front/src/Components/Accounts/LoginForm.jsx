import React, { useState } from 'react';
import axiosInstance from '../../Services/axios';
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
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import background from '../../Assets/register.jpg';

// Form inspired by https://github.com/mui/material-ui/blob/v5.6.1/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js


function LoginForm() {

  const [fdata, setFData] = useState(
    { username: '',
      pw: '',

  })

  const theme = createTheme();

  let navigate = useNavigate();

  const handleChange = (e) => {
		setFData({ ...fdata, [e.target.name]: e.target.value });
	};

	const submitForm = (e) => {
		e.preventDefault();
    
    let formData = new FormData();
    formData.append('username', fdata.username);
    formData.append('password', fdata.pw);

		axiosInstance
			.post(`accounts/login/`, formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
			.then((res) => {
        if (res === undefined) { 
          throw "Credentials do not match on any registered Restify user."}
        console.log(res);
        //localStorage.setItem('user_id', );
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        navigate("../restaurant/search");
      })
      .catch((error) => {
        alert(error)       
      });
	};


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="pw"
                label="Password"
                type="password"
                id="pw"
                autoComplete="pw"
                onChange={handleChange}
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2" to="/register">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default LoginForm;