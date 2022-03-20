import { Box, Button, Card, CardContent, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

function FeeCheckingPage() {
  return (
   <Grid  sx={{py:15, px:3}} container>
       <Grid item xs={12} md={10} sx={{mx:'auto'}}>
            <Typography variant='h2'sx={{mb:5}} >Pay Outstanding Fee</Typography>
            <Card>
                <CardContent>
                    <form>
                        <Grid container item xs={12} spacing={2} sx={{mx:'auto'}}>
                            <Grid item sm={9} >
                                <FormControl fullWidth>
                                    <Typography variant="body1">Enter Your Mobile Number</Typography>
                                    <TextField size="small"  />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3} >
                                <Typography variant="body1">&nbsp;</Typography>
                                <Button  variant="contained" color="success">Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
       </Grid>
   </Grid>
  )
}

export default FeeCheckingPage