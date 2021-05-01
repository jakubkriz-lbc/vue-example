import { createStore } from 'vuex'

import actions from '../../src/store/actions'
import mutations from '../../src/store/mutations'
import getters from '../../src/store/getters'
import { SET_SAVED_JOKES } from '../../src/constants/mutation.type'

const apiMock = {
  getRandomJoke: jest.fn(),
  getJokeDetail: jest.fn()
}
const localStorageMock = {}

/**
 * Example of the store unit test
 */
describe('Store', () => {
  let store

  beforeAll(() => {
    store = createStore({
      initialState: {
        savedJokes: [],
        savedJokesStatus: 'initial'
      },
      mutations,
      // Dependency injection for easy testing
      actions: actions(apiMock, localStorageMock),
      getters
    })
  })

  it('should test example of getter', () => {
    store.commit(SET_SAVED_JOKES, [
      { id: 1, content: 'foo' },
      { id: 2, content: 'bar' }
    ])
    expect(store.getters.savedJokesCount).toBe(2)
  })
})
