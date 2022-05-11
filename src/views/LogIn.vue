<template>
<!-- <router-view /> -->
  <div class="login">
    <div class="hero is-info">
      <div class="hero-body has-text-centered" style="background-color:white">
        <h1 class="title" style="color:#3f8ecf">Log In</h1>
      </div>
    </div>

    <section class="section">
      <div class="body is-flex-direction-row">
        <div class="image-container">
          <figure
            class="is-flex is-align-items-center is-justify-content-center image is-369x273 ml-5"
          >
            <img src="../assets/home.png" />
          </figure>
          <br />
        </div>

        <div class="container">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <form v-on:submit.prevent="submitForm">
                <div class="field">
                  <label>Email</label>
                  <div class="control">
                    <input type="email" class="input" v-model="form.email" />
                  </div>
                </div>

                <div class="field">
                  <label>Password</label>
                  <div class="control">
                    <input type="password" class="input" v-model="form.password" />
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
                  </div>
                </div>
              </form>

              <hr />

              Or <router-link to="/sign-up">click here</router-link> to sign up!
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../utils/api";
import axios from "axios";
import { useAuthStore } from "../store/auth";

export default {
  setup() {
    const auth = useAuthStore();

    return {
      // State variables
      user: auth.user,
      userLoggedOutAt: auth.loggedOutAt,

      // Functions
      setUser: auth.setUser,
      logOut: auth.logOut,
    };

    // return {
    //   GoogleOauthIsAuthorized,
    // };
  },
  components: {},
  name: "loginForm",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      isInit: false,
      isAuthorized: false,
    };
  },
  mounted() {
    document.title = "Log in | StudyNet";
  },
  methods: {
    submitForm() {
api
        .post("/login", {
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          const { data } = res;
          if (data.status) {
            localStorage.setItem("user", data.login_token);

            this.setUser(data.user);
            this.$router.push("/");
          } else {
            // alert("wrong email or password");
            this.$toast.open({
              message: "Incorrect Email ID or Password!",
              type: "error",
              position: "top-right",
            });
            // app.use(VueToast, {
            //   position: 'top'
            // })
          }
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error);
          this.$toast.open({
            message: "Incorrect Email ID or Password!",
            type: "error",
            position: "top-right",
          });
        })
        .finally(() => {
          // Perform action in always
        });
    },
    async loginGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // const loggedIn = this.googleUser.isAuthorized();

        if (!googleUser) {
          return null;
          // this.$router.push("/login");
        }
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getBasicProfile", googleUser.getBasicProfile().iY);

        // this.isInit = this.$gAuth.isInit;
        // this.isSignedIn = this.$gAuth.isAuthorized;
        // if (loggedIn) {
        //   document.getElementById("google-signin").style.visibility = 'hidden';
        // }

        this.form.username = googleUser.getBasicProfile().getEmail();
        // const GoogleOauthIsAuthorized = inject('Vue3GoogleOauth');
        // return {
        //   GoogleOauthIsAuthorized,
        // };
        // if (GoogleOauthIsAuthorized.isAuthorized) {
        //   document.getElementById("login-state").innerHTML("Logged In");
        // }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    },
  };
</script>
