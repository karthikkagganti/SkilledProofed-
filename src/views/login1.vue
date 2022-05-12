<template>
  <div>
    <img class="edgeleft" src="@\assets\edge-left.png" />
    <img class="edgeright" src="@\assets\edge-right.png" />
    <img class="navline" src="@\assets\navline.png" />
    <img class="welcomequote" src="@\assets\WelcometoScaleUP.png" />
    <img class="design-1" src="@\assets\undraw_going_up_ttm5.png" />
    <img class="design-2" src="@\assets\quote.png" />
    <a class="register_txt" href="signup">Sign up</a>
    <p class="login_txt">Login</p>
    <p class="already_have_acc">New to ScaleUp?</p>

    <form v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="form.email" />

        <label>Password</label>
        <input class="form-control" v-model="form.password" />
      </div>

      <div class="my-3">
        <button type="submit" class="btn btn-primary" @click="login()">
          Login
        </button>
        <br />
        <br />
        <button class="btn btn-primary" @click="loginGoogle">
          Login with Google
        </button>
        <br /><br />
        <button class="btn btn-primary" @click="handleSignOut">
          Sign Out from Google
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import api from "../utils/api";
//import { useAuthStore } from "../store/auth";

export default {
  setup() {
    //const auth = useAuthStore();

    return {
      // State variables
      //user: auth.user,
      //userLoggedOutAt: auth.loggedOutAt,
      // Functions
      //setUser: auth.setUser,
      //logOut: auth.logOut,
    };
  },
  components: {},
  name: "loginForm",
  data: () => {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    login() {
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
            alert("wrong email or password");
          }
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error);
        })
        .finally(() => {
          // Perform action in always
        });
    },
    async loginGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();

        if (!googleUser) {
          return null;
        }

        this.form.username = googleUser.getBasicProfile().getEmail();
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async handleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.form.username = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  position: absolute;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 35px;
  top: 40%;
  left: 60%;
  width: 20%;
  z-index: 5;
}
.my-3 {
  position: absolute;
  top: 60%;
  left: 68%;
  width: 20%;
  z-index: 5;
}
.edgeleft {
  position: absolute;
  width: 516px;
  height: 234px;
  left: 0%;
  top: 14.8%;
}
.edgeright {
  position: absolute;
  width: 516px;
  height: 234px;
  right: 0%;
  bottom: 0%;
}
.design-1 {
  position: absolute;
  left: 9%;
  bottom: 19%;
}
.welcomequote {
  position: absolute;
  left: 60%;
  top: 20%;
}
.navline {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 14%;
}
.design-2 {
  position: absolute;
  bottom: 9%;
  left: 18%;
}
.already_have_acc {
  position: absolute;
  width: 220px;
  height: 35px;
  right: 370px;
  top: 306px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 35px;
  /* identical to box height, or 269% */

  display: flex;
  align-items: center;

  color: #a8a8a8;
}
.register_txt {
  position: absolute;
  width: 220px;
  height: 35px;
  right: 212px;
  top: 306px;

  font-family: "Poppins";
  font-style: Bold;
  font-weight: 800;
  font-size: 13px;
  line-height: 35px;
  /* identical to box height, or 269% */

  display: flex;
  align-items: center;

  color: #000000;
}
.login_txt {
  position: absolute;
  width: 128px;
  height: 45px;
  left: 60%;
  top: 298px;

  font-family: "Poppins";
  font-style: "bold";
  font-weight: 900;
  font-size: 30px;
  line-height: 45px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #ffa048;
}
</style>
