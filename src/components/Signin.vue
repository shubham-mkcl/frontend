<template>
  <div class="container">
    <div
      v-if="isErr"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Hey!</strong> {{errMsg}}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div
      v-if="$route.params.success"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Hey!</strong> user added
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <form @submit.prevent="handleSubmit()">
      <div class="container p-5">
        <div class="card shadow">
          <div class="card-header">Signin</div>
          <div class="card-body">
            <div class="row p-3">
              <div class="col-md-6">
                <label for="username">Username</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.username"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="password">Password</label>
                <input
                  class="form-control"
                  type="password"
                  v-model="user.password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
           
            <div class="row mt-2">
              <div class="col-md-6">
                <button class="btn btn-outline-primary" type="submit">Submit</button>
                <input type="reset" class="btn btn-outline-danger" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signin",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isErr: false,
      errMsg: "",
    };
  },
  methods: {
    handleSubmit() {
      var user = {
        "username": this.user.username,
        "password": this.user.password,
      };
      axios
        .post("http://localhost:3000/api/users/auth", user)
        .then((res) => {
          if(res.status == 200) {
            this.$session.set("username", this.user.username);
            this.$session.set("_id",res.data.user._id)
            this.$session.set("isAuthenticated", true);
            this.$store.commit("check", this);
           this.$router.push({ name: 'dashboard', params: { success: true } });
          }else{
             this.isErr=true
             this.errMsg=res.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        });
      console.log(this.user);
    },
  },
};
</script>

<style scoped>
.inputwidth {
  width: 30%;
}
</style>