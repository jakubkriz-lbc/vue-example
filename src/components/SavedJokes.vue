<template>
  <div class="savedJokes">
    <h2>
      Saved Jokes:
    </h2>

    <div v-if="state.status === 'ready'">
      <p
        v-if="state.isEmpty"
        class="savedJokes__emptyListMessage"
      >
        Your list of saved jokes is empty.
      </p>
      <ul class="savedJokes__list">
        <SavedJokesItem
          v-for="joke, idx in state.jokes"
          :key="joke.id"
          :spacer="idx > 0"
          :joke="joke"
        />
      </ul>
    </div>

    <div v-else-if="state.status === 'loading'">
      loading...
    </div>

    <div v-else-if="state.status === 'error'">
      Sorry, there's been an error
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SavedJokesItem from './SavedJokesItem'
import { RESTORE_SAVED_JOKES } from '../constants/action.type'

export default {
  name: 'SavedJokes',
  components: {
    SavedJokesItem
  },
  setup () {
    const store = useStore()

    onMounted(() => {
      store.dispatch(RESTORE_SAVED_JOKES)
    })

    const state = reactive({
      jokes: computed(() => store.state.savedJokes),
      status: computed(() => store.state.savedJokesStatus),
      isEmpty: computed(() => store.getters.savedJokesCount === 0)
    })

    return { state }
  }
}
</script>

<style scoped>
.savedJokes__emptyListMessage {
  color: var(--secondary-color);
}

.savedJokes__list {
  list-style: none;
  padding: 0;
}
</style>
