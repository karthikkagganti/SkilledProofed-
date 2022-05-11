<template>
  <div class="home">
    <div
      class="hero is-info is-medium"
      style="background-color:white; gap:20px"
    >
      <div class="columns ">
        <div class="column is-three-fifths hero-body  ">
          <div class="left-align">
            <h1 class="title is-1" style="color:#fba04d">
              Welcome to ScaleUP!
            </h1>
            <br />
            <h2 class="subtitle is-5" style="color:#393e5b">
              We help young talent get discovered by the<br />
              leading tech companies.
            </h2>
          </div>
          <div class="column left-align">
            <a href="/sign-up" class="button is-info is-size-5 mt-6 "
              >Know More!</a
            >
          </div>
        </div>

        <figure>
          <img
            class="column  is-square is-justify-content-center mt-6 mr-6"
            src="../assets/homedesign1.png"
          />
        </figure>
      </div>
    </div>

    <section class="section has-text-centered">
      <div class="container">
        <div class="columns is-multiline is-justify-content-center">
          <div class="column is-3">
            <div class="box has-text-centered">
              <h2 class="is-size-3 mt-5 mb-5">Standard Defination</h2>

              <p>No Job requisitions required.</p>
              <p>We set clear expectations for each role,</p>
              <p>to avoid those long listskills/nice haves more suited.</p>
              <p></p>
            </div>
          </div>
          <br /><br />
          <div class="column is-3">
            <div class="box has-text-centered">
              <h2 class="is-size-3 mt-5 mb-5">Simple Connections</h2>

              <p>
                We Connect both sides of the hiring equation, skipping that
                awkward first date phase adn questions of 'What do they want?'
                and 'What do they offer?'
              </p>
            </div>
          </div>

          <div class="column is-3">
            <div class="box has-text-centered">
              <h2 class="is-size-3 mt-5 mb-5">Access to Skilled Community</h2>
              <p>
                Our users are consistently engaged, learning, growing and
                upskilling to ensure that their knowledge are kept up to date
                and relevant.
              </p>
            </div>
          </div>

          <div class="column is-12 has-text-centered">
            <a href="/sign-up" class="button is-info is-size-4 mt-6 mb-6"
              >Click to get started</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import CourseItem from "@/components/CourseItem.vue";

export default {
  name: "Home",
  data() {
    return {
      courses: [],
    };
  },
  components: {
    CourseItem,
  },
  mounted() {
    console.log("mounted");

    document.title = "Welcome | StudyNet";

    axios.get("courses/get_frontpage_courses/").then((response) => {
      console.log(response.data);

      this.courses = response.data;
    });
  },
};
</script>

<style>
/* .image img {
  width: auto;
  height: auto;
  max-width: 50%;
  max-height: 100%;
} */
.body {
  max-width: 50%;
  height: auto;
}
.left-align {
  margin-left: 180px;
}
a.button {
  margin-left: -12px;
}
</style>
