import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit';
import {db} from '../firebase-config'
import {ref , onValue , update} from 'firebase/database'
import { AddStudentForm } from './forms';

const theme = createTheme()
const useStyles = makeStyles(theme=>{
    
    return {
        paperWidth:{
            margin:'0px auto',
            [theme.breakpoints.down('sm')]:{
                maxWidth:'500px'
            },
            [theme.breakpoints.down('md')]:{
                maxWidth:'700px'
            },
            [theme.breakpoints.up('lg')]:{
                maxWidth:'1100px'
            },
        },
        hideOverflow:{
            overFlow:'hidden'
        }
    }
})



function ManageStudents() {
    const [openDialog , setOpenDialog] = React.useState(false)
    function handleOpenDialog(){
        setOpenDialog(true)
    }
    const classes = useStyles()
    const [data , setData] = React.useState([])
    const studentsRef = ref(db , 'students');
    function getData(){
        onValue(studentsRef,snap=>{
            let data = [];
            snap.forEach(item=>{
                const id = item.key;
                const value = item.val();
                data = [...data , {id:id,...value}]
            })
            setData(data)
        });
    }
    React.useEffect(()=>{
        getData()
    },[])
    function handleEditForm(id){
        console.log(id)
    }
    function handleVerify(id){
        const studentRef = ref(db , `students/${id}`);
        update(studentRef , {
            isVerified:true
        })
    }
  return (
    <Grid container sx={{minHeight:'100vh',mt:4}}  className={classes.hideOverflow} >
        <Grid item xs={12} >
            <Paper sx={{p:2,overFlow:'auto',mx:'auto'}} className={classes.paperWidth}>
            <Button onClick={handleOpenDialog} sx={{ml:'auto'}} color="success" variant="contained" >Add Student</Button>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell ><Typography variant="body1"> Sl no.</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Name</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Mothers's Name</Typography></TableCell>
                            <TableCell><Typography variant="body1">Father's Name</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Email</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Phone</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Education</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Address</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> status</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((item , i)=>{
                                {console.log(item.isVerified)}

                            return <TableRow key={i}>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.mothersName} </TableCell>
                                <TableCell>{item.fathersName}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phoneNo}</TableCell>
                                <TableCell>{item.education}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>
                                    {(item.isVerified)?<Typography sx={{background:'#2ecc71',textAlign:'center',py:0.5}}>Verified</Typography >:<Button onClick={()=>handleVerify(item.id)} size="small" color="warning" variant="contained"><Typography variant='caption'>Pending</Typography></Button>}
                                </TableCell>
                                <TableCell><IconButton onClick={()=>handleEditForm(item.id)} color="success" size="small" ><EditIcon/></IconButton></TableCell>
                            </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Grid>
        <AddStudentForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Grid>
  )
}

export default ManageStudents