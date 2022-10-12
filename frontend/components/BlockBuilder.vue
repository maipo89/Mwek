<template>
   <div>
        <HeroSection v-if="this.blockComponent.__component == 'image.hero-section'" :blockData="this.blockComponent" />
        <TextSection v-if="this.blockComponent.__component == 'text-content.text-section'" :blockData="this.blockComponent" />
        <CardsWithFilter v-if="this.blockComponent.__component == 'blogs.blog-cards-with-filter'"  />
        <OurApproach v-if="this.blockComponent.__component == 'explore.our-approach'" :blockData="this.blockComponent" />
        <ContentColumns v-if="this.blockComponent.__component == 'text-content-blocks.content-block'" :blockData="this.blockComponent" />
        <ContentWithImage v-if="this.blockComponent.__component == 'text-content-blocks.content-with-image'" :blockData="this.blockComponent" />
        <MeetTheTeam v-if="this.blockComponent.__component == 'explore.meet-the-team'" :blockData="this.blockComponent" />
    </div>
</template>

<script>

export default {
    name: 'BlockBuilder',
    props: {
        ID: Number,
        blockComponent: Object
    },
}
</script>


