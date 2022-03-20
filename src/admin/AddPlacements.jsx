import { Button, CardMedia, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'
import {createTheme} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit';
import {db , storage} from '../firebase-config'
import {ref , onValue , update , set , push} from 'firebase/database'
import { Box } from '@mui/system';
import {ref as fileRef ,uploadBytesResumable, getDownloadURL } from 'firebase/storage'


const theme = createTheme()
const useStyles = makeStyles(theme=>{
    return {
        paperWidth:{
            margin:'0px auto',
            [theme.breakpoints.down('sm')]:{
              minWidth:'400px'
            },
            [theme.breakpoints.down('md')]:{
              minWidth:'600px'
            },
            [theme.breakpoints.up('lg')]:{
                minWidth:'1000px'
            },
        },
        hideOverflow:{
            overFlow:'hidden'
        }
    }
})


function ManageCourses() {
  const [openCourseForm , setOpenCourseForm] =React.useState(false)
  const [progress , setProgress] = React.useState(0)
  const placementsRef = ref(db,'placements');
    const [formData , setFormData] = React.useState({});
    function handleChange(e){
      if(e.target.name==='image'){
        console.log(e.target.files[0])
        setFormData({...formData,[e.target.name]:e.target.files[0]})
      }else{
        setFormData({...formData,[e.target.name]:e.target.value})
      }
    }
    function handleSubmit(e){
      e.preventDefault()
      console.log(formData)
      const fileName = `${Date.now()}`
      const fileExt = e.target.image.files[0].name.split('.')[1]
      console.log(fileExt)
      const imageName = `${fileName}.${fileExt}`
      const placementsStorageRef = fileRef(storage , `placements/${imageName}`);
      const uploadTask = uploadBytesResumable(placementsStorageRef,formData.image)
      uploadTask.on('state_changed',snap=>{
        const prog = Math.round((snap.bytesTransferred/snap.totalBytes)*100)
        setProgress(prog)
      },err=>console.log(err),()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url=>{
          console.log(url)
          formData.image = url
          const newPlacement = push(placementsRef);
          set(newPlacement , formData);
          setProgress(0)
          e.target.name.value = ''
          e.target.company.value = ''
          e.target.role.value = ''
          e.target.joined.value = ''
          e.target.image.value = ''
          setFormData({})
          handleClose()
        })
        .catch(err=>console.log(err))
      })

    }
    function handleClose(){
      setOpenCourseForm(false)
    }
    function handleOpen(){
      setOpenCourseForm(true)
    }
    const courseForm = (
      <Dialog open={openCourseForm} >
        <DialogTitle>
          Add Placements
        </DialogTitle>
        <DialogContent sx={{minWidth:'400px'}}>
          <form onSubmit={handleSubmit}>
            <Grid item sx={{mb:1}}>
              <FormControl fullWidth >
                <Typography>Name</Typography>
                <TextField onChange={handleChange} name="name" size='small'  />
              </FormControl>
            </Grid>
            <Grid item sx={{mb:1}}>
              <FormControl fullWidth>
                <Typography>Company</Typography>
                <TextField onChange={handleChange} name="company" size='small' />
              </FormControl>
            </Grid>
            <Grid item sx={{mb:1}}>
              <FormControl fullWidth>
                <Typography>Role</Typography>
                <TextField onChange={handleChange} name="role" size='small' />
              </FormControl>
            </Grid>
            <Grid item sx={{mb:1}}>
              <FormControl fullWidth>
                <Typography>Joined</Typography>
                <TextField onChange={handleChange} type="month" name="joined" size='small' />
              </FormControl>
            </Grid>
            <Grid item sx={{mb:1}}>
              <FormControl fullWidth>
                <Typography>Upload Image</Typography>
                <TextField onChange={handleChange} type="file" name="image" size='small' />
                {progress!==0 && <LinearProgress color="success" sx={{mt:0.5}} variant='determinate' value={progress}/>}
              </FormControl>
            </Grid>
            <Grid item>
              <Box sx={{mt:2,textAlign:'end'}} >
                <Button  type='submit' variant='contained' sx={{mr:2}} color="success">Add</Button>
                <Button onClick={handleClose}  variant='contained' color="error">Close</Button>
              </Box>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    )
    const classes = useStyles()
    const [data , setData] = React.useState([])
    const studentsRef = ref(db , 'placements');
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

  return (
    <Grid container sx={{minHeight:'100vh',mt:4,}}  className={classes.hideOverflow} >
        {courseForm}
        <Grid item xs={12} >
            <Paper sx={{p:2,overFlow:'auto',mx:'auto'}} className={classes.paperWidth}>
            <Button onClick={handleOpen} sx={{ml:'auto'}} color="success" variant="contained" >Add Placements</Button>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell ><Typography variant="body1"> Sl no.</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Name</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Company</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Role</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> joined</Typography></TableCell>
                            <TableCell ><Typography variant="body1"> Image</Typography></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((item , i)=>{

                            return <TableRow key={i}>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.company} </TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{item.joined}</TableCell>
                                <TableCell>
                                  <CardMedia
                                  image={item.image}
                                  height={60}
                                  width={60}
                                  sx={{
                                    objectFit:'contain'
                                  }}
                                  component="img"
                                  />
                                </TableCell>
                            </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Grid>
    </Grid>
  )
}

export default ManageCourses