<template>
  <div id="app">
    <Navigation
      v-bind:user="user"
    />
    <router-view
      @loggedIn="setUserData"
      v-bind:user="user"
      @addMeeting="addMeeting"
    />
  </div>
</template>

<script>
import axios from "axios";

// Components
import Navigation from "./components/Navigation";

const apiURL = "http://localhost:3000/api";

export default {
  name: 'App',
  data() {
    return {
      user: null,
    }
  },
  components: {
    Navigation
  },
  methods: {
    setUserData: function(payload){
      this.user = payload;
    },

    addMeeting: function(payload) {
      const newMeeting = {
        meetingName: payload,
        meetingOwner: this.user.id
      };

      console.log(newMeeting);
      // posting to api
      let currentObj = this;
      console.log("adding a meeting...");
      axios
        .post(apiURL + "/add/meeting", newMeeting)
        .then(function (response) {
                     console.log(response.data);
                     if(currentObj.user !== null){
                        axios
                        .get(apiURL + `/meetings/${currentObj.user.id}`)
                        .then( response => {
                          console.log(response.data);
                          currentObj.user.meetings = response.data;
                        })
                        .catch(function(err) {
                          console.log(err);
                        });
                      }
            })
            .catch(function (err) {
                console.log(err);
                currentObj.apiError = err;
            });
    }
  },
  mounted() {
    // if(this.user !== null){
    //   axios
    //   .get(apiURL + `/meetings/${this.user.id}`)
    //   .then( response => {
    //     console.log(response.data);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    // }
  }
}
</script>

<style lang="scss">
$primary: #ad4ba2;
@import "../node_modules/bootstrap/scss/bootstrap";
</style>