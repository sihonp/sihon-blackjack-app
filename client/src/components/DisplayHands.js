import React, { useEffect } from 'react';
import Cards from './Cards';
import { useSelector, useDispatch } from 'react-redux'
import { setDealerScore, setDealerCount, setPlayerScore, setPlayerCount } from './../redux/game/gameSlice';
import { Box, Typography, Container } from '@mui/material';

const DisplayHands = ({ title, cards, calculate }) => {
    const dealerCards = useSelector((state) => state.game.dealerCards)
    const dealerCount = useSelector((state) => state.game.dealerCount)
    const playerCards = useSelector((state) => state.game.playerCards)
    const playerCount = useSelector((state) => state.game.playerCount)
    const dispatch = useDispatch()

    useEffect(() => {
        calculate(dealerCards, setDealerScore);
        dispatch(setDealerCount(dealerCount + 1));
    }, [dealerCards]);

    useEffect(() => {
        calculate(playerCards, setPlayerScore);
        dispatch(setPlayerCount(playerCount + 1));
    }, [playerCards]);

    return (
        <Container sx={{ color: 'white', display: "flex", alignItems: "center", flexDirection: "column" }}>
            {cards.length > 0 ? <Typography variant="p" component="div">{title}</Typography> : <></>}
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", }}>
                {cards.map((card, index) => {
                    return (
                        <Cards key={index} image={card.image} value={card.value} suit={card.suit} hidden={card.hidden} />
                    );
                })}
            </Box>
        </Container>
    )
}

export default DisplayHands