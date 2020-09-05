<template>

<div >
    <v-app id="inspire" dark>

      <v-navigation-drawer

        v-model="drawer"

        clipped

        fixed

        app

      >
      <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Monil Shah</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

  <v-divider></v-divider>

        <v-list dense>

          <v-list-tile @click="">

            <v-list-tile-action>

              <v-icon>fas fa-plus</v-icon>

            </v-list-tile-action>

            <router-link to="/add" exact id="content"><v-list-tile-content>

              <v-list-tile-title >Add Blog</v-list-tile-title>

            </v-list-tile-content></router-link>

          </v-list-tile>

          <v-list-tile @click="">

            <v-list-tile-action>

              <v-icon>fas fa-trash</v-icon>

            </v-list-tile-action>

            <router-link to="/delete" exact id="content"><v-list-tile-content>

              <v-list-tile-title >Delete Blog</v-list-tile-title>

            </v-list-tile-content></router-link>

          </v-list-tile>
          <v-list-tile @click="">

            <v-list-tile-action>

              <v-icon>fas fa-trash</v-icon>

            </v-list-tile-action>

            <router-link to="/home" exact id="content"><v-list-tile-content>

              <v-list-tile-title >Graph</v-list-tile-title>

            </v-list-tile-content></router-link>

          </v-list-tile>

          <v-list-tile @click="">

            <v-list-tile-action>

              <v-icon>fas fa-eye</v-icon>

            </v-list-tile-action>

            <router-link to="/display" exact id="content"><v-list-tile-content>

              <v-list-tile-title >Display Board</v-list-tile-title>

            </v-list-tile-content></router-link>

          </v-list-tile>

        </v-list>

      </v-navigation-drawer>

      <v-toolbar app fixed clipped-left>

        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

        <router-link to="/" exact> <v-toolbar-title>Home</v-toolbar-title> </router-link>
        <v-spacer></v-spacer>
        <router-link to="/login" exact> <v-toolbar-title>Login</v-toolbar-title> </router-link>
      </v-toolbar>

      <v-content>

              <router-view></router-view>


      </v-content>

    </v-app>


</div>
</template>

<script>

import Add from './components/Add.vue'
import Delete from './components/Delete.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Display from './components/Display.vue'



export default {

    beforeCreate() {
      //do something before creating vue instance

    },
    created(){
     console.log("created");
    },


  components:{
    'home':Home,
    'add':Add,
    'delete':Delete,
    'Login':Login,
    'display':Display,
  },

  data(){
    return{
        drawer:true,
        loading:null
    }
  },
  props:{
    source: String
  }
}
</script>

<style >
.router-link-active{
  color:#ee44aa;
}
#content {
  text-decoration: none;
  color:white;
}
body{
  font-family: 'Nunito', sans-serif;
}
/* @vikttor_  */

/* Loading SASS */
.layer-preloader{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    top: 0;
    left: 0;
    z-index: 999;
}

.loading{
    position:relative;
    display:block;
    height: 100%;
    .loader{
        position: absolute;
        display: block;
        left: calc(50% - 75px);
        top: calc(50% - 75px);
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 4px solid transparent;
      animation: loading 2s;
          -webkit-animation: loading 2s;
      position: absolute;
        animation-iteration-count: infinite;
        -webkit-animation-iteration-count: infinite;
        animation-timing-function: linear;

      &.firstColor{
          border-top-color: #830025;
      }
      &.secondColor{
          border-top-color: #f24f77;
          left: 7px;
          width: 127px;
          height: 127px;
          top: 7px;
      }
      &.thirdColor{
          border-top-color: #c9c9c9;
          left: 8px;
          width: 103px;
          height: 103px;
          top: 8px;
      }
   }
}

@-webkit-keyframes loading{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}

@keyframes loading {
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
/* ENDA Loading */
</style>
