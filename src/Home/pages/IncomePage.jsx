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
  isIncomeDelete,
  isIncomesAll,
  isIncomeUpdate,
  isSaveIncomes,
} from '../../store/income/thunk'
import { useEffect } from 'react'
import { useModal } from '../../hooks/useModal'
import { Create, Delete } from '@mui/icons-material'

export const IncomePage = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const [handleType, sethandleType] = useState('save')
  const { token, id: userId } = useSelector((state) => state.auth)
  const { incomes, incomesSelect } = useSelector((state) => state.income)
  const [loadIncomes, setloadIncomes] = useState(0)

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
    dispatch(isIncomesAll({ token }))
  }, [loadIncomes])
  const rows = useMemo(() => incomes, [incomes])
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

  const handleIncome = (event) => {
    event.preventDefault()
    dispatch(isSaveIncomes({ name, value, userId, token }))
    setloadIncomes(loadIncomes + 1)
  }

  const handleNewIncome = () => {
    handleOnReset()
    sethandleType('save')
    openModal()
  }

  const handleNewUpdate = () => {
    const line = incomesSelect.map((item) =>
      incomes.find(({ id }) => id === item),
    )
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
    dispatch(isIncomeUpdate({ name, value, date, id, userId, token }))
    setloadIncomes(loadIncomes + 1)
  }

  const handleDelete = () => {
    dispatch(isIncomeDelete({ incomesSelect, token }))
    setloadIncomes(loadIncomes + 1)
    console.log(loadIncomes)
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
          <Button variant="contained" onClick={handleNewIncome}>
            New Income
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
                disabled={incomesSelect.length != 1}
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
          <TableComponent columns={columns} rows={rows} provider={'income'} />
        </Grid>
      </Grid>

      <ModalComponent>
        <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
          Income
        </Typography>
        <form onSubmit={handleIncome}>
          <Grid container direction="column" sx={{ mt: 5 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                placeholder="Write income's name"
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
                placeholder="Write income's value "
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
