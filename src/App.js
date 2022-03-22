import React from 'react'
import Layout from './Layout'
import {theme} from './style';
import { ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom';
import  schedule  from 'node-schedule';
import {db} from './firebase-config';
import {ref , onValue, set , push} from 'firebase/database';


export function getCurrentDate(){
  const today = new Date()
  const currentDate = today.getDate()
  const currentMonth = today.getMonth()+1;
  const currentYear = today.getFullYear()
  const timeStamp = `${currentYear}-${currentMonth}-${currentDate}`
  return timeStamp;
}

function App() {
  const [studentsData , setStudentsData] = React.useState([])
  let studentRef = ref(db , 'students');

  const getStudents = () => {
    // if(studentsData.length>0){
    //   return
    // }
    let students = [];
     onValue(studentRef, snap => {
      snap.forEach(item => {
        let value = item.val();
        students = [...students, {
          ...value
        }]
      })
      setStudentsData(students)
    })
    console.log('run student')

  }

function generateFee(){
  // getStudents()
  // if(studentsData.length===0){
  //   generateFee()
  // }
  studentsData.forEach(item => {
    const joined = item.joined.slice(5)
    const current = getCurrentDate().slice(5)
    if (joined === current) {
      const feesRef = ref(db , 'fees');
      const newFees = push(feesRef);
      set(newFees , {
        name:item.name,
        phone:item.phoneNo,
        fees:700,
        month:getCurrentDate(),
        payment:0
      })
      console.log('created')
    }
  })
}

// React.useEffect(()=>{
//   // getStudents()
// },[])
React.useEffect(()=>{
  generateFee()

},[studentsData])




  // generateFee()
  
  schedule.scheduleJob('0 1 * * *',()=>getStudents())
  // schedule.scheduleJob('*/15 * * * * *',()=>getStudents())
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Layout/>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App