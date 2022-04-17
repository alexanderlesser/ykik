import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setItem, setObjectItem } from '../common/storage'

export const initialState = {
  loading: false,
  hasErrors: false,
  triviaQuestions: [],
  selectedCategory: 0,
  token: null,
  questions: 10,
  timer: 30,
  prevScore: [],
  difficulty: 'medium',

}

export const getTheToken = createAsyncThunk(
  "trivia/getTheToken",
  async (arg, { getState }) => {
    const state = getState()
    try {
      const response = await fetch(`https://opentdb.com/api_token.php?command=request`)
      const data = await response.json()
      await setItem('token', data.token)
      return data
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }
)


export const fetchTrivia = createAsyncThunk(
  "trivia/fetchTrivia",
  async (arg, { getState }) => {
    const state = getState()
    let url
    const { questions, selectedCategory, difficulty } = arg
    const token = state.trivia.token
    if(token) {
      url = `https://opentdb.com/api.php?amount=${questions}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple&token=${token}`
    } else {
      url = `https://opentdb.com/api.php?amount=${questions}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.log('ERROR: ', err)
    }
  }
)

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    setQuestions: (state, { payload }) => {
      state.questions = payload
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload
    },
    setTimer: (state, { payload }) => {
      state.timer = payload
    },
    setDifficulty: (state, { payload }) => {
      state.difficulty = payload
    },
    setPrevScore: (state, { payload }) => {
      state.prevScore = payload
    },
    addPrevScoreObject: (state, { payload }) => {
      const date = new Date()
      const prevScoreCat = state.prevScore.find(obj => obj.category === payload.category)
      const index = state.prevScore.findIndex(obj => obj.category === payload.category)
      if(prevScoreCat) {
        if(prevScoreCat.scores.length >= 10) {
          state.prevScore[index].scores.pop()
            state.prevScore[index].scores.unshift({
              questionAmount: payload.amount,
              difficulty: payload.difficulty,
              score: payload.score,
              date: JSON.stringify(date)
            })
          setObjectItem('prevScore', state.prevScore)

        } else {
            state.prevScore[index].scores.unshift({
                questionAmount: payload.amount,
                difficulty: payload.difficulty,
                score: payload.score,
                date: JSON.stringify(date)
            })
          setObjectItem('prevScore', state.prevScore)
        }
      } else {
        state.prevScore.push({
          category: payload.category,
          scores: [{
            questionAmount: payload.amount,
            difficulty: payload.difficulty,
            score: payload.score,
            date: JSON.stringify(date)
          }]
        })
        setObjectItem('prevScore', state.prevScore)
      }

    }
  },
  extraReducers: {
    [getTheToken.pending]: (state, action) => {
      state.status = "loading"
    },
    [getTheToken.fulfilled]: (state, { payload }) => {
      state.token = payload.token
    },
    [getTheToken.rejected]: (state, action) => {
      state.status = "failed"
    },
    // Fetch trivia questions
    [fetchTrivia.pending]: (state, action) => {
      state.loading = true
    },
    [fetchTrivia.fulfilled]: (state, { payload }) => {
      state.triviaQuestions = payload.results
      state.loading = false
    },
    [fetchTrivia.rejected]: (state, action) => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { setSelectedCategory, setToken, addPrevScoreObject, setPrevScore, setQuestions, setTimer, setDifficulty } = triviaSlice.actions

// A selector
export const triviaSelector = state => state.trivia

// The reducer
export default triviaSlice.reducer