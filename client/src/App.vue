<template>
  <div id="app">
    <Navigation />
    <router-view
      v-bind:message="name"
    />
  </div>
</template>

<script>
import axios from "axios";

// Components
import Navigation from "./components/Navigation";

const apiURL = "http://localhost:5000/api/";

export default {
  name: 'App',
  data() {
    return {
      name: "",
      register: ""
    }
  },
  components: {
    Navigation
  },
  mounted: function() {
    axios
      .get(apiURL)
      .then(result => this.name = result.data.name);

    // axios
    //   .post(apiURL + "register")
    //   .then(result => this.register = result.data);
  }
}
</script>

<style lang="scss">
$primary: #05b2dd;
@import "../node_modules/bootstrap/scss/bootstrap";
</style>