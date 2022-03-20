import React from 'react'
import Layout from './Layout'
import {theme} from './style';
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Layout/>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App