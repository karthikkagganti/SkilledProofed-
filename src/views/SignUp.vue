<template>
  <div class="signup">
    <div class="hero is-info">
      <div class="hero-body has-text-centered" style="background-color:white">
        <h1 class="title" style="color:#3f8ecf">
          Sign Up
        </h1>
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

              <div class="field">
                <label>Confirm password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password2" />
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </p>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-dark">
                    Sign up
                  </button>
                </div>
                <br />
                <div class="control">
                  <button
                    class="button is-dark"
                    @click="
                      {
                        loginGoogle();
                      }
                    "
                  >
                    Continue with Google
                  </button>
                </div>
              </div>
            </form>

            <hr />

            Or <router-link to="/log-in">click here</router-link> to log in!
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { inject } from "vue";

export default {
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    return {
      Vue3GoogleOauth,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Sign up | SkillProofed";
  },
  methods: {
    submitForm() {
      console.log("submitForm");

      this.errors = [];

      if (this.username === "") {
        this.errors.push("The username is missing!");
      }

      if (this.password === "") {
        this.errors.push("The password is missing!");
      }

      if (this.password !== this.password2) {
        this.errors.push("The passwords are not matching!");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        axios
          .post("users/", formData)
          .then((response) => {
            this.$router.push("/login");
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
        this.isSignedIn = this.Vue3GoogleOauth.isAuthorized;
        // if (loggedIn) {
        //   document.getElementById("google-signin").style.visibility = "hidden";
        // }
        console.log(this.isSignedIn);

        this.username = googleUser.getBasicProfile().getEmail();
        this.password = googleUser.getBasicProfile().getBasicProfile().tf;

        //formData.password = googleUser.getBasicProfile().getEmail();

        if (this.isSignedIn) {
          const formData = {
            username: this.username,
            password: this.password,
          };
          axios
            .post("users/", formData)
            .then((response) => {
              console.log(response);
              this.$router.push("/login");
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
