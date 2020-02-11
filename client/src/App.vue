<template>
  <div id="app">
    <Navigation
      v-bind:user="user"
      @logout="logout"
    />
    <router-view
      v-bind:user="user"
      v-bind:meetings="meetings"
      @logout="logout"
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

// Components
import Navigation from "./components/Navigation";

const apiURL = "http://localhost:3000/api";

export default {
  name: 'App',
  data() {
    return {
      meetings: []
    }
  },
  components: {
    Navigation
  },
  computed: {
    ...mapState([
        'token',
        'user'
      ]
    ),
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function() {
        this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    getMeetings: function() {
      let currObj = this;
      axios.get(apiURL + "/user/meetings/")
      .then(resp => {
        console.log(resp.data);
        currObj.meetings = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    addMeeting: function(payload) {
      const newMeeting = {
        meetingName: payload
      }

      axios.post(apiURL + "/add/meeting", newMeeting)
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });

      // Getting all the meetings
      this.getMeetings();
    },
    deleteMeeting: function(payload) {
      console.log(payload);
      axios.delete(apiURL + `/user/meetings/delete/${payload}`)
        .then(resp => {
          console.log(resp.data);
        })
        .catch()

      this.getMeetings();
    }
  },
  mounted() {
    console.log("mounted...")
    // axios.get(apiURL + "/user/meetings/")
    //   .then(resp => {
    //     console.log(resp.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}
</script>

<style lang="scss">
$primary: #ad4ba2;
@import "../node_modules/bootstrap/scss/bootstrap";
</style>