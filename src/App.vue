<template>
  <div class="wrapper">
    <HomePage/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #fff5b3;
  font-family: 'Fjalla One', sans-serif;

  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  max-width: 600px;
  border: 2px solid rgba(0,0,0,1);
  box-shadow: 15px 15px 1px #ffa580, 15px 15px 1px 2px rgba(0,0,0,1);
}

</style>
