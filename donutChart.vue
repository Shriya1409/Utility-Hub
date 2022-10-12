<template>
  <div id="donut">
    <GChart class="gchart" type="PieChart" :options="options" :data="chartData" />
  </div>
</template>
<script>
import { GChart } from "vue-google-charts";
import dashboardData from "src/nucleus/DashboardData.json";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [
      ],
      options: {
       
      },
      fetchedCommunications: [],
    };
  },
  methods: {
    fetchData() {
          var count1=0;
          var count2=0;
          var count3=0;
          var count4=0;
          var count5=0;
          var count6=0;
        var responseData = dashboardData;
        if (responseData.Status === "OK") {
          this.fetchedCommunications = responseData.ResponseJson.Communications;
          var self = this;
          this.fetchedCommunications.forEach(function (communication) {
            var obj = {};
            obj["CommunicationId"] = communication.CommunicationId;
            obj["Type"] = self.truncateString(communication.Type);
            if(obj.Type=="Road Defects"){
                  count1++;
              }
              if(obj.Type=="Water Quality"){
                  count2++;
              }
              if(obj.Type=="Road Signs"){
                  count3++;
              }
              if(obj.Type=="Sewage Issues"){
                  count4++;
              }
              if(obj.Type=="Water Pipeline"){
                  count5++;
              }
              if(obj.Type=="Other"){
                  count6++;
              }
          });
         

          this.chartData=[
          ["Types", "No of users"],
          ["Road Defects", count1],
          ["Water Quality", count2],
          ["Road Signs", count3],
          ["Sewage Issues", count4],
          ["Water Pipeline", count5],
          ["Other", count6],
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
#donut{
  width:410px;
  height: 250px;
}
 .gchart {
  margin: auto;
  width: 100%;
  padding: 5px;
}
</style>