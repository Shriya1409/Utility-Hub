<template>
<div id="area" >
    <GChart
      type="AreaChart"
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
  name: "main",
  data() {
    return {
       chartData:[],
      
      chartOptions: {
       title:'Number of users v/s Status',
       hAxis:{title:"Status", titleTextStyle:{color:'#333'}},
       vAxis:{title:"Number of Users", titleTextStyle:{color:'#333'}}
      },
      fetchedCommunications: [],
    
    };
  },
  methods: {
  
    fetchData() {
        var count1=0;
        var count2=0;
        var count3=0;
      
      var responseData = dashboardData;
      if (responseData.Status === "OK") {
        this.fetchedCommunications = responseData.ResponseJson.Communications;
        var self = this;
        this.fetchedCommunications.forEach(function (communication) {
          var obj = {};
          obj["CommunicationId"] = communication.CommunicationId;
          obj["Status"] = self.truncateString(communication.Status);
          if(obj.Status=="ASSIGNED"){
                count1++;
            }
            if(obj.Status=="CLOSED"){
                count2++;
            }
            if(obj.Status=="NEW"){
                count3++;
            }
          
        });
        this.chartData=[
        ["Type", "Number of people"],
        ["Assigned", count1],
        ["Closed", count2],
        ["New", count3],
      
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
#area{
  width:530px;
  height: 250px;
}
.gchart {

  width: 100%;
  height: 100%;
}
</style>