import { Button, Grid, Link, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { isRegister } from '../../store/auth/thunk'
import { AuthLayout } from '../layout/AuthLayout'

export const Register = () => {


  const {state, handleOnChange, handleOnReset} =  useForm({
    email: "tyler@gmail.com",
    name : "tyler",
    password: "123"
  })

const {email, name, password} = state;
const dispatch = useDispatch();

const handleRegister = (e)=>
{
  e.preventDefault();
  dispatch(isRegister(email, password, name));
}

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister}>
        <Grid container>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              placeholder="Write your email"
              type="email"
              label="Email"
              fullWidth
              name='email'
              onChange={handleOnChange}
              value = {email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              placeholder="Write your name"
              type="text"
              label="Name"
              fullWidth
              name='name'
              onChange={handleOnChange}
              value = {name}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              placeholder="Write your password"
              type="password"
              label="Password"
              fullWidth
              name='password'
              onChange={handleOnChange}
              value = {password}
            />
          </Grid>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth >
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end' sx={{mt:3}}>
          <Link component={RouterLink} to="/auth/login" >
                Do you have a account?
              </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
