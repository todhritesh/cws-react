import { Box } from '@mui/system'
import React from 'react'
import { makeStyles } from '@mui/styles';
import { theme } from '../style';
import { Grid, List, ListItem, ListItemButton, Typography } from '@mui/material';

const useStyles = makeStyles({
    footerStyling: {
        background: theme.palette.primary.main,
        width: '100%',
        height: 'auto',
        padding: 5 * 8,
        color: theme.palette.secondary.main
    }
})

function Footer() {
    const classes = useStyles()
    return (
        <Box className={classes.footerStyling} sx={{ mt: 1 }}>
            <Grid container>
                <Grid item md={4}>
                    <Typography variant='h4' color="secondary.main">
                        CodeWithSadiQ
                    </Typography>
                </Grid>
                <Grid container={true} md={8}>
                    <Grid container={true} spacing={3}>
                        <Grid item lg={4}>
                            <List>
                                <Typography color="secondary.main" variant='h6'>Quick Links</Typography>
                                <ListItem><ListItemButton>Home</ListItemButton></ListItem>
                                <ListItem><ListItemButton>About</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Project</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Workshops</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Hier us</ListItemButton></ListItem>
                            </List>
                        </Grid>
                        <Grid item lg={4}>
                            <List>
                                <Typography color="secondary.main" variant='h6'>About Class</Typography>
                                <ListItem><ListItemButton>About Instructor</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Milestones</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Vision</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Community</ListItemButton></ListItem>
                                <ListItem><ListItemButton>Our Team</ListItemButton></ListItem>
                            </List>
                        </Grid>
                        <Grid item lg={4}>
                            <Typography color="secondary.main" variant='h6'>Location</Typography>
                            <Typography sx={{ mt: 3 }} color="secondary.main" variant='body1'>Ramavtar Market, Near Dog Hospital,Thana Chowk, Gandhinagar, Madhubani, Purnea - 854301</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer