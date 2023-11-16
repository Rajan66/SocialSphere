import React, { useState } from 'react'
import { Avatar, Button, Typography, Paper, Grid, Container, TextField } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import LockOutLinedIcon from '@mui/icons-material/LockOutlined'
// import { useStyles } from './styles'
import Input from './Input';
import { useDispatch } from 'react-redux';

const Auth = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const switchMode = () => {
    // isSignUp ? setIsSignUp(false) : setIsSignUp(true)
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const googleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google Sign In was unsuccessful. Try again later!')
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Avatar>
            <LockOutLinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>

                  <Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" onChange={handleChange} half />

                </>
              )}
              <Input name="email" label="Email Address" onChange={handleChange} type='email' />
              <Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignUp && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? 'Already have an account? Sign in' : 'Dont have an account? Sign Up'}
                </Button>

                {isSignUp && <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} cookiePolicy="single_host_origin" />}

              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>

  )
}

export default Auth