<template>
  <div>
    <div>

      <v-container grid-list-md text-xs-center >
        <h2 style="font-size:35px;color:red;letter-spacing:2px;font-family: 'Nunito', sans-serif;">Choose your option</h2>
        <v-layout row wrap>

          <v-flex xs6>

            <div id="cards">


                <div class="container">
                <h1 class="page-title">

                </h1>

              </div>

              <div class="card-container">
                <div class="card">
                  <div class="front">
                    <h2 class="sub-title"></h2>
                    <h1 class="title">
                      <br>
                      UPLOAD A POST
                    </h1>
                    <img class="image" src="http://pre14.deviantart.net/0aef/th/pre/f/2014/015/2/f/look_at_that_thing_morty____rick_and_morty_by_kory226-d72a6ub.png" alt="" />
                  </div>
                  <div class="back">
                    <h3 class="synopsis">ADD A POST</h3>

                    <p>This post will be displayed on the screen </p>
                      <p>It is in the text format</p>

                    <div class="btn" v-on:click="content=1"><i class="fa fa-plus"></i>ADD POST</div>

                  </div>

            </div>
            </div>
            </div>
          </v-flex>
          <v-flex xs6>

            <div id="cards">


                <div class="container">
                <h1 class="page-title">

                </h1>
                <h2 class="page-sub-title"></h2>
              </div>

              <div class="card-container">
                <div class="card">
                  <div class="front">
                    <h2 class="sub-title"></h2>
                    <h1 class="title">
                      <br>
                      ADD A FILE
                    </h1>
                    <img class="image" src="http://pre14.deviantart.net/0aef/th/pre/f/2014/015/2/f/look_at_that_thing_morty____rick_and_morty_by_kory226-d72a6ub.png" alt="" />
                  </div>
                  <div class="back">
                    <h3 class="synopsis">Synopsis</h3>

                    <p>This file will be displayed on the screen </p>
                      <p>You can add a single file at a time</p>
                    <div class="btn" v-on:click="content=2" ><i class="fa fa-upload"></i>ADD FILE</div>

                  </div>

            </div>
            </div>
            </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-container>
  <div id="layout"  v-if="content === 1">
  <v-container grid-list-xl text-xs-center style="border:2px solid white;border-radius:30px">
    <h1 style="color:white;border-bottom:1px solid white;border-radius:10px" >Add Post</h1>
    <v-layout row wrap>

      <v-flex xs10 offset-xs1>
        <v-text-field

              v-model="id"
              v-validate="'required'"
              :counter="35"
              label="Enter id"
              name="id"
              required
            ></v-text-field>

  <v-text-field
        v-model="title"
          v-validate="'required'"
        :counter="35"
        label="Enter Title"
        name="name"
        required
      ></v-text-field><span style="color='white'">{{ errors.first('name') }}</span>

  <v-textarea
          v-validate="'required'"
          name="TextField"
          label="Enter Your Post"
          auto-grow
          v-model.lazy = "text"
        ></v-textarea><br>


        <span>{{  errors.first('TextField')}}</span>
  <v-btn v-on:click.stop="addPost" right round large color="success" > Post <v-icon>fas fa-upload</v-icon></v-btn>
    <v-btn v-on:click="getdate" right round large color="success" > Get date <v-icon>fas fa-upload</v-icon></v-btn><br>
    <span v-show="clicked">This post was created on : {{date}} at {{time}}</span>

  </v-flex>
</v-layout>
</v-container>

</div>
<div v-if = "content === 2" style="border-bottom:2px solid white;border-radius:30px;text-align:center">
  <v-container>
    <v-flex xs6>

  <header style="color:white">ADD A FILE</header>
  <input type="file" @change="onFileSelect"></input>
</v-flex>
</v-container>
</div>
</div>
</div>
</template>


<script>
import axios from 'axios';
import db from '../firebase/init'
export default {
  data(){
    return{
      id:"",
      text : "",
      date:"",
      time:null,
      title:"",
      clicked:false,
      selectedfile : null,
      display:false,
      content:null,
      filename:"",
      postDate: new Date

    }
  },

  methods:{


    onFileSelect:function(event){
      var vm = this;
      this.getdate();

      this.selectedfile = event.target.files[0]
      var storageref = firebase.storage().ref(this.selectedfile.name)
      var uploadTask = storageref.put(this.selectedfile)
      this.filename = this.selectedfile.name
      uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  console.log(error);
},
 function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

    db.collection('URL').add({
          fileurl : downloadURL,
          fileName : vm.filename,
          uploadDate:vm.postDate,
       }).catch(function (error) {
           console.error('Error adding document: ', error)
         })
  });
});

    },
    
    addPost: function(){
      if(this.text !== ""){
        this.getdate();
        swal({
          title: 'Adding Post',
          onOpen: () => {
            swal.showLoading()
    }})
        db.collection('posts').add({
                id: this.id,
             post : this.text,
             title: this.title
           }).catch(function (error) {
               console.error('Error adding document: ', error)
             })
             swal(
       'Good job!',
       'Yous Post has been ADDED!',
       'success'
     )}
   else{
             swal({
        type: 'error',
        title: 'Please enter something',


        })
   }},
     getdate: function(){
      var newDate = new Date
      newDate.toString();
      console.log(newDate);
      var mdate = moment(newDate).format('MMMM Do YYYY, h:mm:ss a');
      console.log(this.postDate);
      console.log(mdate);
    }
   },

 }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 25px;
  color:black;
  margin-top:25%;

}
span{

  color:red;
}
v-label{
  width:800px;
}
layout{
  margin: 0 auto;
}

