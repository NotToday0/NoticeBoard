<template>
  <div>
  <div>
    <div class="container-fluid">
      <h1 style="color:white">Graph</h1>
    </div >
    <div class="container">
<chartjs-doughnut
  v-bind:labels="labels"
  v-bind:datasets="datasets"
  v-bind:option="option"
></chartjs-doughnut>
</div>
</div>

</div>
</template>

<script>
import db from '../firebase/init'
export default {

  data(){
    return{
      postCounter:null,
      fileCounter:null,
      labels:["Posts","File"],
      datasets:[
        {
          data:[null,null],
        backgroundColor:[
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],

        }
              ],
      option:{
        responsive:true,
            maintainAspectRatio:true,
      title:{

        display:true,
        position:"bottom",
        text:"Post Statistics"
      }
    }
  }

  },
props:{
  bind:true,
},
methods:{

  getCount: function(){
    db.collection('posts').get().then(snap => {
   this.postCounter = snap.size;
   this.datasets[0].data[0] = this.postCounter;
});
  db.collection('URL').get().then(snap => {
  this.fileCounter = snap.size;
  this.datasets[0].data[1] = this.fileCounter;
  });


}
},
beforeMount() {
  this.getCount();
},
mounted(){
  this.getCount()
},

}
</script>
<style scoped>
div.container{

  box-sizing: border-box;

  margin: auto;
  height:auto;
  width:50%;
  background-color: white;
}
div.container-fluid{
  box-sizing: border-box;
  width:100%;
  margin-bottom:  20px;
  text-align: center;
  padding: 5px;
  line-height: 5rem;
  letter-spacing: 2px;
}


</style>
