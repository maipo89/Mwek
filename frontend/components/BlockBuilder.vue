<template>
   <div>
        <HeroSection v-if="this.blockComponent.__component == 'image.hero-section'" :blockData="this.blockComponent" />
        <TextSection v-if="this.blockComponent.__component == 'text-content.text-section'" :blockData="this.blockComponent" />
        <CardsWithFilter v-if="this.blockComponent.__component == 'blogs.blog-cards-with-filter'"  />
        <OurApproach v-if="this.blockComponent.__component == 'explore.our-approach'" :blockData="this.blockComponent" />
    </div>
</template>

<script>

export default {
    name: 'BlockBuilder',
    props: {
        ID: Number,
        blockComponent: Object
    },
    
    data(){
        return {
        }
    },

    methods: {
    },
    mounted(){
        // console.log(this.blockComponent);
    }
}
</script>


