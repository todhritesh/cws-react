import { Grid } from '@mui/material'
import React from 'react'
import CourseCard from './CourseCard'
import {db} from '../firebase-config'
import {ref , onValue} from 'firebase/database'

function Courses() {
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
    <Grid container={true} xs={12} spacing={3}>
      {
        data.map((item , i)=>(
          <Grid key={i} item lg={2} md={3}>
              <CourseCard title={item.title} duration={item.duration} image={item.image}/>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Courses