const STORAGE_KEY = 'joke-system'

export default {
  getJokeIds () {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []

    return ids
  },

  setJokeIds (ids) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }
}
