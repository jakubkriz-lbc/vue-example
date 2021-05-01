<template>
  <div class="randomJoke">
    <h2>Random Joke:</h2>

    <p
      v-if="state.status === 'initial'"
      class="randomJoke__systemMessage"
    >
      &#8675; Maybe you have to use the button.
    </p>

    <p
      v-else-if="state.status === 'ready'"
      class="randomJoke__content"
    >
      {{ state.jokeContent }}
    </p>

    <p
      v-else-if="state.status === 'loading'"
      class="randomJoke__systemMessage"
    >
      loading...
    </p>

    <p
      v-else-if="state.status === 'error'"
      class="randomJoke__systemMessage"
    >
      Sorry, there's been an error
    </p>

    <button
      class="randomJoke__tellBtn"
      @click="tellJoke"
    >
      Tell me {{ state.isJokeFetched ? 'another' : 'a' }} joke
    </button>

    <button
      class="randomJoke__saveBtn"
      :class="{'randomJoke__saveBtn--disabled': !state.isSaveButtonEnabled}"
      :disabled="!state.isSaveButtonEnabled"
      @click.prevent="saveJoke"
    >
      Save this joke
    </button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import * as action from '../constants/action.type'

export default {
  name: 'RandomJoke',
  setup () {
    const store = useStore()

    const state = reactive({
      status: computed(() => store.state.randomJokeStatus),
      isJokeFetched: computed(() => store.state.randomJokeStatus === 'ready'),
      isSaveButtonEnabled: computed(() => {
        // joke must by fetched & must not be already saved
        return state.isJokeFetched && !store.state.savedJokes.some(({ id }) => id === store.state.randomJoke.id)
      }),
      jokeContent: computed(() => store.state.randomJoke?.content)
    })

    const tellJoke = () => {
      store.dispatch(action.FETCH_RANDOM_JOKE)
    }

    const saveJoke = () => {
      store.dispatch(action.SAVE_JOKE)
    }

    return { tellJoke, saveJoke, state }
  }
}
</script>

<style scoped>
.randomJoke__systemMessage {
  color: var(--secondary-color);
  min-height: 4rem;
}

.randomJoke__content {
  min-height: 4rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.randomJoke__saveBtn {
  background-color: var(--cta-color);
  float: right;
}

.randomJoke__saveBtn--disabled {
  background-color: var(--secondary-color);
  cursor: not-allowed;
}
</style>
