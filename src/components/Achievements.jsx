import { Grid } from '@mui/material'
import React from 'react'
import AchievementsCard from './AchievementsCard'
import {db} from '../firebase-config'
import {onValue , ref} from 'firebase/database'


function Achievements() {
    const [data , setData] =React.useState([])
    function getData(){
        let placementsRef = ref(db , 'placements');
        onValue(placementsRef , snap => {
            let data = []
            snap.forEach(item=>{
                let id = item.key;
                let value = item.val();
                data = [...data,{id:id,...value}];
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

                <Grid item lg={2} md={3}>
                    <AchievementsCard name={item.name} company={item.company} role={item.role} image={item.image} />
                </Grid>

                ))
            }
    </Grid>
    )
}

export default Achievements