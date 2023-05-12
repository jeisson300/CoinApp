import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { BillPage } from '../pages/BillPage'
import { HoldingPage } from '../pages/HoldingPage'
import { HomePage } from '../pages/HomePage'
import { IncomePage } from '../pages/IncomePage'
import { WalletPage } from '../pages/WalletPage'

export const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bill" element={<BillPage />} />
      <Route path="/income" element={<IncomePage />} />
      <Route path="/holding" element={<HoldingPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
