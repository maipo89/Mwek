<template>
  <v-app dark>
    <v-main>
      <v-container>
        <div class="intro">

        </div>
        <Header v-on:page-open="headerAction()"/>
        <div :class="this.pageState">
          <div class="drag-map" > 
            <div class="drag-map__city-absolute">
              <div class="drag-map__city" ref="dragMapCity">
                <div class="drag-map__container" ref="dragMap__container" id="drag">
                  <CityMapSVG />
                  <!-- <img src="/images/LightCity.jpg" /> -->
                  <!-- <div class="drag-map__buttons"> -->
                    <CityMapCards v-for="(item, index) in this.mapButton" :key="index" :cardData="item" />
                  <!-- </div> -->
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
    }
  },
  mounted(){
    this.getMapButtons();

    this.draggable = new Draggable(this.$refs.dragMap__container, {
      bounds: this.$refs.dragMapCity,
      throwProps: true,      
      callbackScope: this,
      allowEventDefault: true
    });

    // gsap.to(".page-modal", {
    //   scrollTrigger: {
    //     trigger: '.page_scroller',
    //     strat: 'bottom top',
    //     end: 'bottom bottom',
    //     markers: true,
    //     scroller: '.page-modal',
    //   },
    // });
  }
}
</script>

<style lang="scss">
  @import "~/assets/variables.scss"; 
</style>