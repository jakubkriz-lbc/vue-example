import { createLogger } from 'vuex'
import localApi from '../api/localApi'
import { SAVE_JOKE, DELETE_JOKE } from '../constants/mutation.type'

const localStoragePlugin = store => {
  store.subscribe((mutation, { savedJokes }) => {
    if ([SAVE_JOKE, DELETE_JOKE].includes(mutation.type)) {
      const ids = savedJokes.map(({ id }) => id)
      localApi.setJokeIds(ids)
    }
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
