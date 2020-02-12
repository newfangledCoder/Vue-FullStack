<template>
  <div id="app">
    <Navigation
      v-bind:user="user"
      @logout="logout"
    />
    <router-view
      v-bind:user="user"
      v-bind:allMeetings="allMeetings"
      v-bind:userMeetings="userMeetings"
      @logout="logout"
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
      @callGetMeetings="getMeetingsOfOwner"
      @checkin="checkIn"
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
      userMeetings: [],
      allMeetings: []
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
    getAllMeetings: function() {
      let currObj = this;
      axios.get(apiURL + "/meetings")
      .then(resp => {
        console.log(resp.data);
        currObj.allMeetings = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    getMeetingsOfOwner: function() {
      let currObj = this;
      axios.get(apiURL + "/user/meetings/")
      .then(resp => {
        console.log(resp.data);
        currObj.userMeetings = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    addMeeting: function(payload) {
      const newMeeting = {
        meetingName: payload
      }
      let currObj = this;
      axios.post(apiURL + "/add/meeting", newMeeting)
        .then(resp => {
          console.log(resp.data);
        })
        .then(() => {
          currObj.getMeetingsOfOwner();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteMeeting: function(payload) {
      //console.log(payload);
      let currObj = this;
      axios.delete(apiURL + `/user/meetings/delete/${payload}`)
        .then(resp => {
          console.log("deleted meeting-------> ",resp.data);
        })
        .then(() => {
          currObj.getMeetingsOfOwner();
        })
        .catch()
    },
    checkIn: function(payload) {
      
      const attendee = {
        meetingId: payload.meetingID,
        name: payload.displayName,
        email: payload.email
      }

      axios.post(`${apiURL}/add/attendee`, attendee)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    // getting all the meetings
    this.getAllMeetings();
  }
}
</script>

<style lang="scss">
$primary: #ad4ba2;
@import "../node_modules/bootstrap/scss/bootstrap";
</style>