<template>
    <div>
        <!-- CRUD DEVICES -->
        <div class="row">
            <card>
            <div slot="header">
                <h4 class="card-title">Add New Device</h4>
            </div>
            <div class="row">
                <div class="col-4">
                    <base-input label="Device Name" type="text" placeholder="Ex: Home, Termometer..."></base-input>
                </div>
                <div class="col-4">
                    <base-input label="Device ID" type="text" placeholder="Ex: 156-569-0"></base-input>
                </div>
                <div class="col-4">
                    <slot name="label">
                        <label>Template</label>
                    </slot>
                    <el-select value="1" placeholder="Select Template" class="select-primary" style="width:100%">
                        <el-option class="text-dark" value="Template 1" label="Template 1"></el-option>
                        <el-option class="text-dark" value="Template 2" label="Template 2"></el-option>
                        <el-option class="text-dark" value="Template 3" label="Template 3"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="row pull-right">
                <div class="col-12">
                    <base-button type="primary" class="mb-2" size="lg">Add</base-button>
                </div>
            </div>
        </card>
        </div>
        <!-- DEVICES TABLE -->
        <div class="row">
            <card>
            <div slot="header">
                <h4 class="card-title">Device</h4>
            </div>
            <el-table :data="devices">
                <el-table-column
                    label="#"
                    min-width="50"
                    align="center"
                >
                    <div slot-scope="{ row, $index}">
                        {{$index + 1}}
                    </div>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Name"
                ></el-table-column>
                <el-table-column
                    prop="dId"
                    label="Device ID"
                ></el-table-column>
                <el-table-column
                    prop="templateName" 
                    label="Template"
                ></el-table-column>
                <el-table-column label="Actions">
                    <div slot-scope="{row}">
                        <el-tooltip 
                            content="Delete" 
                            effect="light" 
                            :open-delay="300" 
                            placement="top">

                            <base-button type="danger" icon size="sm" class="btn-link" @click="deleteDevice(row)">
                                <i class="tim-icons icon-simple-remove"></i>
                            </base-button>

                        </el-tooltip>
                    </div>
                </el-table-column>
            </el-table>
            </card>
        </div>
    </div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import {Select, Option} from "element-ui";
import BaseButton from '../components/BaseButton.vue';
export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Option.name]: Option,
        [Select.name]: Select,
        [BaseButton.name]: BaseButton,
    },
    data(){
        return{
            devices: [
                {
                    name: "Home",
                    dId: "023F69A",
                    templateName: "Power Sensor",
                    templateId: "1b51rytbns35bns1g51b63a"
                },
                {
                    name: "Office",
                    dId: "023699A",
                    templateName: "Temperature Sensor",
                    templateId: "1b51rytbns35bns1g51b63a"
                },
                {
                    name: "Facility1",
                    dId: "082A69A",
                    templateName: "Humidity Sensor",
                    templateId: "1b51rytbns35bns1g51b63a"
                }
            ]
        };
    },
    methods: {
        deleteDevice(device){
            alert(`DELETING ${device.name}`)
        }
    }
};
</script>