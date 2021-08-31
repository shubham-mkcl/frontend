<template>
  <div class="container">
    <div
      v-if="isErr"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Hey!</strong> {{ errMsg }}
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
          <div class="card-header">Registration</div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <label for="firstname">First Name</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.fname"
                  placeholder="first Name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="lastname">Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.lname"
                  placeholder="last name"
                />
              </div>
            </div>
            <div class="row p-3">
              <div class="col-md-6">
                <label for="date">date of Birth</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="user.dob"
                  name="date"
                  ref="date"
                  id="date"
                  placeholder="date of birth"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="nationality">Natioanlity</label>
                <!-- <input
                  class="form-control"
                  type="text"
                  v-model="user.nationality"
                   
                
                  placeholder="nationality"
                  required
                /> -->
                <select class="form-control" v-model="user.nationality">
                  <option disabled value="">Please select one</option>
                  <option>INDIAN</option>
                  <option>OTHER</option>
                </select>
              </div>
            </div>
            <div class="row p-3">
              <div class="col-md-6">
                <label for="mobile">Mobile</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.mobile"
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="email">Email</label>
                <input
                  class="form-control"
                  type="email"
                  v-model="user.email"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>

            <div class="row p-3">
              <div class="col-md-6">
                <label for="city">City</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.city"
                  placeholder="City"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="pin">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="user.pin"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

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
            <div class="row">
              <div class="col-md-6">
                <label for="password">Confirm Password</label>
                <input
                  class="form-control"
                  v-model="user.confirmPassword"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <button class="btn btn-outline-primary">Submit</button>
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
  name: "Signup",
  data() {
    return {
      user: {
        fname: "",
        lname: "",
        dob: "",
        mobile: "",
        email: "",
        city: "",
        pin: "",
        nationality: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      isErr: false,
      errMsg: "",
    };
  },
  methods: {
    handleSubmit() {
      if(this.checkForm()){
          var user = {
        fname: this.user.fname,
        lname: this.user.lname,
        dob: this.user.dob,
        mobile: Number.parseInt(this.user.mobile),
        email: this.user.email,
        city: this.user.city,
        pin: Number.parseInt(this.user.pin),
        nationality: this.user.nationality,
        username: this.user.username,
        password: this.user.password,
      };
      axios
        .post("http://localhost:3000/api/users", user)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: 'signin', params: { success: true } });
          } else if(res.status==208) {
            this.isErr = true;
            this.errMsg = res.data.message;
          }else{
          this.isErr=true,
          this.errMsg=res.data.message
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
          console.log(this.user);
      }
      
      
    },
    checkForm(){
      var phoneno = /^\d{10}$/
       var dob = new Date(this.user.dob);  
      //calculate month difference from current date in time  
      var month_diff = Date.now() - dob.getTime();  
      
      //convert the calculated difference in date format  
       var age_dt = new Date(month_diff);   
      
      //extract year from date      
       var year = age_dt.getUTCFullYear();  
      
       //now calculate the age of the user  
       var age = Math.abs(year - 1970); 
      if(this.user.password.length<8){
          this.errMsg="password should have minimum 8 character"
          this.isErr=true
          return false
      }else if(this.user.password!=this.user.confirmPassword){
         this.errMsg="confirm password is not matching"
         this.isErr=true
         return false
      }else if(this.user.mobile.match(phoneno)==null){
          this.errMsg="Mobile number should be of 10 digits and only number allowed"
         this.isErr=true
         return false
      }else if(age<18){
        this.errMsg="Age is not matching"
         this.isErr=true
         return false
      }else{
        return true
      }
    }
  },
};
</script>

<style scoped>
.inputwidth {
  width: 30%;
}
</style>