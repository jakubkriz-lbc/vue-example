import * as mutation from '../constants/mutation.type'
import * as action from '../constants/action.type'

const createActions = (remoteApi, localApi) => ({
  // Random Joke
  [action.FETCH_RANDOM_JOKE]: async ({ commit }) => {
    commit(mutation.SET_RANDOM_JOKE_STATUS, 'loading')
    try {
      const randomJoke = await remoteApi.getRandomJoke()
      commit(mutation.SET_RANDOM_JOKE, randomJoke)
      commit(mutation.SET_RANDOM_JOKE_STATUS, 'ready')
    } catch (error) {
      commit(mutation.SET_RANDOM_JOKE_STATUS, 'error')
    }
  },

  // Saved jokes list
  [action.SAVE_JOKE]: ({ state, commit }) => {
    const joke = state.randomJoke
    commit(mutation.SAVE_JOKE, joke)
  },
  [action.DELETE_JOKE]: ({ commit }, { id }) => {
    commit(mutation.DELETE_JOKE, id)
  },
  [action.RESTORE_SAVED_JOKES]: async ({ state, commit }) => {
    if (state.savedJokesStatus !== 'initial') {
      // already initialized
      return
    }
    commit(mutation.SET_SAVED_JOKES_STATUS, 'loading')
    try {
      const restoredJokes = await Promise.all(
        localApi.getJokeIds().map(remoteApi.getJokeDetail)
      )

      commit(mutation.SET_SAVED_JOKES, restoredJokes)
      commit(mutation.SET_SAVED_JOKES_STATUS, 'ready')
    } catch (error) {
      console.error(error)

      commit(mutation.SET_SAVED_JOKES_STATUS, 'error')
    }
  }
})

export default createActions
