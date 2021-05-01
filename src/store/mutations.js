import * as mutation from '../constants/mutation.type'

export default {
  // Random Joke
  [mutation.SET_RANDOM_JOKE]: (state, joke) => {
    state.randomJoke = joke
  },
  [mutation.SET_RANDOM_JOKE_STATUS]: (state, status) => {
    state.randomJokeStatus = status
  },

  // Saved jokes list
  [mutation.SAVE_JOKE]: (state, joke) => {
    state.savedJokes.unshift(joke)
  },
  [mutation.DELETE_JOKE]: (state, id) => {
    const idx = state.savedJokes.findIndex((item) => item.id === id)
    if (idx !== -1) {
      state.savedJokes.splice(idx, 1)
    } else {
      console.error(`Joke with id ${id} no longer exists`)
    }
  },
  [mutation.SET_SAVED_JOKES]: (state, jokes) => {
    state.savedJokes = jokes
  },
  [mutation.SET_SAVED_JOKES_STATUS]: (state, status) => {
    if (!['error', 'loading', 'ready'].includes(status)) {
      console.error(`Invalid status ${status}`)
    }
    state.savedJokesStatus = status
  }
}
