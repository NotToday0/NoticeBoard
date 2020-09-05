<template>
  <div id="app">
    <h1 id="header">Please Sign in first</h1>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <!--<v-text-field  v-validate="'required|alpha_num'" prepend-icon="fas fa-user" name="username" label="Username" type="text" v-model.lazy="username"></v-text-field><span>{{ errors.first('username') }}</span>-->
                  <v-text-field  v-validate="'required|email'" prepend-icon="fas fa-envelope" name="email" label="email" type="text" v-model.lazy="email"></v-text-field><span>{{ errors.first('email') }}</span>
                  <v-text-field  v-validate="'required|alpha_num'" prepend-icon="fas fa-lock" name="password" label="Password" id="password" type="password" v-model.lazy="password"></v-text-field><span>{{ errors.first('password') }}</span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="signin" v-if="!currentUser">Sign In</v-btn>
                <v-btn color="primary" @click.prevent="logout" v-if="currentUser">log Out</v-btn>
                <!--<v-btn color="primary" @click.prevent="login">New User</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

</div>
</template>


<script>


export default {


  data(){
    return{
        drawer:null,
        email:"",
        username:"",
        password:"",
        name:"",
        currentUser:"",
    }
  },
  props:{
    source: String
  },
created(){
  this.currentUser = firebase.auth().currentUser;
},

  methods:{
    getUser: function(){
      var user = firebase.auth().currentUser
      var name = user.email.split('@')
      console.log(name[0]);
    },

    logout: function(){
       var currentuser = firebase.auth().currentUser

      if(currentuser != null){
      firebase.auth().signOut().then(()=>{
        swal("Logged out","BYE !","success")
      }).catch((e)=>{
        swal("error",e.message,"error");
      })
    }
    else{
      swal("error","Please Log In First","error")
    }
    },




    signin: function(){
      if(this.email && this.password != ""){
      swal({
        title: 'Signing You In ',
        onOpen: () => {
          swal.showLoading()
  }})
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.$router.push("/add");
        swal("success","Welcome","success")
      })
      .catch(function(error){
      swal("error","Could not register", "error")
      })
    }
    else{
      swal("error","Please Fill up all the details","error")
    }
    },





    login: function(){
      swal({
  title: 'You are beeing registered',
  onOpen: () => {
    swal.showLoading()
  }})
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        swal("success","user is created","success")
        this.$router.push("/add");
      })
      .catch(function(error){
      swal("error","Could not register", "error")
      })
    },
  }
}
</script>

<style>
#header{
  width:90%;
  margin:auto;
  text-align:center;
  font-size:34px;
  font-family:cursive;
  margin-bottom: 0px;

}
v-container{
  margin-top:0px;
}
.v-toolbar__title{
  font-size:24px;
}
</style>
