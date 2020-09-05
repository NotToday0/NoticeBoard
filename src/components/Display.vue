<template>
<div class="displayWrapper">
  <div id="header">
    <p>{{title}}</p>
  </div>

  <div id="body">
    <p>{{post}}</p>
    <img v-bind:src="singleURL" height="400" width="500"/>
  </div>

  </div>
</template>

<script>
import db from '../firebase/init'
export default {
  data() {
    return {
      title: "",
      post: "",
      posts: [],
      postInc: 0,
      size: null,
      urls: [],
      singleURL: null,
      fileInc: 0,
      fileSize: null,
      interval: null,
      interval2: null,
    }
  },

  methods: {
    getFileData: function() {
      var vm = this;
      db.collection('URL').get().then(snap => {
        const urls = []

        this.fileSize = snap.size
        snap.forEach(url => {

          urls.push(url.data().fileurl);

        })
        this.urls = urls
      }).catch(function(error) {
        console.log('sorry' + error);
      }).then(() => {
        console.log('interval');
        vm.interval2 = setInterval(this.displayFileData, 3000);
      })

    },
    displayFileData: function() {
      if (this.fileInc < this.fileSize) {
        this.singleURL = this.urls[this.fileInc]
        console.log(this.fileInc);
        this.fileInc++
        console.log(this.fileinc);
      } else {
        this.fileinc = 0;
        console.log(' File display completed');
        clearInterval(this.interval2);
      }
    },
    getPostData: function() {
      var vm = this
      db.collection('posts').get().then(snap => {
        const posts = []
        this.size = snap.size
        snap.forEach(doc => {
          posts.push(doc.data())

        })
        this.posts = posts
      }).catch(function(error) {
        console.log('sorry' + error);
      }).then(snap => {
        vm.interval = setInterval(this.displayPostData, 3000);

      })

    },
    displayPostData: function() {
      if (this.postInc < this.size) {
        this.post = this.posts[this.postInc].post
        this.title = this.posts[this.postInc].title
        console.log('post no. : ' + this.postInc);
        this.postInc++
      } else {
        console.log('Post Display Completed');
        this.postInc = 0;
        clearInterval(this.interval);
        this.getFileData();
      }

    }
  },

  created() {
    this.getPostData();
  },
}
</script>

<style scoped>
img {
  margin-top: 0px;
  padding: 0px;
  height: 75%;
  width: 100%;
}

div#header {
  border-bottom: 1px dotted grey;
  box-sizing: border-box;
  max-width: 100%;
  height: 80px;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
}

p {
  font-family: 'Nunito', sans-serif;
  font-size: 40px;

}

div#body {
  width: 99%;
  height: 100%;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;


}

div#body p {

  padding: 20px;
  font-size: 32px;
  letter-spacing: 1px;
}
</style>
