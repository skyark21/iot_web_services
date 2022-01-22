<template>
    <card>
        <div slot='header'>
            <h4 class='card-title'>{{config.selectedDevice.name}} - {{config.variableFullName}}</h4>
        </div>
        <i
            class='fa ' 
            :class="[config.icon, getIconColorClass()]" 
            style="font-size: 30px"
        ></i>
        <base-button 
            @click="sendValue()" 
            :type="config.class" 
            class="mb-3 pull-right" 
            size="lg"
        >SEND</base-button>
    </card>
</template>
<script>
    export default {
        props: ['config'],
        data() {
            return{
                sending: false,
            }
        },
        mounted(){
            this.$nuxt.$on('widget-topic', this.processReceivedData)
        },
        methods:{
            sendValue(){
                this.sending = true;
                setTimeout(() =>{
                    this.sending = false;
                }, 1000);
                const TOSEND ={
                    topic: this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/acdata",
                    msg: {
                        value : this.config.message
                    }
                };
                console.log(TOSEND);
                this.$nuxt.$emit('mqtt-sender', TOSEND);
            },
            getIconColorClass(){
                if(!this.sending){
                    return "text-dark";
                }
                if(this.config.class == "success"){
                    return "text-success";
                }
                if(this.config.class == "primary"){
                    return "text-primary";
                }
                if(this.config.class == "warning"){
                    return "text-warning";
                }
                if(this.config.class == "danger"){
                    return "text-danger";
                }
            },
        }
    }
</script>