import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'
import { primaryMain, secondaryMain } from '../style'

const useStyles = makeStyles({
    cardTexture:{
        background:primaryMain,
        color:secondaryMain,
        minHeight:'300px',
        minWidth:'410px',
        // wordWrap: 'break-word',
        // overflowWrap:'break-word'

    },
    digitFont:{
        fontSize:'100px',
        fontWeight:'100'
    },
    textFont:{
        fontSize:'30px',
        fontWeight:'100',
        // wordWrap: 'break-word',
        // overflowWrap:'break-word'
    }
})

function AdminHome() {
    const classes = useStyles()
  return (
    <Grid container sx={{minHeight:'100vh' , mt:3 , justifyContent:'center' , px:4}} spacing={2}>
        <Grid item lg={4} md={6}>
            <Card>
                <CardContent className={`${classes.cardTexture}`}>
                    <Typography className={`${classes.textFont} `} component='div' variant="p">
                        Total Students
                    </Typography>
                    <Typography className={`${classes.digitFont} `} variant="p">
                        43
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item lg={4} md={6}>
            <Card>
                <CardContent className={`${classes.cardTexture}`}>
                    <Typography className={`${classes.textFont} `} component='div' variant="p">
                        Pending Applications
                    </Typography>
                    <Typography className={`${classes.digitFont} `} variant="p">
                        43
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item lg={4} md={6}>
            <Card>
                <CardContent className={`${classes.cardTexture}`}>
                    <Typography className={`${classes.textFont} `} component='div' variant="p">
                        Total Courses
                    </Typography>
                    <Typography className={`${classes.digitFont} `} variant="p">
                        43
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default AdminHome