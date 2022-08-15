import { TableColumn, Option } from 'element-ui';
<template>
  <div>
    <!-- ADD NEW DEVICE -->
    <div class="col-md-12">
      <card class="card-plain" body-classes="table-full-width">
        <template slot="header">
          <h4 class="card-title">Add New Device</h4>
        </template>
        <div class="row">
          <div class="col-4">
            <base-input
              label="Device Name"
              type="text"
              placeholder="Ex: Temperature Office"
              v-model="newDevice.name"
            ></base-input>
          </div>
          <div class="col-4">
            <base-input
              label="Device Number"
              type="text"
              placeholder="Ex: 321C-43FH"
              v-model="newDevice.dId"
            ></base-input>
          </div>
          <div class="col-4">
            <slot name="label">
              <label>Template</label>
            </slot>
            <el-select
              v-model="selectedIndexTemplate"
              placeholder="Select Template"
              class="select-primary"
              style="width: 100%"
            >
              <el-option
                v-for="(template, index) in templates"
                :key="template._id"
                class="text-dark"
                :value="index"
                :label="template.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="row pull-right">
          <div class="col-12">
            <base-button
              @click="createNewDevice()"
              type="primary"
              class="mb-3"
              size="lg"
              >ADD</base-button
            >
          </div>
        </div>
      </card>
    </div>
    <!-- ADD NEW DEVICE -->
    <!-- DEVICE TABLE -->
    <div class="col-md-12">
      <card class="card-plain" body-classes="table-full-width">
        <template slot="header">
          <h4 class="card-title">Device</h4>
        </template>
        <el-table
          header-cell-class-name="table-transparent"
          header-row-class-name="table-transparent"
          row-class-name="table-transparent"
          :data="$store.state.devices"
        >
          <el-table-column
            min-width="150"
            property="name"
            label="Name"
            sortable
          ></el-table-column>
          <el-table-column
            property="dId"
            label="Device"
            sortable
          ></el-table-column>
          <el-table-column
            property="templateName"
            label="Template"
            sortable
          ></el-table-column>

          <el-table-column label="Actions">
            <div slot-scope="{ row, $index }">
              <el-tooltip
                content="Saver Status Indicator"
                style="margin-right: 10px"
              >
                <i
                  class="fa fa-database"
                  :class="{
                    'text-success': row.saverRule,
                    'text-dark': !row.saverRule,
                  }"
                ></i>
              </el-tooltip>
              <el-tooltip content="Database Saver">
                <base-switch
                  type="primary"
                  :value="row.saverRule"
                  @click="updateServerRuleStatus($index)"
                  on-text="On"
                  off-text="Off"
                >
                </base-switch>
              </el-tooltip>
              <el-tooltip
                content="Delete"
                effect="light"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  type="danger"
                  icon
                  size="sm"
                  class="btn-link"
                  @click="deleteDevice(row)"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <!-- DEVICE TABLE -->
    <!-- JSON VIEWER -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">JSON Viewer</h4>
        </div>
        <Json :value="templates"></Json>
      </card>
    </div>
    <!-- JSON VIEWER -->
  </div>
</template>

<script>
import { Select, Table, TableColumn, Option } from "element-ui";
export default {
  middleware: "authenticated",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  data() {
    return {
      templates: [],
      selectedIndexTemplate: null,
      newDevice: {
        name: "",
        dId: "",
        templateId: "",
        templateName: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("getDevices");
    this.getTemplate();
  },
  methods: {
    updateServerRuleStatus(index) {
      this.devices[index].saverRule = !this.devices[index].saverRule;
    },
    async getTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token,
        },
      };
      console.log(axiosHeaders);
      try {
        const res = await this.$axios.get("/templates", axiosHeaders);
        console.log(res.data);
        if (res.data.status == "success") {
          this.templates = res.data.data;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates...",
        });
        console.log(error);
        return;
      }
    },
    createNewDevice() {
      if (this.newDevice.name == "") {
        this.$notify({
          type: "warning",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Device Name is Empty...",
        });
        return;
      }
      if (this.newDevice.dId == "") {
        this.$notify({
          type: "warning",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Device Number is Empty...",
        });
        return;
      }
      if (this.selectedIndexTemplate == null) {
        this.$notify({
          type: "warning",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Template is not Selected...",
        });
        return;
      }
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token,
        },
      };
      this.newDevice.templateId =
        this.templates[this.selectedIndexTemplate]._id;
      this.newDevice.templateName =
        this.templates[this.selectedIndexTemplate].name;
      const toSend = {
        newDevice: this.newDevice,
      };
      this.$axios
        .post("/devices", toSend, axiosHeaders)
        .then((res) => {
          if (res.data.status == "success") {
            this.$notify({
              type: "success",
              icon: "tim-icons icon-alert-circle-exc",
              message: "Device added correctly...",
            });
            this.newDevice.name = "";
            this.newDevice.dId = "";
            this.selectedIndexTemplate = null;
            this.$store.dispatch("getDevices");
            return;
          }
        })
        .catch((e) => {
          if (
            e.response.data.status == "error" &&
            e.response.data.error.errors.dId.kind == "unique"
          ) {
            this.$notify({
              type: "warning",
              icon: "tim-icons icon-alert-circle-exc",
              message: "Device already exists. Introduce a new device...",
            });
            return;
          } else {
            this.showNotify("danger", "Error");
            return;
          }
        });
    },
    async deleteDevice(device) {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token,
        },
        params: {
          userId: device.userId,
          dId: device.dId,
        },
      };
      console.log(axiosHeaders);
      try {
        const res = await this.$axios.delete("/devices", axiosHeaders);
        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: device.name + " was deleted...",
          });
        }
        this.$store.dispatch("getDevices");
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error deleting device...",
        });
        console.log(error);
        return;
      }
    },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
