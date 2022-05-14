import React, { useEffect } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import DisplayHands from './components/DisplayHands';
import { useSelector, useDispatch } from 'react-redux'
import {
  setDeckArray, setPlayerCards, resetPlayerCards, setPlayerScore, setPlayerCount, setDealerCards, resetDealerCards,
  setDealerScore, setDealerCount, setGameState, setButtonState, setBet, setMessage, revealCard
} from './redux/game/gameSlice';

const App = () => {
  const playerCards = useSelector((state) => state.game.playerCards)
  const playerScore = useSelector((state) => state.game.playerScore)
  const dealerCards = useSelector((state) => state.game.dealerCards)
  const dealerScore = useSelector((state) => state.game.dealerScore)
  const deckArray = useSelector((state) => state.game.deckArray)
  const bet = useSelector((state) => state.game.bet)
  const balance = useSelector((state) => state.game.balance)
  const message = useSelector((state) => state.game.message)
  const gameState = useSelector((state) => state.game.gameState)
  const buttonState = useSelector((state) => state.game.buttonState)
  const dispatch = useDispatch()

  const buildDeck = () => {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        dispatch(setDeckArray({ value: values[j], image: values[j] + "-" + types[i] + ".png" }));
      }
    }
  }

  const dealCard = (dealType) => {
    const newDeck = [...deckArray];
    const randomIndex = Math.floor(Math.random() * newDeck.length);
    const card = newDeck[randomIndex];
    newDeck.splice(randomIndex, 1);
    dispatch(setDeckArray([...newDeck]));
    switch (dealType) {
      case 0:
        dispatch(setPlayerCards({ 'value': card.value, 'hidden': false, 'image': card.image }));
        break;
      case 1:
        dispatch(setDealerCards({ 'value': card.value, 'hidden': false, 'image': card.image }));
        break;
      case 2:
        dispatch(setDealerCards({ 'value': card.value, 'hidden': true, 'image': card.image }));
        break;
      default:
        break;
    }
  }

  const hit = () => {
    dealCard(0)
  }

  const calculate = (cards, setScore) => {
    let total = 0;
    cards.forEach((card) => {
      if (card.hidden === false && card.value !== 'A') {
        switch (card.value) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card) => {
      return card.value === 'A';
    });
    aces.forEach((card) => {
      if (card.hidden === false) {
        if ((total + 11) > 21) {
          total += 1;
        }
        else if ((total + 11) === 21) {
          if (aces.length > 1) {
            total += 1;
          }
          else {
            total += 11;
          }
        }
        else {
          total += 11;
        }
      }
    });
    dispatch(setScore(total));
  }

  const stand = () => {
    dispatch(setButtonState({ 'hitDisabled': true, 'standDisabled': true, 'resetDisabled': false }));
    dispatch(setGameState(3));
    dispatch(revealCard({ hidden: true }))
  }

  useEffect(() => {
    buildDeck()
  }, [])

  useEffect(() => {
    if (gameState === 1) {
      dealCard(0);
      dealCard(2);
      dealCard(0);
      dealCard(1);
      dispatch(setGameState(2));
      dispatch(setMessage('Hit or Stand?'));
    }
  }, [gameState]);

  const startOver = () => {
    console.clear();
    dispatch(setDeckArray(deckArray));
    dispatch(resetPlayerCards([]));
    dispatch(setPlayerScore(0));
    dispatch(setPlayerCount(0));
    dispatch(resetDealerCards([]));
    dispatch(setDealerScore(0));
    dispatch(setDealerCount(0));
    dispatch(setBet(0));
    dispatch(setGameState(0));
    dispatch(setMessage("Place a Bet!"));
    dispatch(setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true
    }));
  }

  return (
    <>
      <Header message={message} balance={balance} />
      <Table
        balance={balance}
        gameState={gameState}
        buttonState={buttonState}
        hit={hit}
        stand={stand}
        startOver={startOver}
        calculate={calculate}
        dealCard={dealCard}
        playerScore={playerScore}
        bet={bet}
      />
      <DisplayHands title={`Dealer's Has (${dealerScore})`} cards={dealerCards} calculate={calculate} />
      <DisplayHands title={`player Has (${playerScore})`} cards={playerCards} calculate={calculate} />
    </>
  )
}

export default App