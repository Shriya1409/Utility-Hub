<template>
  
   <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card  ">
      <q-card-section >
         <h4 class="text-center text-weight-bold q-mb-xs">Area Chart</h4>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
     <areaChart/>
      </q-card-actions>
    </q-card>
     <q-card class="my-card">
      <q-card-section >
         <h4 class="text-center text-weight-bold q-mb-xs">Gauge Chart</h4>
      </q-card-section>

      <q-separator />

      <q-card-actions align="left">
        <gaugeChart/>
      </q-card-actions>
    </q-card>
    <q-card class="my-card">
      <q-card-section >
         <h4 class="text-center text-weight-bold q-mb-xs">Pie Chart</h4>
      </q-card-section>

      <q-separator />

      <q-card-actions align="left">
        <donutChart/>
      </q-card-actions>
    </q-card>
    <q-card class="my-card  ">
      <q-card-section >
         <h4 class="text-center text-weight-bold q-mb-xs">Column Chart</h4>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
     <columnChart/>
      </q-card-actions>
    </q-card>
    <q-card class="my-card  ">
      <q-card-section >
         <h4 class="text-center text-weight-bold q-mb-xs">line Chart</h4>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
      <lineChart/>
      </q-card-actions>
    </q-card>


   </div>


</template>

<script>
import areaChart from './areaChart.vue';
import lineChart from './lineChart.vue';
import columnChart from './columnChart.vue';
import donutChart from './donutChart.vue';
import gaugeChart from './gaugeChart.vue';
export default {
  components: {
     areaChart,
     lineChart,
     columnChart,
     donutChart,
     gaugeChart
  
  },
     methods: {
  mounted() {
    this.$q.loading.hide();
    this.fetchData();
   
  },

}
}
</script>

<style>
.column{
  width: 500px
}


</style>