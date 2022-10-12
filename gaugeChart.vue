<template>
  <div id="area">
    <GChart class="gchart"
    :settings="{ packages: ['corechart', 'gauge'] }"
     type="Gauge" :options="options" :data="chartData" />
  </div>
</template>
<script>
import { GChart } from "vue-google-charts";
import dashboardData from "src/nucleus/DashboardData.json";
import { ref } from "vue";

export default {
  name: "gauge",
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [],
      options: {
       
      },
      fetchedCommunications: [],
    };
  },
  methods: {
    fetchData() {
      var count1 =0;
      var count2=0 ;
      var count3 = 0;
      var responseData = dashboardData;
      if (responseData.Status === "OK") {
        this.fetchedCommunications = responseData.ResponseJson.Communications;
        var self = this;
        this.fetchedCommunications.forEach(function (communication) {
          var obj = {};
          obj["CommunicationId"] = communication.CommunicationId;
          obj["Status"] = self.truncateString(communication.Status);
          if (obj.Status == "ASSIGNED") {
            count1++;
            
          }
          if (obj.Status == "NEW") {
            count2++;
          }
          if (obj.Status == "CLOSED") {
            count3++;
          }
          console.log(obj);
        });

        this.chartData = [
          ["Status", "No. of projects"],
          ["Assigned", count1],
          ["New", count2],
          ["Closed",count3],
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
  width:400px;
  height: 250px;
}
 .gchart {
  margin: auto;
  width: 100%;
  padding: 5px;
}

</style>
