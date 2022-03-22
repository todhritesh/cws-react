import { Box, Button, Card, CardContent, FormControl, Grid, List, ListItem, ListItemText, MenuItem, Select, Table, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {ref ,  orderByChild , limitToFirst, query, equalTo, onValue} from 'firebase/database'
import {db} from '../firebase-config'


const monthNames = ['',"January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function FeeCheckingPage() {
    const [phoneNo , setPhoneNo] = useState('')
    const [error , setError] = useState('');
    const [feeData , setFeeData] = useState([]);
    function handleSubmit(e){
        e.preventDefault();
        if(phoneNo==='' || phoneNo.length!=10){
            setError('invalid phone no');
            return
        }
        let feesRef = ref(db , 'fees')
        const q = query(feesRef,orderByChild('phone'),equalTo(phoneNo))
        onValue(q , res=>{
            let data = [];
            res.forEach(item=>{
                let month = item.val().month.split('-')[1]
                if(item.val().payment===0){
                    data = [...data , {...item.val(),month}]
                }
            })
            console.log(data)
            setFeeData(data)
        })
    }
    function handleChange(e){
        setError('')
        setPhoneNo(e.target.value)
    }
  return (
   <Grid  sx={{py:15, px:3}} container>
       <Grid item xs={12} md={10} sx={{mx:'auto'}}>
            <Typography variant='h2'sx={{mb:5}} >Pay Outstanding Fee</Typography>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        <Grid container item xs={12} spacing={2} sx={{mx:'auto'}}>
                            <Grid item sm={9} >
                                <FormControl fullWidth>
                                    <Typography variant="body1">Enter Your Mobile Number</Typography>
                                    <TextField type='number' onChange={handleChange} size="small" error={Boolean(error)} helperText={error} />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3} >
                                <Typography variant="body1">&nbsp;</Typography>
                                <Button type="submit"  variant="contained" color="success">Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell>Sl no.</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            {
                                feeData.map((item , i)=>(
                                    <TableRow key={i}>
                                        <TableCell>{i+1}</TableCell>
                                        <TableCell>{monthNames[item.month]}</TableCell>
                                        <TableCell>{item.fees}</TableCell>
                                        <TableCell>{'Due'}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
       </Grid>
   </Grid>
  )
}

export default FeeCheckingPage