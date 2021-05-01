<template>
  <div class="home">
    <RandomJoke />
    <SavedJokes />
  </div>
</template>

<script>
import RandomJoke from '@/components/RandomJoke.vue'
import SavedJokes from '@/components/SavedJokes.vue'

export default {
  name: 'Home',
  components: {
    RandomJoke,
    SavedJokes
  }
}
</script>
