import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotesIcon from '@mui/icons-material/Notes';


import defaultAvatar from '../../Assets/profile.png';
import background from '../../Assets/restaurants.jpg';
import axiosInstance from '../../Services/axios';




function AddBlogForm() {

  const [fdata, setFData] = useState(
    { title: '',
      content: ''
  })
  const [fimage, setFImage] = useState('');

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
    formData.append('title', fdata.title);
    formData.append('content', fdata.content);
    formData.append('image', fimage);

		axiosInstance
			.post(`blogs/add/`, formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
			.then((res) => {
        navigate('/feed');
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
          backgroundImage: '#181414'
          }}>

        <center>
          <Grid 
            item 
            component={Paper} 
            elevation={6} 
            sx={{ 
              mx: '25rem'
              
            }}>
            <Box
              sx={{
                my: '7.5rem',
                mx: '5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '25rem',
              }}
            >
              <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                <NotesIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create a blog
              </Typography>
              <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 1 }}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  multiline
                  rows={4}
                  fullWidth
                  name="content"
                  label="Blog content here"
                  id="content"
                  autoComplete="content"
                  onChange={handleChange}
                />

                <Typography align="center"
                            sx={{ m: 2}}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={handleChangeImage}
                  >
                    Upload Image*
                    <input
                      type="file"
                      required
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
                  Post
                </Button>

              </Box>
            </Box>
          </Grid>
        </center>
      </Grid>
    </ThemeProvider>
  );
}
export default AddBlogForm;