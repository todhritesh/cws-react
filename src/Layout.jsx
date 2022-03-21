import { Grid , Typography,Paper, Toolbar} from '@mui/material'
import React from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {makeStyles} from '@mui/styles';
import {theme} from './style'
import { Route, Routes, useLocation } from 'react-router-dom'
import CoursePage from './components/CoursePage'
import ApplyPage from './components/ApplyPage'
import FeeCheckingPage from './components/FeeCheckingPage'
import AdminLayout from './admin/AdminLayout'
import ManageStudents from './admin/ManageStudents'
import AdminHome from './admin/AdminHome'
import ManageCourses from './admin/ManageCourses'
import ManageFees from './admin/ManageFees'
import Home from './components/Home'
import AdminLogin from './admin/AdminLogin';
import AddPlacements from './admin/AddPlacements';

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

function Layout() {
  const [user , setUser] = React.useState('')
  const classes = useStyles()
  const location = useLocation()
  const [open, setOpen] = React.useState(false);
  return (
    <Grid container className={classes.backgroundTheme}>
        {!location.pathname.includes('admin') && <Navbar/> }
        <Toolbar/>
      <Routes>

        <Route exact path="/"
        element={
          <Home/>
        }
        />

        <Route exact path="/courses"
          element={
            <CoursePage/>
          }
        />

        <Route exact path="/apply"
          element={
            <ApplyPage/>
          }
        />

        <Route exact path="/pay-dues"
          element={
            <FeeCheckingPage/>
          }
        />


        {
          !user && (
            <Route path="/admin/login" exact
          element={
            <AdminLogin user={user} setUser={setUser} />
          }
        />
          )
        }

        
          <Route path="/admin" exact
          element={
            <AdminLayout user={user} setUser={setUser} open={open} setOpen={setOpen} ><AdminHome /></AdminLayout>
          }
        />
          

        
            <Route path="/admin/manage-students" exact
          element={
            <AdminLayout user={user} setUser={setUser} open={open} setOpen={setOpen} ><ManageStudents open={open} setOpen={setOpen} /></AdminLayout>
          }
        />
          

        
            <Route path="/admin/manage-courses" exact
          element={
            <AdminLayout user={user} setUser={setUser} open={open} setOpen={setOpen} ><ManageCourses open={open} setOpen={setOpen} /></AdminLayout>
          }
        />
          

        
        <Route path="/admin/manage-fees" exact
          element={
            <AdminLayout user={user} setUser={setUser} open={open} setOpen={setOpen} ><ManageFees open={open} setOpen={setOpen} /></AdminLayout>
          }
        />

        
        <Route path="/admin/add-placements" exact
          element={
            <AdminLayout user={user} setUser={setUser} open={open} setOpen={setOpen} ><AddPlacements  /></AdminLayout>
          }
        />
          

        <Route path="/*" 
          element={
            <Home/>
          }
        />
          



      </Routes>
      {!location.pathname.includes('admin') && 
        <Grid xs={12} sx={{p:0}} container className={classes.backgroundTheme}>
          <Footer/>
        </Grid>
      }
     </Grid> 
  )
}

export default Layout