div#card{
  opacity:0.7;
  border-top-right-radius:  50px;
  border-bottom-left-radius:  45px;
  text-align: center;
  display:block;
  position:relative;
  background-color:white;
  width:500px;
  height:300px;
  border-bottom-style: dashed;
  border :1px dotted;
  border-color:white;
  cursor: pointer;
}

/*this is the animation for cards*/
.container {
  position: relative;
}
.container .page-title, .container .page-sub-title {
  color: white;
  text-align: center;
}
.container .page-title {
  margin: 30px 0 5px;
  font-size: 30px;
}
.container .page-sub-title {
  font-weight: 100;
  margin: 0 0 30px 0;
  font-size: 23px;
}

html {
  background: linear-gradient(45deg, #DE6262 10%, #FFB88C 90%);
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  height: 100vh;
}

img {
  display: block;
  width: 100%;
}

.card-container {
  -webkit-perspective: 1000;
          perspective: 1000;
  margin: 0 auto 50px;
  width: 400px;
}

.front, .back {
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 30px;
  box-sizing: border-box;
  transition-delay: 0.15s;
  transition: 0;
}

.front {
  -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
}

.back {
  -webkit-transform: rotateY(180deg);
          transform: rotateY(180deg);
  opacity: 0;
  padding-top: 60px;
  -webkit-backface-visibility: visible;
          backface-visibility: visible;
  background: #333741;
  color: white;
}

.card {
  position: relative;
  width: 400px;
  height: 450px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 40px 110px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  transition: 0.5s;
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
}
.card:hover {
  -webkit-transform: rotateY(180deg);
          transform: rotateY(180deg);
}
.card:hover .front {
  opacity: 0;
}
.card:hover .back {
  opacity: 1;
}

.sub-title {
  color: #DE6262;
  -webkit-animation: slide-in 0.75s;
          animation: slide-in 0.75s;
  -webkit-animation: slide-in 0.75s cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation: slide-in 0.75s cubic-bezier(0.625, 0.075, 0.11, 1.165);
  -webkit-animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
  font-size: 18px;
  font-weight: 200;
  margin: 0 0 5px 0;
}

.title {
  color: #333741;
  -webkit-animation: slide-in-slow 0.75s;
          animation: slide-in-slow 0.75s;
  -webkit-animation: slide-in-slow 0.75s cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation: slide-in-slow 0.75s cubic-bezier(0.625, 0.075, 0.11, 1.165);
  -webkit-animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
  font-size: 30px;
  font-weight: 600;
  margin: 0;
}

.synopsis {
  color: #DE6262;
  font-size: 27px;
  font-weight: 600;
  margin: 0 0 15px;
}

p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  line-height: 1.5;
  margin: 0 0 35px;
}

.btn {
  border: 1px solid #FFB88C;
  border-radius: 5px;
  background: transparent;
  display: inline-block;
  font-size: 17px;
  padding: 8px 20px 9px 15px;
  color: #FFB88C;
  transition: 0.5s;
  margin: 0 2px 0;
  font-weight: 100;
}
.btn.secondary {
  border-color: #DE6262;
  color: #DE6262;
}
.btn.secondary:hover {
  background: #DE6262;
}
.btn:hover {
  cursor: pointer;
  background: #FFB88C;
  color: white;
}
.btn i {
  margin: 0 5px 0;
}

.image {
  position: absolute;
  bottom: 0;
  left: 0;
  -webkit-animation: slide-in-right 1.25s;
          animation: slide-in-right 1.25s;
  -webkit-animation: slide-in-right 1.25s cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation: slide-in-right 1.25s cubic-bezier(0.625, 0.075, 0.11, 1.165);
  -webkit-animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
          animation-timing-function: cubic-bezier(0.625, 0.075, 0.11, 1.165);
  font-size: 35px;
  font-weight: 600;
  margin: 0;
}

@-webkit-keyframes slide-in {
  0% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
}

@keyframes slide-in {
  0% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes slide-in-slow {
  0% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  20% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
}
@keyframes slide-in-slow {
  0% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  20% {
    -webkit-transform: translate3d(-300px, 0, 0);
            transform: translate3d(-300px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translate3d(400px, 0, 0);
            transform: translate3d(400px, 0, 0);
  }
  30% {
    -webkit-transform: translate3d(400px, 0, 0);
            transform: translate3d(400px, 0, 0);
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translate3d(400px, 0, 0);
            transform: translate3d(400px, 0, 0);
  }
  30% {
    -webkit-transform: translate3d(400px, 0, 0);
            transform: translate3d(400px, 0, 0);
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

</style>
