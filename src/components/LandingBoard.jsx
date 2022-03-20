import React from 'react'
import {makeStyles} from '@mui/styles';
import { navbarColor } from '../style';
import { Box, Typography , Paper } from '@mui/material';
import { createTheme } from '@mui/system';
// import { theme } from '../style';



const theme = createTheme()
const useStyles = makeStyles(theme=>({
    styleLandingBoard : {
        // backgroundColor : navbarColor,
        backgroundImage : navbarColor,
        padding:150,
        paddingLeft:100,
        paddingRight:100,
        [theme.breakpoints.down('md')]:{
            padding:90,
            paddingLeft:10,
            paddingRight:10,
        },        
    },
    boardHead:{
        paddingBottom:'40px',
        fontWeight:'lighter',
        [theme.breakpoints.down('md')]:{
            paddingBottom:'30px',
            fontSize:'60px'
        },
        fontSize:'80px'
    },
    boardContent:{
        fontWeight:'lighter',
        [theme.breakpoints.down('md')]:{
            fontSize:'15px'
        },
        fontSize:'20px'
    }
}))
function LandingBoard() {
    const classes = useStyles()
  return (
    <Box elevation={20} component={Paper} className={classes.styleLandingBoard}>
        <Typography component='p' className={classes.boardHead} variant="p" color="#ebebeb">
            Skill Hai! To Future Hai!
        </Typography>
        <Typography className={classes.boardContent} variant="body1" color="#ebebeb">
        "CWS is an on-demand marketplace for top Programming engineers, developers, consultants, architects, programmers, and tutors. Get your projects built by vetted web programming freelancers or learn from expert mentors with team training & coaching experiences in Project based training."
        </Typography>
    </Box>
  )
}

export default LandingBoard