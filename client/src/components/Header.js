import React from 'react';
import { Typography, Grid } from '@mui/material';

const Header = ({ message, balance }) => {
    return (
        <Grid container spacing={0} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xl={4} xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5em", padding: "1em", }}>
                <Typography variant="h5"  sx={{ color: "white", textAlign: "center" }}>You Got: ${balance}</Typography>
            </Grid>
            <Grid item xl={4} xs={5} sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5em", padding: "1em" }} >
                <Typography variant="h5" sx={{ color: "white", textAlign: "center" }} > {message}</Typography>
            </Grid>
        </Grid>
    )
}

export default Header