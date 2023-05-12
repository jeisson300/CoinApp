import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch } from 'react-redux'
import { billSelect } from '../../store/bill/biillSlice'
import { holdingSelect } from '../../store/holding/holdingSlice'
import { incomeSelect } from '../../store/income/incomeSlice'

export const TableComponent = ({ columns, rows, provider }) => {

  const dispatch = useDispatch();

  const handleSelect = (id) => {
    if(provider === 'income')
    {
      dispatch(incomeSelect({id}))
    }
    else if(provider === 'bill')
    {
      dispatch(billSelect({id}))
    }
    else{
      dispatch(holdingSelect({id}))
    }
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handleSelect}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}
