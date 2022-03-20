import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Achievements from './Achievements'
import Courses from './Courses'
import LandingBoard from './LandingBoard'
import {theme} from './../style'


const useStyles = makeStyles({
    paperBorder:{
      borderLeft:`5px solid ${theme.palette.primary.main}`,
      paddingLeft:10,
      marginBottom:10
    },
    backgroundTheme:{
      backgroundColor:theme.palette.secondary.main,
    }
  })

function Home() {
    const classes = useStyles()
  return (
    <>
    <LandingBoard/>
    <Grid xs={12} container sx={{p:5}} className={classes.backgroundTheme}>
      <div className={classes.paperBorder}>
        <Typography variant="h5" color="primary.main">
          Our Courses
        </Typography>
      </div>
      <Courses/>
    </Grid>

    <Grid xs={12} sx={{p:5}} container className={classes.backgroundTheme}>
      <div className={classes.paperBorder}>
        <Typography variant="h5" color="primary.main">
          Students Achievements
        </Typography>
      </div>
      <Achievements/>
    </Grid>
  </>
  )
}

export default Home