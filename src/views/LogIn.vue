<template>
  <div class="login">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Log in</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <form v-on:submit.prevent="loginGoogle">
              <div class="field">
                <label>Email</label>
                <div class="control">
                  <input type="email" class="input" v-model="username" />
                </div>
              </div>

              <div class="field">
                <label>Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password" />
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </p>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-dark">Log in</button>
                  <br />
                  <br />
                  <button
                    class="button is-dark"
                    @click="
                      {
                        loginGoogle;
                      }
                    "
                  >
                    Log in with google
                  </button>
                </div>
              </div>
            </form>

            <hr />

            Or <router-link to="/sign-up">click here</router-link> to sign up!
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log in | StudyNet";
  },
  methods: {
    submitForm() {
      console.log("submitForm");
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      this.errors = [];
      if (this.username === "") {
        this.errors.push("The username is missing!");
      }
      if (this.password === "") {
        this.errors.push("The password is missing!");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        axios
          .post("token/login/", formData)
          .then((response) => {
            const token = response.data.auth_token;
            this.$store.commit("setToken", token);
            axios.defaults.headers.common["Authorization"] = "Token " + token;
            localStorage.setItem("token", token);
            this.$router.push("/dashboard/my-account");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
    async loginGoogle() {
      try {
        console.log("hello");
        const googleUser = await this.$gAuth.signIn();
        //const loggedIn = this.googleUser.isAuthorized();

        if (!googleUser) {
          return null;
          //this.$router.push("/login");
        }
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getBasicProfile", googleUser.getBasicProfile().tf);

        // this.isInit = this.$gAuth.isInit;
        this.isSignedIn = this.$gAuth.isAuthorized;
        // if (loggedIn) {
        //   document.getElementById("google-signin").style.visibility = "hidden";
        // }
        const formData = {
          username: this.username,
          password: this.password,
        };

        formData.username = googleUser.getBasicProfile().getEmail();
        formData.password = googleUser.getBasicProfile().getEmail();

        axios
          .post("token/login/", formData)
          .then((response) => {
            const token = response.data.auth_token;
            this.$store.commit("setToken", token);
            axios.defaults.headers.common["Authorization"] = "Token " + token;
            localStorage.setItem("token", token);
            this.$router.push("/dashboard/my-account");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
        // const GoogleOauthIsAuthorized = inject('Vue3GoogleOauth');
        // return {
        //   GoogleOauthIsAuthorized,
        // };
        // if (GoogleOauthIsAuthorized.isAuthorized) {
        //   document.getElementById("login-state").innerHTML("Logged In");
        // }
      } catch {
        (error) => console.log(error);
      }
    },
  },
};
</script>
