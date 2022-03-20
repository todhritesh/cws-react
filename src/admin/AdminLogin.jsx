import { Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import {auth} from '../firebase-config'
import {signInWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function AdminLogin({user,setUser}) {
    const navigate = useNavigate()
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
    onAuthStateChanged(auth , (currentUser)=>{
        if(currentUser){
            setUser(currentUser)
            navigate('/admin')
        }
        // navigate('/admin/login')
    })
    const handleLogin = async ()=>{
        try{
            const res = await signInWithEmailAndPassword(auth , email , password)
            console.log(res.user)
            navigate('/admin')
        }catch(err){
            console.log(err)
        }
    }
  return (
      <Grid sx={{minHeight:'100vh',p:-1}} container>
        <Grid item md={7} sx={{mx:'auto'}}>
            <Paper sx={{p:3}}>
                <Typography variant='h3' >Admin Login</Typography>
                <Grid item sx={{mb:1}}>
                    <FormControl fullWidth >
                        <Typography>UserName</Typography>
                        <TextField value={email} onChange={(e)=>setEmail(e.target.value)} name="title" size='small'  />
                    </FormControl>
                </Grid>
                <Grid item sx={{mb:1}}>
                    <FormControl fullWidth>
                        <Typography>Password</Typography>
                        <TextField onChange={(e)=>setPassword(e.target.value)} value={password}  name="duration" size='small' />
                    </FormControl>
                </Grid>
                <Grid sx={{textAlign:'end',mb:1}}>
                    <Button onClick={handleLogin}  variant="contained" color="success">Login</Button>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
  )
}

export default AdminLogin