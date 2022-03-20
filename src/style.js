import { createTheme } from "@mui/material";


//colors 
export const primaryMain = '#292929'
export const secondaryMain = '#ebebeb'
export const navbarColor = "linear-gradient(to right, rgba(32, 40, 119, 1), rgba(55, 46, 149, 1), rgba(83, 49, 177, 1), rgba(114, 48, 205, 1), rgba(150, 41, 230, 1))";
const dividerColor = '#3c3c3c'

// export const navbarColor = "rgba(26, 24, 24,1)";
// const secondaryMain = '#292929'
// const primaryMain = '#ebebeb'

export const theme = createTheme({
    palette:{
        primary:{
            main:primaryMain,
        },
        secondary:{
            main:secondaryMain
        }
    },
    components:{
        MuiDrawer:{
            styleOverrides:{
                paper:{
                    height:'100vh',
                    backgroundColor:primaryMain,
                    color:secondaryMain,
                    borderRight:`2px solid ${dividerColor}`
                }
            }
        },
        MuiTableHead:{
            styleOverrides:{

            }
        }
    }
})