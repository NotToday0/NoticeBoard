<template>
  <div id="layout">
<v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <h1 style="color:white">Posts Title</h1>
          <v-text-field
                  append-icon="fas fa-search"
                  class="mx-3"
                  flat
                  label="Search"
                  solo-inverted
                  v-model="search"
                ></v-text-field>
                <v-container>
                  <div id="table">
                    <title>Post Table</title>

                    <h1 class="table-title">Post Title</h1>
                  <table class="employees-table">
                    <thead class="employees-table-head">
                      <tr>
                        <th>TITLE</th>
                        <th>POST</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody class="employees-table-body">
                      <tr v-for="post in posts">

                        <td >{{post.title}}</td>

                        <td>{{post.post}}</td>

                        <td>{{post.date}}</td>

                        <td><i class="fa fa-trash fa-3x" @click="deletePost(post.id)"></i></td>

                      </tr>
                    </tbody>
                  </table>

                  </div>
                  <!--<v-data-table
      :headers="headers"
      :items="posts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td  class="text-xs-right" >{{ props.item.title }}</td>
        <td  class="text-xs-right" >{{ props.item.post }}</td>
        <td  class="text-xs-right" >{{ props.item.date }}</td>
        <td class="text-xs-right"  ><v-icon  @click="deletePost(props.item.id)">fas fa-trash</v-icon></td>
      </template>
    </v-data-table>-->

                </v-container>

      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>


<script>
import db from '../firebase/init'
export default {
  data(){
    return{
      headers: [
            {
              text: 'ID',
              align: 'left',
              sortable: true,
              value: 'name'
            },
            { text: 'TITLE', value: 'post' ,align:'right'},
            { text: 'POST', value: 'post_title' ,align:'right'},
            { text: 'DATE ', value: 'post_date', align:'right' },
            { text: 'ACTION', value: 'delete',  align:'right' },
          ],

      posts:[],
      search:""
    }
  },
  computed:{
    sortedPost() {
      return this.posts.slice().sort((a,b) => {
        a.id - b.id
      })
    }

  },
  created(){
  this.getPosts()
},
methods:{
  getPosts: function(){
    db.collection('posts').get().then(snap => {
      const posts = []

      snap.forEach(doc => {
        posts.push(doc.data())
      })
      this.posts = posts
    })
  },
  deletePost:function(id){
    console.log(id);
    db.collection('posts').where('id', '==', id).get().then(snap => {
      snap.forEach(doc => {
       doc.ref.delete().then(this.getPosts)
     })
     swal("deleted","Post has been deleted","error")
    })

  }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
layout{
  margin: 0 auto;
}
.v-input__slot {
    width: 800px;
}
h1{
  margin-top: 2px;
  margin-bottom: 20px;
}
.display{
  background-color:white;
  position: relative;
  max-height:1000px;
  width:800px;
  border:2px solid red;
}
.border{
  border:2px solid white;
  box-sizing: border-box;
}
td{
  text-align: left;
}
div#layout{

    font-family: 'Nunito', sans-serif;

}
td{
  font-size: 20px;
}
.text-xs-right{
  font-size:17px;
}

/* CSS for table */
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');
@import url('https://fonts.googleapis.com/css?family=Archivo+Black');

body {
  box-sizing: border-box;
  background-color: #fbc531;
  font-family: 'Montserrat', sans-serif;
  margin: 20px;
}

.table-title {
  margin: 50px auto;
  max-width: 600px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Archivo Black', sans-serif;
  font-size: 2.5em;
  color: #222;
}

.employees-table {
  margin: 50px auto;
  max-width: 600px;
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.employees-table-head th {
  padding: 15px 15px;
  text-transform: uppercase;
  font-size: .9em;
  font-weight: 700;
  color: #f1f1f1;
  background: #222;
}

.employees-table-body tr{
  background: grey;
  transition: ease-in-out .3s;
}

.employees-table-body tr:nth-child(even) {
  background: #333;
}

.employees-table-body tr:hover {
  background: #222;
  color: #f1f1f1;
}

.employees-table-body td{
  padding: 15px 15px;
  font-size: .9em;
  font-weight: 600;
  cursor: pointer;
}

.employees-table-body tr i{
  color: transparent;
  transition: ease-in-out .3s;
}

.employees-table-body tr:hover i {
  color: #e74c3c;
}

.employees-table-body tr i:hover {
  color: #c0392b;
}

@media screen and (max-width: 600px) {
  .table-title {
    margin-bottom: 0;
  }

  .employees-table {
    box-shadow: none;
    margin: 0;
  }

	.employees-table,
  .employees-table-head,
  .employees-table-body,
  .employees-table-head th,
  .employees-table-body td,
  .employees-table-body tr {
		display: block;
	}

  .employees-table-head tr{
    display: none;
  }

  .employees-table-body tr {
    margin: 40px 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .employees-table-body td {
    position: relative;
		border: none;
		border-bottom: 1px solid #eee;
		padding-left: 50%;
	}

  .employees-table-body td:before {
		position: absolute;
    content: '';
		top: 0;
		left: 0;
    height: 100%;
		width: 40%;
    background: #222;
	}

  .employees-table-body td:after {
    position: absolute;
    color: #fff;
    text-transform: uppercase;
    font-size: .9em;
    top: 15px;
    left: 15px;
    height: 100%;
		width: 40%;
    white-space: nowrap;
  }

    .employees-table-body td:nth-of-type(1):after { content: "First Name"; }
	.employees-table-body td:nth-of-type(2):after { content: "Last Name"; }
	.employees-table-body td:nth-of-type(3):after { content: "Job Title"; }

  .employees-table-body td:last-child {
		border-bottom: none;
	}

  .employees-table-body tr:hover {
    background: #fff;
    color: #222;
  }

  .employees-table-body tr i{
  color: #e74c3c;
  transition: ease-in-out .3s;
}

}




</style>
