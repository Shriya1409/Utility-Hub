<template>
  <div class="q-ma-sm">
    <div class="flex-container">
      <q-input class="text" v-model="text" label="Enter text" >
         <template v-slot:append>
          <q-icon v-if="model !== ''" name="close" @click.stop.prevent="text = null" class="cursor-pointer" />
          
          
        </template>
      </q-input>
      <div class="filter">
        <q-select
          standout="bg-primary text-white"
          v-model="model1"
          :options="status"
          label="Status"
        >
          <template v-slot:append>
          <q-icon v-if="model !== ''" name="close" @click.stop.prevent="model1 = null" class="cursor-pointer" />

          
        </template>
        </q-select>

      </div>
      <div class="filter">
        <q-select
          standout="bg-primary text-white"
          v-model="model2"
          :options="type"
          label="Type"
        >
         <template v-slot:append>
          <q-icon v-if="model !== ''" name="close" @click.stop.prevent="model2 = null" class="cursor-pointer" />
          
        </template>
        </q-select>
      </div>
      <div class="filter">
        <q-input filled v-model="date" mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <q-btn
        color="primary"
        class="q-mt-sm"
        text-color="white"
        label="Apply"
        @click="filterData()"
      />
    </div>

    <q-table
      :title="'Table Dashboard'"
      :rows="data"
      :columns="columns"
      row-key="name"
      class="gt-sm"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="CommunicationId" :props="props">{{
            props.row.CommunicationId
          }}</q-td>
          <q-td key="Subject" :props="props">{{ props.row.Subject }}</q-td>
          <q-td key="CreatedOn" :props="props">{{ props.row.CreatedOn }}</q-td>
          <q-td key="Type" :props="props">{{ props.row.Type }}</q-td>
          <q-td key="Status" :props="props">{{ props.row.Status }}</q-td>
          <q-td key="Action" :props="props"
            ><q-btn
              color="primary"
              size="sm"
              label="View"
              @click="redirectToViewCommunicationDetail(props.row)"
          /></q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="lt-md">
      <div v-if="data.length == 0" class="flex flex-center">
        No Results Found!
      </div>
      <div>
        <q-card class="q-mb-sm" v-for="(task, index) in data" :key="index">
          <q-separator />
          <q-card-section>
            <div v-for="(column, index) in columns" :key="index">
              <q-input
                v-if="column.name != 'Action'"
                readonly
                v-model="task[column.name]"
                :label="column.label"
              />
              <q-btn
                v-if="column.name == 'Action'"
                color="primary"
                class="q-mt-sm full-width"
                text-color="white"
                label="View"
                title="View Task"
                @click="redirectToViewCommunicationDetail(task)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import filter from "src/components/filter";
import converterMixin from "src/components/converterMixin";
import serviceHandlerMixin from "src/components/serviceHandlerMixin";
import dashboardData from "./DashboardData.json";
import { ref } from "vue";
export default {
  name: "viewConsumerCommunicationDashboard",
  data() {
    return {
      data: [],
      columns: [
        {
          name: "CommunicationId",
          align: "left",
          label: "Id",
          field: "CommunicationId",
        },
        { name: "Subject", label: "Subject", align: "left", field: "Subject" },
        {
          name: "CreatedOn",
          label: "CreatedOn",
          align: "left",
          field: "CreatedOn",
        },
        { name: "Type", label: "Type", align: "left", field: "Type" },
        { name: "Status", label: "Status", align: "left", field: "Status" },
        { name: "Action", label: "Action", align: "left", field: "Action" },
      ],
      fetchedCommunications: [],
      duplicateData: [],
    };
  },

  setup() {
    return {
      model1: ref(),
      model2: ref(),
      text: ref(),
      status: ["ASSIGNED", "CLOSED", "NEW"],
      type: [
        "Road Defects",
        "Water Quality",
        "Road Signs",
        "Sewage Issues",
        "Water Pipeline",
        "Other",
      ],
      date: ref(""),
      newdate: ref(),
    };
  },
  computed: {},
  methods: {
    redirectToHome: function () {
      this.$router.push("/theHub");
    },
    formatDate(unformatedDate) {
      let formattedString = date.formatDate(unformatedDate, "DD/ MM/ YYYY");
      return formattedString;
    },
    redirectToViewCommunicationDetail(dashboardData) {
      console.log(dashboardData)
      var sr = dashboardData.CommunicationId;
      console.log(sr);

      this.$router.push({ name: "displayDetails", params: { sr } });
    },
    fetchCommunications() {
      this.data = [];
      var responseData = dashboardData;
      if (responseData.Status === "OK") {
        this.fetchedCommunications = responseData.ResponseJson.Communications;
        var self = this;
        this.fetchedCommunications.forEach(function (communication) {
          var obj = {};
          obj["CommunicationId"] = communication.CommunicationId;
          obj["Subject"] = self.truncateString(communication.Detail.Subject);
          obj["CreatedOn"] = self.DateConverter(communication.CreatedOn);
          obj["Type"] = self.truncateString(communication.Type);
          obj["Status"] = self.truncateString(communication.Status);
          obj["Description"] = self.truncateString(
            communication.Detail.Description
          );

          obj["ImageDetail"] = communication.Detail.ImageDetail[0];

          obj["Action"] = "";
          self.data.push(obj);
        });
        this.duplicateData = this.data;
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
    filterData() {
      this.data = this.duplicateData;
      console.log("actual data");
      console.log(this.data);
      this.newdate = this.DateConverter(this.date);
      this.setdata(this.data);
      this.updateData = this.check(
        this.model1,
        this.model2,
        this.newdate,
        this.text
      );

      this.data = this.updateData;
    },
  },
  mounted() {
    this.$q.loading.hide();
    this.fetchCommunications();
  },
  mixins: [serviceHandlerMixin, converterMixin, filter],
};
</script>
<style type="text/css">
.selectStyle {
  min-width: 150px;
}
tr:nth-child(even) {
  background-color: #3498db10 !important;
}
button {
  background: rgb(6, 6, 62);
  border: 2px solid white;
  color: white;
  width: 75px;
  margin: 2px;
  height: 55px;
}
.flex-container {
  display: flex;
  margin: 6px;
  height: 50px;
  margin-top: 3px;
}
.filter {
  width: 300px;
  align-items: flex-end;
  padding: 2px;
}
</style>
