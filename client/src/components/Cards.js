import React from 'react';
import { CardMedia, } from '@mui/material';

const Cards = ({ hidden, image }) => {

  if (hidden) {
    return (
      <CardMedia sx={{ width: 100, height: 150, margin: 1, borderRadius: 2 }}
        component="img"
        image={require(`../assets/cards/BACK.png`)}
        alt="blackjack-card" />
    );
  }
  else {
    return (
      <CardMedia sx={{ width: 105, height: 155, margin: 1, borderRadius: 2 }}
        component="img"
        image={require(`../assets/cards/${image}`)}
        alt="blackjack-card"
      />
    );
  }
}

export default Cards