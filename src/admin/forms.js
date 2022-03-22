import { Select , MenuItem,Button , Dialog, DialogContent, DialogTitle, FormControl, Grid, TextField, Typography, LinearProgress } from "@mui/material";
import {useForm , Controller } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {ref , push , set, onValue, update} from 'firebase/database'
import {db} from '../firebase-config'
import { Box } from "@mui/system";
import React , {useState , useEffect} from 'react'
import {ref as fileRef , deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {storage} from '../firebase-config'
import { getCurrentDate } from "../App";


const schema = yup.object().shape({
    name: yup.string().required(),
    mothersName: yup.string().required(),
    fathersName: yup.string().required(),
    phoneNo: yup.string().matches(new RegExp('^[0-9]{10,10}$'),'phone no is not valid').required(),
    education: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email('this is not a valid email').required(),
    dob: yup.string().required(),
    address: yup.string().required()
})

export const AddStudentForm = ({openDialog , setOpenDialog}) => {
    function handleCloseDialog(){
        setOpenDialog(false)
    }
    
    const {handleSubmit , formState:{errors} , control , reset} = useForm({
        resolver:yupResolver(schema),
        mode:'onChange'
    })

    function formSubmit(data) {
        const studentsRef = ref(db , 'students');
        const newStudent = push(studentsRef);
        data['isVerified']=true
        data['joined']=getCurrentDate()

        set(newStudent,data);
        reset({
            name:'',
            email:'',
            phoneNo:'',
            fathersName:'',
            mothersName:'',
            address:'',
            dob:'',
            education:'',
            gender:'',
        })
        handleCloseDialog()
    }

    return <Dialog open={openDialog} >
        <DialogTitle>
            Add Student
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(formSubmit)}>
            <Grid container={true} sx={{ mb: 3 }} >
                <FormControl fullWidth>
                    <Typography variant="body1">Name</Typography>
                    <Controller
                        control={control}
                        name="name"
                        render={props => {
                            return <TextField helperText={errors.name?.message}  error={Boolean(errors.name)} {...props.field} size="small" fullWidth />

                        }}
                    />
                </FormControl>
            </Grid>
            <Grid container={true} sx={{ mb: 3 }} spacing={3}>
                <Grid item md={6}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Mother's Name</Typography>
                        <Controller
                            name="mothersName"
                            control={control}
                            render={({ field }) => (
                                <TextField helperText={errors.mothersName?.message}  error={Boolean(errors.mothersName)} {...field} size="small" fullWidth />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <Typography variant="body1">Father's Name</Typography>
                        <Controller
                            name="fathersName"
                            control={control}
                            render={({ field }) => (
                                <TextField helperText={errors.fathersName?.message}  error={Boolean(errors.fathersName)} {...field} size="small" fullWidth />
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container={true} sx={{ mb: 3 }} spacing={3}>
                <Grid item md={6}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Phone No.</Typography>
                        <Controller
                            name="phoneNo"
                            control={control}
                            render={({ field }) => (
                                <TextField helperText={errors.phoneNo?.message}  error={Boolean(errors.phoneNo)} {...field} size="small" fullWidth />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Email</Typography>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField helperText={errors.email?.message} error={Boolean(errors.email)} {...field} size="small" fullWidth />
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container={true} sx={{ mb: 3 }} spacing={3}>
                <Grid item md={4}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Education</Typography>
                        <Controller
                            name="education"
                            control={control}
                            render={({ field }) => (
                                <TextField helperText={errors.education?.message} error={Boolean(errors.education)} {...field} size="small" fullWidth />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Date Of Birth</Typography>
                        <Controller 
                        control={control}
                        name="dob"
                        render={({field})=>(
                            <TextField error={Boolean(errors.dob)} helperText={errors.dob?.message} type="date" {...field}  size="small" fullWidth />
                        )}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <   FormControl fullWidth>
                        <Typography variant="body1">Gender</Typography>
                        <Controller
                        name="gender"
                        control={control}
                        render={({field})=>(
                        <Select error={Boolean(errors.gender)} {...field} size="small" defaultValue='select'>
                            <MenuItem disabled value="select" >Select</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                        )}
                        />
                        <Typography color='error' variant="caption">{errors.gender?.message}</Typography>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container={true} sx={{ mb: 3 }} >
                <FormControl fullWidth>
                    <Typography variant="body1">Address</Typography>
                    <Controller
                    name="address"
                    control={control}
                    render={({field})=>(
                        <TextField error={Boolean(errors.address)} helperText={errors.address?.message} {...field} multiline rows={3} size="small" fullWidth />
                    )}
                    />
                </FormControl>
            </Grid>
            <Grid container={true} sx={{ mb: 3 }} >
                <Button  type="submit" sx={{ ml: 'auto' }} color="success" variant="contained">Submit Form</Button>
                <Button onClick={handleCloseDialog} sx={{ ml: 1 }} color="error" variant="contained">Cancle</Button>
            </Grid>
        </form>
        </DialogContent>
    </Dialog>
}


export const EditCourseForm = ({openCourseEditForm , editId , setEditId , setOpenCourseEditForm}) => {
    const [title , setTitle] = useState('')
    const [fees , setFees] = useState('')
    const [duration , setDuration] = useState('')
    const [description , setDescription] = useState('')
    const [instructor , setInstructor] = useState('')
    const [image , setImage] = useState('')
    const [progress , setProgress] = useState(0)
    const [imgName , setImgName] = useState('')

    function handleCloseEditForm(){
        setOpenCourseEditForm(false)
    }

    let courseRef = ref(db , `courses/${editId}`);
    useEffect(()=>{
        onValue(courseRef,snap =>{
            let data = snap.val()
            setTitle(data.title)
            setDescription(data.description)
            setFees(data.fees)
            setDuration(data.duration)
            setInstructor(data.instructor)
            setImgName(data.imageName)
        })
    },[editId])

    function handleSubmit(e){
        e.preventDefault();
        console.log(image)
        if(image){
            console.log('first')
            let imageRef = fileRef(storage , `courses/${imgName}`);
            deleteObject(imageRef);
            const fileName = `${Date.now()}`
            const fileExt = image.name.split('.')[1]
            const imageName = `${fileName}.${fileExt}`
            const coursesStorageRef = fileRef(storage , `courses/${imageName}`);
            const uploadTask = uploadBytesResumable(coursesStorageRef,image)
            uploadTask.on('state_changed',snap=>{
                const prog = Math.round((snap.bytesTransferred/snap.totalBytes)*100)
                setProgress(prog)
            },err=>console.log(err),()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url=>{
                update(courseRef,{title,description,fees,duration,instructor,imageName:imgName,image:url})
            })
            .catch(err=>console.log(err))
          })
        }else{
            update(courseRef , {title,description,fees,duration,instructor})
        }
        setTitle('')
        setDescription('')
        setFees('')
        setDuration('')
        setInstructor('')
        setImgName('')
        setProgress(0)
        handleCloseEditForm()
    }
    return <Dialog open={openCourseEditForm} >
    <DialogTitle>
      Create Course
    </DialogTitle>
    <DialogContent sx={{minWidth:'400px'}}>
      <form onSubmit={handleSubmit}>
        <Grid item sx={{mb:1}}>
          <FormControl fullWidth >
            <Typography>Title</Typography>
            <TextField onChange={(e)=>setTitle(e.target.value)} value={title} size='small'  />
          </FormControl>
        </Grid>
        <Grid item sx={{mb:1}}>
          <FormControl fullWidth>
            <Typography>Duration</Typography>
            <TextField onChange={(e)=>setDuration(e.target.value)} value={duration} size='small' />
          </FormControl>
        </Grid>
        <Grid item sx={{mb:1}}>
          <FormControl fullWidth>
            <Typography>Instructor</Typography>
            <TextField onChange={(e)=>setInstructor(e.target.value)} value={instructor} size='small' />
          </FormControl>
        </Grid>
        <Grid item sx={{mb:1}}>
          <FormControl fullWidth>
            <Typography>Fees</Typography>
            <TextField onChange={(e)=>setFees(e.target.value)} value={fees} size='small' />
          </FormControl>
        </Grid>
        <Grid item sx={{mb:1}}>
            <FormControl fullWidth>
            <Typography>Upload Image</Typography>
            <TextField onChange={(e)=>setImage(e.target.files[0])}  type="file" size='small' />
            {progress!==0 && <LinearProgress color="success" sx={{mt:0.5}} variant='determinate' value={progress}/>}
            </FormControl>
        </Grid>
        <Grid item sx={{mb:1}}>
          <FormControl fullWidth>
            <Typography>Description</Typography>
            <TextField onChange={(e)=>setDescription(e.target.value)} multiline rows={4} value={description} size='small' />
          </FormControl>
        </Grid>
        <Grid item>
          <Box sx={{mt:2,textAlign:'end'}} >
            <Button  type='submit' variant='contained' sx={{mr:2}} color="success">Add</Button>
            <Button onClick={handleCloseEditForm}  variant='contained' color="error">Close</Button>
          </Box>
        </Grid>
      </form>
    </DialogContent>
  </Dialog>
}