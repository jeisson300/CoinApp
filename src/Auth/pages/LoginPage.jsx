import { Button, Grid, Link, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { islogin } from '../../store/auth/thunk'
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {


  const {state, handleOnChange, handleOnReset} = useForm({

    email: "jeisson@hotmail.com",
    password: "123"
  });
const {email, password} = state;

const dispatch =   useDispatch();

  const handleLogin = (event)=>
  {
    event.preventDefault();
    dispatch(islogin(email, password));
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin}>
        <Grid container sx={{ backgroundColor: 'white' }}>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              type="email"
              placeholder="Write your email"
              label="Email"
              fullWidth
              name = 'email'
              onChange={handleOnChange}
              value={email}

            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              type="password"
              placeholder="Write your password"
              label="Password"
              fullWidth
              name = 'password'
              onChange={handleOnChange}
              value={password}
            />
          </Grid>

          <Grid container spacing={3} direction="row"
           justifyContent="center">
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth>
                Log in
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{mt:3}}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
