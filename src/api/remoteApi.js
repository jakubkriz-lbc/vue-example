import axios from '../lib/axios'

const api = axios()

const validatedJoke = (joke) => {
  if (typeof joke.id !== 'number') {
    throw new Error('Invalid result (ID)', joke)
  }
  if (typeof joke.content !== 'string') {
    throw new Error('Invalid result (Content)', joke)
  }

  return joke
}

export default {
  async getRandomJoke () {
    const result = await api.get('/joke/Programming?blacklistFlags=nsfw,religious,political,racist')

    return validatedJoke({
      id: result.id,
      content: result.type === 'twopart'
        ? `${result.setup}\n\n${result.delivery}`
        : result.joke
    })
  },

  async getJokeDetail (id) {
    const result = await api.get(`/jokeapi/v2/joke/Any?idRange=${id}`)

    return validatedJoke({
      id: result.id,
      content: result.joke
    })
  }
}
