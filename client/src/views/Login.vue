
<template>
  <div>
    <form class="mt-3" @submit.prevent="login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card bg-light">
              <div class="card-body">
                <h3 class="font-weight-light mb-3">Log in</h3>
                <section class="form-group">
                  <div class="col-12 alert alert-danger px-3" v-if="error">
                    {{ error }}
                  </div>
                  <label class="form-control-label sr-only" for="Email"> Email </label>
                  <input
                    required
                    class="form-control"
                    type="email"
                    id="email"
                    placeholder="Email"
                    v-model="email"
                  />
                </section>
                <section class="form-group">
                  <input
                    required
                    class="form-control"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </section>
                <div class="form-group text-right mb-0">
                  <button class="btn btn-primary" type="submit">Log in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <p class="text-center mt-2">
      or
      <router-link to="/register">register</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

const apiURL = "http://localhost:3000/api/";

export default {
    name: "login",
    data: function() {
        return {
            email: "",
            password: "",
            error: ""
            //user: null
        }
    },
    methods: {
    login: function() {
      const userInfo = {
        email: this.email,
        password: this.password
      };
      console.log("login button pressed...");

      this.$store
              .dispatch("login", userInfo)
              .then(() => this.$router.push("/"))
              .catch(err => console.log(err));
      
      //let currentObj = this;

      // axios
      //   .post(apiURL + "login", userInfo)
      //   .then( response => {
      //       return response.data.token;
      //   })
      //   .then(token => {

      //       axios.get(apiURL + "user",{
      //                   headers: {'authToken': token }
      //               })
      //           .then(res => {
      //               //console.log(res);
      //               const userdata = {
      //                 id: res.data._id,
      //                 displayName: res.data.name,
      //                 email: res.data.email,
      //                 authToken: res.config.headers.authToken
      //               };
      //               return userdata;
      //           })
      //           .then(user => {
      //             if(user.authToken !== null || user.authToken !== "" || user.authToken !== undefined){
      //                   axios
      //                   .get(apiURL + `meetings/${user.id}`)
      //                   .then( response => {
      //                     console.log(response.data);
      //                     user.meetings = response.data;
      //                   })
      //                   .catch(function(err) {
      //                     console.log(err);
      //                   });
      //               currentObj.$emit("loggedIn", user);
      //               currentObj.$router.push("/");
      //             }
      //           })
      //   })
      //   .catch(function (err) {
      //       currentObj.error = err.response.data.message;
      //       console.log(err.response);
      //   });
    }
  }
}
</script>