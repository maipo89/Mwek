<template>
    <div class="meet-the-team">
        <div class="meet-the-team__container">
            <h2>MEET THE TEAM</h2>
            <VueSlickCarousel @beforeChange="currentSlide" :waitForAnimate="false" :infinite="true" :speed="1000" :initialSlide="this.blockData.TeamCubesSlider.length / 2" :arrows="false" :dots="this.doWeHaveDots" :centerMode="true" centerPadding="0px" :slidesToShow="this.slideNumber" :slidesToScroll="1" :focusOnSelect="true" ref="carousel">
                <div v-for="(item, index) in this.blockData.TeamCubesSlider" :key="index" class="meet-the-team__slide">
                    <TeamCube :teamInfo="item" :activeCube="currentIndex" :teamIndex="index" :totalTeam="blockData.TeamCubesSlider.length"/>
                </div>
            </VueSlickCarousel>
            <div class="meet-the-team__buttons">
                <div class="button button--prev" v-on:click="prevItem()">
                    <Icon icon="chevronLeft"/>
                </div>
                <div class="button" v-on:click="nextItem()">
                    <Icon icon="chevronRight"/>
                </div>
            </div>
        </div>
    </div>
</template>



<script>

    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    export default {
        name: 'MeetTheTeam',

        props: {
            blockData: Object,
        },
        components: { VueSlickCarousel },
        data(){
            return {
                currentIndex: this.blockData.TeamCubesSlider.length / 2,
                doWeHaveDots: false,
                slideNumber: 5
            }
        },
        methods: {
            nextItem(){
                if(this.currentIndex < this.blockData.TeamCubesSlider.length - 1){
                    this.$refs.carousel.next();
                }
            },
            prevItem(){
                if(this.currentIndex > 0){
                    this.$refs.carousel.prev();
                }
            },
            currentSlide(slideIndex,nextIndex){
                console.log('slideIndex',slideIndex);
                console.log('nextIndex', nextIndex)
                this.currentIndex = nextIndex;
            }
        },
        beforeMount(){
            require('@/assets/scss/explore/meet-the-team.scss');
        },
        mounted(){
            console.log(window.innerWidth)
            if(window.innerWidth < 900){
                this.slideNumber = 3;
                this.doWeHaveDots = true;
            }
        }
    }
</script>
