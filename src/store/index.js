import { createStore } from 'vuex'
import remoteApi from '../api/remoteApi'
import localApi from '../api/localApi'
import plugins from './plugins'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const initialState = () => ({
  randomJoke: null,
  savedJokes: [],
  randomJokeStatus: 'initial',
  savedJokesStatus: 'initial'
})

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations,
  // Dependency injection for easy testing
  actions: actions(remoteApi, localApi),
  getters,
  plugins
})
