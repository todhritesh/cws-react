import { AppBar, Button, IconButton, Toolbar, Typography , Menu , MenuItem } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { navbarColor } from '../style';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import {primaryMain , secondaryMain} from '../style'
import MoreIcon from '@mui/icons-material/MoreVert';

const theme = createTheme()
const useStyles = makeStyles((theme)=>{
    return {
        navbarColor:{
            backgroundImage:navbarColor,
            width:"100%"
        },
        navbarPadding:{
            padding:10
        },
        addPaddingToTypoGraphy:{
            padding:'10px'
        },
        viewLg:{
            display:'block',
            [theme.breakpoints.down('md')]:{
                display:'none'
            }
        },
        viewSm:{
        display:'none',
        [theme.breakpoints.down('md')]:{
            display:'block'
        }
    }
    
}})

function Navbar() {
    const [mobileAnchor , setMobileAnchor] = React.useState(null);
    const ismobileMenuOpen = Boolean(mobileAnchor);
    const openMobileMenu = (e) => { setMobileAnchor(e.currentTarget)}
    const closeMobileMenu = () => {setMobileAnchor(null)}
    const mobileMenu = (
        <Menu onClose={closeMobileMenu} anchorEl={mobileAnchor} id='mobile-menu' keepMounted open={ismobileMenuOpen} >
            <MenuItem component={Link}  to="/"  onClick={closeMobileMenu} >Home</MenuItem>
            <MenuItem component={Link}  to="/courses"  onClick={closeMobileMenu} >Courses</MenuItem>
            <MenuItem component={Link}  to="/pay-dues"  onClick={closeMobileMenu} >Online Playments</MenuItem>
            <MenuItem  component={Link}  to="/apply"  onClick={closeMobileMenu} >Apply For Adminssion</MenuItem>
        </Menu>
    )
    const location = useLocation();
    const classes = useStyles()
  return (
    <>
    <AppBar className={`${classes.navbarColor} ${classes.navbarPadding}`} positon="fixed">
        <Toolbar>
            <IconButton  component={Link} to="/" >
                <Typography variant="h5" color="#ebebeb">
                    Abc
                </Typography>
            </IconButton>
            <Box sx={{flexGrow:1}}/>
            <Box className={classes.viewLg}>
                <Button component={Link}  to="/"  ><Typography className={classes.addPaddingToTypoGraphy} sx={{borderBottom:location.pathname==='/'?'5px solid '+secondaryMain:''}} color="#ebebeb">Home</Typography></Button>
                <Button component={Link}  to="/courses"  ><Typography className={classes.addPaddingToTypoGraphy} sx={{borderBottom:location.pathname==='/courses'?'5px solid '+secondaryMain:''}} color="#ebebeb">Courses</Typography></Button>
                <Button component={Link}  to="/pay-dues"  ><Typography className={classes.addPaddingToTypoGraphy} sx={{borderBottom:location.pathname==='/pay-dues'?'5px solid '+secondaryMain:''}} color="#ebebeb">Online Payment</Typography></Button>
                <Button component={Link}  to="/apply"><Typography className={classes.addPaddingToTypoGraphy} sx={{borderBottom:location.pathname==='/apply'?'5px solid '+secondaryMain:''}} color="#ebebeb">Apply For Admission</Typography></Button>
            </Box>
            <Box className={classes.viewSm} >
                <IconButton  color="inherit" >
                    <MoreIcon onClick={openMobileMenu} />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
    {mobileMenu}
    </>
  )
}

export default Navbar