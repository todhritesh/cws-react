import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { secondaryMain } from '../style';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import {auth} from '../firebase-config'

const useStyles = makeStyles({
  activeLink : {
    border:`2px solid ${secondaryMain}`
  }
})

export const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    backgroundColor:secondaryMain,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]:{
      marginLeft: `-${drawerWidth}px`,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('md')]:{
        // marginLeft: '10px',
      },
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('md')]:{

      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminLayout({children , user , setUser , open , setOpen}) {
  const classes = useStyles()
  const location = useLocation()
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate()

  React.useEffect(()=>{
    if(!user){
      navigate('/admin/login')
    }else{
      navigate('/admin/')
    }
  },[])

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function handleLogout(){
    const log = await signOut(auth)
    setUser('')
    navigate('/admin/login')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          [theme.breakpoints.up('md')]:{

            width: drawerWidth,
          },
          [theme.breakpoints.down('md')]:{

            width: 0,
          },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton color="secondary" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem className={location.pathname==='/admin'?classes.activeLink:''} ><ListItemButton component={Link} to="/admin"  >Home</ListItemButton></ListItem>
          <ListItem className={location.pathname==='/admin/manage-students'?classes.activeLink:''} ><ListItemButton component={Link} to="/admin/manage-students" >Manage Students</ListItemButton></ListItem>
          <ListItem className={location.pathname==='/admin/manage-courses'?classes.activeLink:''} ><ListItemButton component={Link} to="/admin/manage-courses" >Manage Courses</ListItemButton></ListItem>
          <ListItem className={location.pathname==='/admin/manage-fees'?classes.activeLink:''} ><ListItemButton component={Link} to="/admin/manage-fees" >Manage Fees</ListItemButton></ListItem>
          <ListItem className={location.pathname==='/admin/add-placements'?classes.activeLink:''} ><ListItemButton component={Link} to="/admin/add-placements" >Add Placements</ListItemButton></ListItem>
          <ListItem><ListItemButton onClick={handleLogout} >Logout</ListItemButton></ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
