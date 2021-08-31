<template>
  <div class="container mt-3">
   <button  class="nav-link btn" @click="updateProfile()">Profile</button>
    <div
      v-if="$route.params.success"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <strong>Hey!</strong> Welcome to Dashboard
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>

    <h1>Welcome {{username}}</h1>
  </div>
</template>

<script>
export default {
    name:'Dashboard',
    data(){
        return{
            username:""
        }
    },
    methods:{
        getUser(){
            this.username=this.$session.get('username')
        },
        updateProfile(){
            var id=this.$session.get("_id")
            console.log(id)
           this.$router.push({ name: 'profile', params: { _id: id } });
      }
    },
    created(){
        this.getUser()
    }
};
</script>

<style>
</style>