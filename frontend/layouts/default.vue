<template>
  <v-app dark>
    <v-main>
      <v-container>
        <!-- <SiteIntro /> -->
        <Header v-on:page-open="headerAction()"/>
        
        <div :class="this.pageState">
          <div class="drag-map" > 
            <div class="drag-map__city-absolute">
              <div class="drag-map__city" ref="dragMapCity">
                <div class="drag-map__container" ref="dragMap__container" id="drag">
                  <!-- <CityMapSVG /> -->

                    <CityMapCards v-for="(item, index) in this.mapButton" :key="index" :cardData="item" />
             
                </div>
              </div>
            </div>
          </div>
          <div class="page-modal__container" >
            <div class="page-modal">
              <div class="page-modal__back-to-map" v-on:click="backToMap()">
                <div class="inside">
                  <Icon icon="arrowLeft" /> <p>MWEK City</p>
                </div>
              </div>
              <div class="page_scroller">
                <Nuxt />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import gsap from 'gsap';
export default {
  name: 'DefaultLayout',
  data () {
    return {
      mapButton: '',
      pageState: 'map-open'
    }
  },
  methods: {
    async getMapButtons() {
      const mapButton = await fetch(
          this.$store.state.apiroute.url + '/api/city-map?[populate][theCityMapButtons][populate]=*'
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      this.mapButton = mapButton.data.attributes.theCityMapButtons;
    },
    headerAction(){
      console.log('helo helo hleo helo');
      this.pageState = 'page-open'
    },
    backToMap(){
      this.pageState = 'map-open';
      this.$router.push('/'); 
    },
  },
  beforeMount(){
    // this.gpuFunc();
  },
  mounted(){
    this.getMapButtons();
    

    this.draggable = new Draggable(this.$refs.dragMap__container, {
      bounds: this.$refs.dragMapCity,
      throwProps: true,      
      callbackScope: this,
      allowEventDefault: true
    });

    /* 
    Setup: wrap your content <div> in another <div> that will serve as the viewport.
    Call this function FIRST (before you create your ScrollTriggers); it sets the 
    default "scroller" for you (otherwise it'd be the window/body, but it should be 
    the content <div>) 
    */
    // smoothScroll("html");

    // smoother.scrollTo("html", true, "center center");
  }
}
</script>

<style lang="scss">
  @import "~/assets/variables.scss"; 
</style>