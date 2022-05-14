import React, { useEffect } from 'react';
import { Button, Box, OutlinedInput, InputAdornment } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setAmount, setBet, setBalance, setPlayerScore, setPlayerCount, setButtonState, setMessage, setGameState } from './../redux/game/gameSlice';

const Table = ({ buttonState, hit, stand, startOver, calculate, dealCard, playerScore, balance, bet }) => {

    const dealerScore = useSelector((state) => state.game.dealerScore)
    const dealerCount = useSelector((state) => state.game.dealerCount)
    const playerCards = useSelector((state) => state.game.playerCards)
    const playerCount = useSelector((state) => state.game.playerCount)
    const gameState = useSelector((state) => state.game.gameState)
    const amount = useSelector((state) => state.game.amount)
    const dispatch = useDispatch()

    const onBetClick = () => {
        if (validation()) {
            placeBet(Math.round(amount * 100) / 100)
        }
    }

    const placeBet = (amount) => {
        dispatch(setBet(amount));
        dispatch(setBalance(Math.round((balance - amount) * 100) / 100));
        dispatch(setGameState(1));
    }

    const winner = () => {
        if (playerScore > dealerScore || dealerScore > 21) {
            dispatch(setBalance(Math.round((balance + (bet * 2)) * 100) / 100));
            dispatch(setMessage("You Win!"));
        }
        else if (dealerScore > playerScore) {
            dispatch(setMessage("Dealer Wins!"));
        }
        else {
            dispatch(setBalance(Math.round((balance + (bet * 1)) * 100) / 100));
            dispatch(setMessage("Tie!"));
        }
    }

    useEffect(() => {
        if (gameState === 3) {
            if (dealerScore >= 17) {
                winner();
            }
            else {
                dealCard(1)
            }
        }
    }, [dealerCount]);

    useEffect(() => {
        calculate(playerCards, setPlayerScore);
        dispatch(setPlayerCount(playerCount + 1));
    }, [playerCards]);

    useEffect(() => {
        if (gameState === 2) {
            if (playerScore === 21) {
                setButtonState({
                    hitDisabled: true,
                });
            }
            else if (playerScore > 21) {
                bust();
            }
        }
    }, [playerCount]);

    const bust = () => {
        dispatch(setButtonState({ 'hitDisabled': true, 'standDisabled': true, 'resetDisabled': false }));
        dispatch(setMessage("Bust!"));
    }

    const amountChange = (e) => {
        dispatch(setAmount(e.target.value));
    }

    useEffect(() => {
        validation();
    }, [amount, balance]);

    const validation = () => {
        if (amount > balance) {
            return false;
        }
        if (amount < 0.01) {
            return false;
        }
        return true;
    }

    if (gameState === 0) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                direction: "row",
            }}>
                <Box sx={{ direction: "row" }}>

                    <OutlinedInput
                        sx={{ m: 1, backgroundColor: 'white' }}
                        value={amount}
                        type="number"
                        onChange={amountChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        required
                    />
                </Box>
                <Button variant="contained" onClick={() => onBetClick()} sx={{
                    margin: "0.5em",
                    padding: "1em",
                    width: "30%"
                }}>Bet</Button>
            </Box>
        );
    }
    else {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                direction: "row",
            }}>
                <Box sx={{ direction: "row", }} >
                    <Button variant="contained" onClick={() => hit()} disabled={buttonState.hitDisabled} sx={{
                        margin: "0.5em",
                        padding: "1em",
                        width: "42%",
                    }}>Hit</Button>
                    <Button variant="contained" onClick={() => stand()} disabled={buttonState.standDisabled} sx={{
                        margin: "0.5em",
                        padding: "1em",
                        width: "42%",
                    }}>Stand</Button>
                    <Button variant="contained" onClick={() => startOver()} disabled={buttonState.resetDisabled} sx={{
                        margin: "0.5em",
                        padding: "1em",
                        width: "100%",
                    }}>Keep Playing</Button>
                </Box>
            </Box>
        );
    }
}

export default Table