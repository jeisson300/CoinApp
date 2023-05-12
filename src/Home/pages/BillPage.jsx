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
  isBillDelete,
  isBillsAll,
  isBillUpdate,
  isSaveBills,
} from '../../store/bill/thunk'
import { useEffect } from 'react'
import { useModal } from '../../hooks/useModal'
import { Create, Delete } from '@mui/icons-material'

export const BillPage = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const [handleType, sethandleType] = useState('save')
  const { token, id: userId } = useSelector((state) => state.auth)
  const { bills, billsSelect } = useSelector((state) => state.bill)
  const [loadbills, setloadbills] = useState(0)

  const {
    name,
    value,
    id,
    date,
    handleOnChange,
    setstate,
    handleOnReset,
  } = useForm({
    id: '',
    name: '',
    value: 0,
    date: new Date(),
  })
  useEffect(() => {
    dispatch(isBillsAll({ token }))
  }, [loadbills])
  const rows = useMemo(() => bills, [bills])
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
  ]

  const handlebill = (event) => {
    event.preventDefault()
    const newDate = moment().format('MMMM Do YYYY, h:mm:ss a').toString()
    dispatch(isSaveBills({ name, value, userId, token }))
    setloadbills(loadbills + 1)
  }

  const handleNewbill = () => {
    handleOnReset()
    sethandleType('save')
    openModal()
  }

  const handleNewUpdate = () => {
    const line = billsSelect.map((item) => bills.find(({ id }) => id === item))
    setstate({
      id: line[0].id,
      name: line[0].name,
      value: line[0].value,
      date: line[0].date,
    })
    sethandleType('update')
    openModal()
  }
  const handleUpdate = () => {
    dispatch(isBillUpdate({ name, value, userId, date, id, token }))
    setloadbills(loadbills + 1)
  }

  const handleDelete = () => {
    dispatch(isBillDelete({ billsSelect, token }))
    setloadbills(loadbills + 1)
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
          <Button variant="contained" onClick={handleNewbill}>
            New bill
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
                disabled={billsSelect.length != 1}
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
          <TableComponent columns={columns} rows={rows} provider={'bill'} />
        </Grid>
      </Grid>

      <ModalComponent>
        <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
          bill
        </Typography>
        <form onSubmit={handlebill}>
          <Grid container direction="column" sx={{ mt: 5 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                placeholder="Write bill's name"
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
                placeholder="Write bill's value "
                type="number"
                label="value"
                fullWidth
                name="value"
                onChange={handleOnChange}
                value={value}
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
