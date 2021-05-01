<template>
  <div class="app">
    <router-link
      to="/"
      class="app__navLink"
    >
      Home
    </router-link>
    |
    <router-link
      to="/about"
      class="app__navLink"
    >
      About
    </router-link>

    <router-view />
  </div>
</template>

<style>
@import './styles/font-faces.css';
@import './styles/theme.css';
@import './styles/typography.css';
@import './styles/basis.css';

.app {
  max-width: 75ch;
  margin: auto;
  padding: 2rem;
}

.app__navLink {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
</style>
