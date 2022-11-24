<template>
  <v-app dark>
    <v-main>
      <v-container>
        <!-- <SiteIntro /> -->
        <Header   v-on:page-open="headerAction()" v-on:customLink="customRoute($event)" />
        <div :class="[this.pageState, this.thePageClass]">
          <div class="drag-map" > 
            <div class="drag-map__background"></div>
            <CityMapSVG v-on:explore="mapRouts('explore')" v-on:clientService="mapRouts('clientService')" v-on:candidateService="mapRouts('candidateService')" v-on:blog="mapRouts('blog')" v-on:contact="mapRouts('contact')" />
          </div>
          <div class="page-modal__container" >
            <div class="page-modal">
              <div class="page-modal__back-to-map" v-on:click="backToMap()">
                <div class="inside">
                  <Icon icon="arrowLeft" /> <p>MWEK City</p>
                </div>
              </div>
              <div class="page-modal__back-to-map page-modal__back-to-map--blog">
                <NuxtLink to='/blog'>
                  <div class="inside">
                    <Icon icon="arrowLeft" /> <p>Blog</p>
                  </div>
                </NuxtLink>
              </div>
              <div class="page_scroller"  :class="this.transitionClass">
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
      //pageState: 'map-open',
      pageState: 'page-open',
      // renderMap: true ,
      renderMap: false ,
      pinMe: '',
      thePageClass: '',
      transitionClass: '',

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
      this.pageState = 'page-open';
      setTimeout(function () {
        this.renderMap = false;
      }.bind(this), 2100)
    },

    backToMap(){
      this.pageState = 'map-open';
      this.$router.push('/'); 
      this.renderMap = true;
    },

    pageClass(){
        const firstPath = location.pathname.split('/')[1];
        console.log('siteUrl', location);
        this.thePageClass = firstPath + '-page-' + location.pathname.replace(/[^/]/g, "").length;
    },

    mapRouts(theRoute){
      this.headerAction();
      //this.$router.push('/explore');

      switch (theRoute) {

        case 'explore':
          this.$router.push('/explore');
          break;

        case 'clientService':
          this.$router.push('/client-services');
          break;

        case 'candidateService':
          this.$router.push('/our-services');
          break;

        case 'blog':
         // this.$router.push('/our-services')
          this.$router.push('/blog');
          break;

        case 'contact':
         // this.$router.push('/our-services')
          this.$router.push('/contact');
          break;
      
        default:
          break;
      }
    },
    customRoute(event){
      this.transitionClass = 'page-change'
      var thisContext = this;
      setTimeout(function(){
        thisContext.$router.push(event);
      }, 1000); //Time before execution
    }
  },

  mounted(){
    this.getMapButtons();
    
    console.log('this.$route.params.page', this.$route.params.page);

    this.pageClass();

    if(this.$route.params.page || this.thePageClass == 'blog-page-1'){
      this.pageState = 'page-open';
      this.renderMap = false;
    }else{
      this.renderMap = true;
      this.pageState = 'map-open';
    }

   

    // if(this.renderMap){
    //   this.draggableMapFunction()
    // }
    
  },
  watch: {
    $route (to, from){
        this.pageClass()
        console.log('i am the to', to);
        var thisContext = this;
      setTimeout(function(){
        thisContext.transitionClass = '';
      }, 1000); //Time before execution
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/variables.scss"; 
</style>