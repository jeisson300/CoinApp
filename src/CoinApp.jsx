import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './Theme/AppTheme'

export const CoinApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
