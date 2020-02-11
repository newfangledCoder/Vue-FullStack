<template>
    <div>
    <nav class="site-nav navbar navbar-expand bg-primary navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Meetings Logo</router-link>
        <div class="navbar-nav ml-auto">
          <router-link class="nav-item nav-link" to="/meetings" v-if="user !== null">
            Meetings
          </router-link>
          <router-link class="nav-item nav-link" to="/register" v-if="user === null">
            Register
          </router-link>
          <router-link class="nav-item nav-link" to="/login" v-if="user === null">
            Log In
          </router-link>
          <button class="nav-item nav-link btn btn-link" to="/login" role="button" v-if="user" @click="$emit('logout')">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: "navigation",
    props: ["user"]
}
</script>