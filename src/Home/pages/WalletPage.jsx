import { Box, Button, Grid, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { HomeLayout } from '../layout/HomeLayout'
import { iswalletAll } from '../../store/wallet/thunk'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'

export const WalletPage = () => {
  const { token, id } = useSelector((state) => state.auth)
  const [startTable, setstartTable] = useState(0)
  const { wallets } = useSelector((state) => state.wallet)
  const dispatch = useDispatch()
  const { date, handleOnChange } = useForm({
    date: new Date(),
  })
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(iswalletAll({ token, id, date }))
    const formattedData = wallets.map(({ id, descripcion: name, sumTotal }) => {
      const value = parseFloat(sumTotal.replace(/[^\d.-]/g, ''))
      return { name, value }
    })

    setData(formattedData)
  }, [startTable])

  const rowsWallet = useMemo(() => wallets, [wallets])
  const columnsWallet = [
    {
      headerClassName: 'super-app-theme--header',
      headerName: 'Codigo',
      field: 'id',
      width: 150,
      headerAlign: 'center',
    },
    {
      headerClassName: 'super-app-theme--header',
      headerName: 'Description',
      field: 'descripcion',
      width: 150,
      headerAlign: 'center',
    },
    {
      headerName: 'Total',
      field: 'sumTotal',
      width: 150,
      headerAlign: 'center',
    },
  ]

  const handleFilter = () => {
    try {
      // dispatch(iswalletAll({ token, id, date }))
      setstartTable(startTable + 1)
    } catch (error) {}
  }
  return (
    <HomeLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sx={{ mt: 3, mb: 2 }}>
          <TextField
            type="date"
            label="date"
            name="date"
            onChange={handleOnChange}
            value={date}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
        </Grid>

        <Box sx={{ height: 400, width: '40%', display: 'inline-flex', mt: 4 }}>
          <DataGrid
            rows={rowsWallet}
            columns={columnsWallet}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <br />
        <label>TOTALED</label>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      </Grid>
    </HomeLayout>
  )
}
