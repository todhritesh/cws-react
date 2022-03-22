import { Box, Button, Card, CardContent, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { db } from '../firebase-config'
import { ref, push, set } from 'firebase/database'
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

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

function ApplyPage() {
    const { control, handleSubmit, formState:{errors} , reset } = useForm({
        resolver: yupResolver(schema),
        mode:'onChange'
    })
    function formSubmit(data) {
        const studentsRef = ref(db , 'students');
        const newStudent = push(studentsRef);
        data['isVerified']=false
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
    }
    return (
        <Grid sx={{ py: 15, px: 2 }} container>
            <Grid item md={10} sx={{ mx: 'auto' }}>
                <Typography variant='h2' sx={{ mb: 5 }} >Apply For Admission</Typography>
                <Card>
                    <CardContent>
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
                                <Button type="submit" sx={{ ml: 'auto' }} color="success" variant="contained">Submit Form</Button>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ApplyPage