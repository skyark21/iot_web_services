<template>
    <div>
        <Iotindicator></Iotindicator>
        <base-button type="primary" class="mb-2" size="lg" @click="sendData()">SEND</base-button>
    </div>
</template> 

<script>
    import Iotindicator from '../components/Widgets/Iotindicator.vue'

    export default {
        data(){
            return{
                value:false
            }
        },
        methods:{
            sendData(){
                this.value = !this.value;
                const toSend = {
                    value: this.value,
                }
                this.$nuxt.$emit('widget-topic', toSend);
            }
        },
        components: {
            Iotindicator,
        },
    }
</script>