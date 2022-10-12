<template>
    <div id="column">
         
        <GChart
          type="ColumnChart"
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
       title:'Number of users v/s Types',
       hAxis:{title:"Types", titleTextStyle:{color:'#333'}},
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
            console.log(count1)
            this.chartData=[
            ["Type", "Number of people"],
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
  #column{
  width:620px;
  height: 300px;
}
.gchart {
  margin: auto;
  width: 100%;
  height: 100%;
}

    
    </style>