<template>
    <div>
        <Iotindicator :config=configIndicator></Iotindicator>
        <Iotbutton :config="configButton"></Iotbutton>
    </div>
</template> 

<script>
    import Iotbutton from '../components/Widgets/Iotbutton.vue';
    import Iotindicator from '../components/Widgets/Iotindicator.vue'

    export default {
        data(){
            return{
            value:false,
                configButton:{
                    userId: 'userid',
                    selectedDevice:{
                        name: 'Home',
                        dId: '45983',
                        templateName: 'Power Sensor',
                        tempalateId: '155651653515151',
                        saverRule: false,
                    },
                    variableFullName: 'Boiler',
                    variable:'uniquestr',
                    icon: "fa-sun",
                    column: 'col-6',
                    widget: 'indicator',
                    class: 'danger',
                    message: '{"fanstatus": "stop"}'
                },
                configIndicator:{
                    userId: 'userid',
                    selectedDevice:{
                        name: 'Home',
                        dId: '56812',
                        templateName: 'Power Sensor',
                        tempalateId: '155651653515151',
                        saverRule: false,
                    },
                    variableFullName: 'Boiler',
                    variable:'uniquestr',
                    icon: "fa-sun",
                    column: 'col-6',
                    widget: 'indicator',
                    class: 'danger',
                    message: '{"fanstatus": "stop"}'
                },
            }
        },
        methods:{

        },
        components: {
            Iotindicator,
            Iotbutton,
        },
    }
</script>