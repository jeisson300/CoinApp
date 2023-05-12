import { Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import { TableComponent } from '../components/TableComponent'
import { TextField, Typography } from '@mui/material'
import { ModalComponent } from '../components/ModalComponent'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
  isHoldingDelete,
  isHoldingsAll,
  isHoldingUpdate,
  isSaveHolding,
} from '../../store/holding/thunk'
import { useEffect } from 'react'
import { useModal } from '../../hooks/useModal'
import { Create, Delete } from '@mui/icons-material'

export const HoldingPage = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const [handleType, sethandleType] = useState('save')
  const { token, id: userId } = useSelector((state) => state.auth)
  const { holdings, holdingsSelect } = useSelector((state) => state.holding)
  const [loadholdings, setloadholdings] = useState(0)

  const {
    name,
    value,
    id,
    rate,
    date,
    handleOnChange,
    setstate,
    handleOnReset,
  } = useForm({
    id: '',
    name: '',
    value: 0,
    rate: 0,
    date: new Date(),
  })
  useEffect(() => {
    dispatch(isHoldingsAll({ token }))
  }, [loadholdings])
  const rows = useMemo(() => holdings, [holdings])
  const columns = [
    {
      headerName: 'Name',
      field: 'name',
      width: 300,
    },
    {
      headerName: 'Value',
      field: 'value',
      width: 300,
    },
    {
      headerName: 'Date',
      field: 'date',
      width: 300,
    },
    {
      headerName: 'Rate',
      field: 'rate',
      width: 300,
    },
  ]

  const handleholding = (event) => {
    event.preventDefault()
    const newDate = moment().format('MMMM Do YYYY, h:mm:ss a').toString()
    dispatch(isSaveHolding({ name, userId, rate, value, token }))
    setloadholdings(loadholdings + 1)
  }

  const handleNewholding = () => {
    handleOnReset()
    sethandleType('save')
    openModal()
  }

  const handleNewUpdate = () => {
    const line = holdingsSelect.map((item) =>
      holdings.find(({ id }) => id === item),
    )
    setstate({
      id: line[0].id,
      name: line[0].name,
      value: line[0].value,
      rate: line[0].rate,
      date: line[0].date,
    })
    sethandleType('update')
    openModal()
  }
  const handleUpdate = () => {
    dispatch(isHoldingUpdate({ name, value, userId, date, rate, id, token }))
    setloadholdings(loadholdings + 1)
  }

  const handleDelete = () => {
    dispatch(isHoldingDelete({ holdingsSelect, token }))
    setloadholdings(loadholdings + 1)
  }

  return (
    <HomeLayout>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{ mt: 5 }}
      >
        <Grid item>
          <Button variant="contained" onClick={handleNewholding}>
            New holding
          </Button>
        </Grid>
        <Grid item sx={{ mt: 5 }}>
          <Grid
            container
            direction="row"
            spacing={3}
            justifyContent="flex-start"
          >
            <Grid item>
              <IconButton
                onClick={handleNewUpdate}
                disabled={holdingsSelect.length != 1}
              >
                <Create />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          <TableComponent columns={columns} rows={rows} provider={'holding'} />
        </Grid>
      </Grid>

      <ModalComponent>
        <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
          holding
        </Typography>
        <form onSubmit={handleholding}>
          <Grid container direction="column" sx={{ mt: 5 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                placeholder="Write holding's name"
                type="text"
                label="name"
                fullWidth
                name="name"
                onChange={handleOnChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                placeholder="Write holding's value "
                type="number"
                label="value"
                fullWidth
                name="value"
                onChange={handleOnChange}
                value={value}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                placeholder="Write holding's rate "
                type="number"
                label="rate"
                fullWidth
                name="rate"
                onChange={handleOnChange}
                value={rate}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Grid item xs={6}>
              {handleType === 'save' ? (
                <Button type="submit" variant="contained" fullWidth>
                  Save
                </Button>
              ) : (
                <Button variant="contained" fullWidth onClick={handleUpdate}>
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </ModalComponent>
    </HomeLayout>
  )
}
