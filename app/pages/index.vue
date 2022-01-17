<template>
    <div class="row">
        <h1>
            Loading...
        </h1>
    </div>
</template>

<script>
export default {
    mounted() {
        $nuxt.$router.push("/dashboard")
        
    },
}
</script>