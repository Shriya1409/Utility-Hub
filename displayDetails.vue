<template>
<div>
  <div class="text-h2 q-display-1 text-center" >User detail</div>
        
        <div class="text-h6 q-pt-sm">
         <div class="q-pa-sm">
        
           <q-input
              v-model="selectedData.Status"
              filled

              label="Status"
              color="red"
              outlined
              class="q-mt-sm"
              readonly
            >
            </q-input>
              <q-input
              v-model="selectedData.Type"
              filled
              type="name"
              label="Type"
              color="red"
              outlined
              class="q-mt-sm"
              readonly
            >
            </q-input>

            <q-input
              v-model="selectedData.CreatedOn"
              filled
              type="name"
              label="CreatedOn"
              color="red"
              outlined
              class="q-mt-sm"
              readonly
            >
            </q-input>
            <q-input
         v-model="this.Description"
              filled
              type="name"
              label="Description"
              color="red"
              outlined
              class="q-mt-sm"
              readonly
            >

            </q-input>
             <q-input
         v-model="this.img"
              filled
              type="name"
              label="fileName"
              color="red"
              outlined
              class="q-mt-sm"
              readonly
            >

            </q-input>
            <q-btn  color="primary" class="q-mt-sm full-width " text-color="white" label="Confirm" title="View Task" @click=$router.go(-1) />
            
            
    
            </div>
         </div>
</div>
</template>

<script>
import dashboardData from "./DashboardData.json"
export default {
  props: ["sr"],
  data() {
    return {
      comId: this.$route.params.sr,
      data:[],
      selectedData:[],
      Description:"",
      img:[],
  

    };
  },
  methods:{
    rawData() {
        
          this.data = dashboardData.ResponseJson.Communications
          
            for(var i=0; i<this.data.length;i++)
            {
                if(this.data[i].CommunicationId==this.comId)
                {
                    this.selectedData=this.data[i]
                    break;
                }
            }
            this.Description=this.selectedData.Detail.Description
            this.img=this.selectedData.Detail.ImageDetail[0].DocumentData.FileName




      },
  },
  mounted() {
      this.rawData();
    
    },

}
</script>

<style>

</style>