<template>
    <tableau-authoring-viz v-if="authoringMode" id="TableauViz2" :src="vizUrl"></tableau-authoring-viz>
    <tableau-viz v-else id="TableauViz1" :src="vizUrl" toolbar="hidden" hide-tabs></tableau-viz>
</template>

<script>
export default {
    name: 'TableauEmbeddedViz',
    props: {
        vizUrl: String,
        authoringMode: Boolean
    }
}
</script>

<style scoped></style>