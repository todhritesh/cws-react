import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles';
import {theme} from '../style'

const useStyles = makeStyles({
  content:{
    lineHeight:'17px',
    fontSize:'13px',
    color:theme.palette.primary.main
  }
})


function AchievementsCard({name , image , company , role}) {
    const classes = useStyles()
    console.log(image)
  return (
    <Card elevation={10}>
        <CardMedia
        component='img'
        image={image}
        height='170'
        />
        <CardContent sx={{pb:1}}>
            <Typography variant='h6'>
                {name}
            </Typography>
            <Typography variant='subtitle2' component="div">
                {role}
            </Typography>
            <Typography variant='caption' component="div">
                {company}
            </Typography>
        </CardContent>
    </Card>
  )
}

export default AchievementsCard