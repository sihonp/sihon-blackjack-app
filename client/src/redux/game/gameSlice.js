import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deckArray: [],
  dealerCards: [],
  dealerScore: 0,
  dealerCount: 0,
  playerCards: [],
  playerScore: 0,
  playerCount: 0,
  gameState: 0,
  balance: 100,
  bet: 1,
  amount: 10,
  message: 'Place a Bet!',
  buttonState: {
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  },
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDeckArray: (state, action) => {
      state.deckArray.push(action.payload)
    },
    setAmount: (state, action) => {
      state.amount = action.payload
    },
    setBalance: (state, action) => {
      state.balance = action.payload
    },
    setGameState: (state, action) => {
      state.gameState = action.payload
    },
    revealCard: (state, action) => {
      state.dealerCards.filter((card) => {
        if (card.hidden === true) {
          card.hidden = false
        }
        return card;
      });
    },
    setDealerCards: (state, action) => {
      state.dealerCards.push(action.payload)
    },
    resetDealerCards: (state, action) => {
      state.dealerCards = action.payload
    },
    setDealerCount: (state, action) => {
      state.dealerCount = action.payload
    },
    setDealerScore: (state, action) => {
      state.dealerScore = action.payload
    },
    setPlayerCards: (state, action) => {
      state.playerCards.push(action.payload)
    },
    resetPlayerCards: (state, action) => {
      state.playerCards = action.payload
    },
    setPlayerCount: (state, action) => {
      state.playerCount = action.payload
    },
    setPlayerScore: (state, action) => {
      state.playerScore = action.payload
    },
    setButtonState: (state, action) => {
      state.buttonState = action.payload
    },
    setBet: (state, action) => {
      state.bet = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const { 
  setAmount, setBalance, setGameState, setDealerCards, resetDealerCards, setDealerCount, setDealerScore, setPlayerCards,
  resetPlayerCards, setPlayerCount, setPlayerScore, setButtonState, setDeckArray, setBet, revealCard, setMessage } = gameSlice.actions

export default gameSlice.reducer