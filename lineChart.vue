<template>
  <div id="line">
      <GChart
        type="LineChart"
        :data="chartData"
        :options="chartOptions"
      />    
    </div>
    
  </template>
  
  <script>
  import { GChart } from 'vue-google-charts'
  import dashboardData from "src/nucleus/DashboardData.json";
  import { ref } from "vue";
  export default {
    components: {
      GChart
    },
    name: "Line",
    data() {
      return {
         chartData:[],
        
        chartOptions: {
          title:'Number of users v/s Types',
       hAxis:{title:"Types", titleTextStyle:{color:'#333'}},
       vAxis:{title:"Number of Users", titleTextStyle:{color:'#333'}}
        },
        fetchedCommunications: [],
      
      };
    },
    methods: {
    
      fetchData() {
          var a=0;
          var b=0;
          var c=0;
          var d=0;
          var e=0;
          var f=0;
        var responseData = dashboardData;
        if (responseData.Status === "OK") {
          this.fetchedCommunications = responseData.ResponseJson.Communications;
          var self = this;
          this.fetchedCommunications.forEach(function (communication) {
            var obj = {};
            obj["CommunicationId"] = communication.CommunicationId;
            obj["Type"] = self.truncateString(communication.Type);
            if(obj.Type=="Road Defects"){
                  a++;
              }
              if(obj.Type=="Water Quality"){
                  b++;
              }
              if(obj.Type=="Road Signs"){
                  c++;
              }
              if(obj.Type=="Sewage Issues"){
                  d++;
              }
              if(obj.Type=="Water Pipeline"){
                  e++;
              }
              if(obj.Type=="Other"){
                  f++;
              }
          });
          this.chartData=[
          ["Types", "No of users"],
          ["Road Defects", a],
          ["Water Quality", b],
          ["Road Signs", c],
          ["Sewage Issues", d],
          ["Water Pipeline", e],
          ["Other", f],
        ]     
        }
      },
      
  
      truncateString(string) {
        if (string !== undefined && string !== null) {
          if (string.length < 30) {
            return string;
          } else {
            return string.substring(0, 30) + "...";
          }
        } else {
          return "";
        }
      },
    },
    mounted() {
      this.$q.loading.hide();
      this.fetchData();
     
    },
  };
  </script>
  
  <style>
  #line{
  width:620px;
  height: 300px;
}
.gchart {
  
  width: 100%;
  height: 100%;
}
  </style>