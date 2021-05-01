<template>
  <li
    class="savedJokesItem"
    :class="{'savedJokesItem--spacer': spacer}"
    @click="deleteJoke(joke.id)"
  >
    <span class="savedJokesItem__removeBtn">&#10006;</span>
    {{ joke.content }} {{ spacer }}
  </li>
</template>

<script>
import { useStore } from 'vuex'
import { DELETE_JOKE } from '../constants/action.type'

export default {
  name: 'SavedJokesItem',
  props: {
    joke: {
      type: Object,
      required: true
    },
    spacer: {
      type: Boolean
    }
  },
  setup (props) {
    const store = useStore()

    const deleteJoke = (id) => {
      store.dispatch(DELETE_JOKE, { id })
    }

    return { deleteJoke }
  }
}
</script>

<style scoped>
.savedJokesItem {
  padding-bottom: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.savedJokesItem--spacer {
  border-top: 1px dotted var(--secondary-color);
  padding-top: 1rem;
}

.savedJokesItem__removeBtn {
  color: var(--danger-color);
  cursor: pointer;
  float: right;
  padding-left: 1rem;
}
</style>
