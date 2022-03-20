import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles';
import {theme} from '../style'

const useStyles = makeStyles({
  content:{
    fontSize:'13px',
    fontWeight:'normal',
    color:theme.palette.primary.main
  }
})

function CourseCard({title,duration ,image}) {
  const classes = useStyles()
  return (
    <Card elevation={10}>
        <CardMedia
        component='img'
        image={image}
        height='150'
        />
        <CardContent sx={{pb:2}}>
            <div className={classes.content} >
                {title}
            </div>
        </CardContent>
        <Divider/>
        <Typography sx={{textAlign:'center',fontWeight:'bold',pb:0.7}} component='p' color="primary.main" variant='body2' >
            {`Duraiton : ${duration}`}
        </Typography>
    </Card>
  )
}

export default CourseCard