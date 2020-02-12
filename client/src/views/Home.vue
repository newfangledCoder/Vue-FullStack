<template>
    <div class="mt-3">
      <div class="text-secondary text-center">
        <div class="text-center" v-if="user !== null && user !== undefined">
          Welcome back
          <span class="font-weight-bold text-info">{{ user.name }}</span>
          <a
            href="#"
            class="text-primary ml-2"
            role="button"
            @click="$emit('logout')"
          >
            Logout
          </a>
        </div>
      </div>
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-10 col-md-10 col-lg-8 col-xl-7">
            <h4 class="display-4 text-primary mb-2">Meeting Log</h4>
            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th class="lead font-weight-bold">Meeting Name</th>
                  <th class="lead font-weight-bold">Meeting Owner</th>
                  <th class="lead font-weight-bold">Meeting Room</th>
                  <th class="lead font-weight-bold">Checkin</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in allMeetings"
                  v-bind:key="item.id"
                >
                  <td class="lead text-primary font-weight-bold">{{ item.meetingName }}</td>
                  <td class="lead text-info font-weight-bold">{{ item.owner }}</td>
                  <td class="lead text-primary">Meeting Room</td>
                  <td>
                    <router-link
                      class="btn btn-sm btn-outline-secondary"
                      title="Check In"
                      :to="'/checkin/' + item.id"
                    >
                      <font-awesome-icon icon="link"></font-awesome-icon>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>

            <router-link class="btn btn-outline-primary mr-2" to="/register" v-if="user === null">
              Register
            </router-link>
            <router-link class="btn btn-outline-primary mr-2" to="/login" v-if="user === null">
              Log In
            </router-link>
            <router-link class="btn btn-primary" to="/meetings" v-if="user">
              Meetings
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    name: "home",
    props: ["user", "allMeetings"],
    components: {
      FontAwesomeIcon
    }
}
</script>