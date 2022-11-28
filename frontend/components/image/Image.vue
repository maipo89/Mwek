<template>
    <div>
        <img class="component-img" :src="this.$store.state.apiroute.url + this.imgUrl" />
    </div>
</template>

<script>

export default {
    name: 'Image',
    props: {
        imgUrl: String,
    },
}
</script>


