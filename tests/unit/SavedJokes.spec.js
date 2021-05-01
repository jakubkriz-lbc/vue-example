import { shallowMount, mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import SavedJokes from '@/components/SavedJokes.vue'

/**
 * Example of a component unit test
 */
describe('SavedJokes.vue', () => {
  it('should render the loading state', () => {
    const store = createStore({
      state: {
        savedJokesStatus: 'loading'
      },
      actions: {
        RESTORE_SAVED_JOKES: jest.fn()
      }
    })
    const wrapper = shallowMount(SavedJokes, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.text()).toMatch('loading...')
  })

  it('should render the ready state with a joke list', () => {
    const store = createStore({
      state: {
        savedJokesStatus: 'ready',
        savedJokes: [{ id: 1, content: 'Big Joke' }]
      },
      actions: {
        RESTORE_SAVED_JOKES: jest.fn()
      }
    })
    const wrapper = mount(SavedJokes, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.find('ul').text()).toContain('Big Joke')
  })

  it('should render empty list message', () => {
    const store = createStore({
      state: {
        savedJokesStatus: 'ready',
        savedJokes: []
      },
      actions: {
        RESTORE_SAVED_JOKES: jest.fn()
      },
      getters: {
        savedJokesCount: () => 0
      }
    })
    const wrapper = mount(SavedJokes, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.text()).toContain('Your list of saved jokes is empty')
  })

  it('should trigger store initialization when mounted', () => {
    const RESTORE_SAVED_JOKES = jest.fn()
    const store = createStore({
      actions: {
        RESTORE_SAVED_JOKES
      }
    })
    shallowMount(SavedJokes, {
      global: {
        plugins: [store]
      }
    })
    expect(RESTORE_SAVED_JOKES.mock.calls.length).toBe(1)
  })
})
