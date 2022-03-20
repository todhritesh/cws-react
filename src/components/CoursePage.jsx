import { Box, Card, Grid, Typography ,Paper} from '@mui/material'
import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@emotion/react';
import {db} from '../firebase-config';
import {getDatabase, onValue , ref } from 'firebase/database'

function CoursePage() {
    const theme = useTheme()
    const [ data , setData] = React.useState([])
    function getData(){
        let coursesRef = ref(db , 'courses');
        onValue(coursesRef,snap=>{
            let data = []
            snap.forEach(item=>{
                const id = item.key;
                const value = item.val()
                data = [...data,{...value,id:id}]
            })
            setData(data);
        })
    }
    React.useEffect(()=>{
        getData()
    },[])
  return (
    <Grid  sx={{py:15,  px:2}} container>
        <Grid item md={10} sx={{mx:'auto'}}>
            
            <Typography variant='h2'sx={{mb:10}} >Our Courses</Typography>
        {
            data.map((item,i)=>(

            
                <Card elevation={5} sx={{mt:5}}>
                    <CardContent>
                        <Grid container spacing={4} >
                        <Grid item md={8}>
                            <Typography component="p" variant='p'sx={{mb:3,fontSize:'40px' , fontWeight:'light'}} >{item.title}</Typography>

                            <Typography variant="h6" >
                               {` Instructor : ${item.instructor}`}
                            </Typography>
                            <Typography variant="h6" >
                               {` Duration : ${item.duration}`}
                            </Typography>
                            <Typography variant="h6" >
                               {` Fees : ${item.fees}`}
                            </Typography>
                            <Typography variant="subtitle1" >
                                {item.description}
                            </Typography>
                        </Grid>
                        <Grid item sx={{display:'flex',alignItems:'center'}} md={4}>
                            <CardMedia
                            sx={{py:'auto'}}
                            image={`${item.image}`}
                            component="img"
                            height="300"
                            />
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
        
            ))
        }
    </Grid>
    </Grid>
  )
}

export default CoursePage