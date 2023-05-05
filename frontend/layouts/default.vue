<template>
  <v-app dark>
    <SiteIntro />
    <v-main>
      <v-container>
        <Header v-on:page-open="headerAction()" :theActiveHeader="this.activeHeader" v-on:goMap="backToMap()" v-on:customLink="customRoute($event)" />
        <div :class="[this.pageState, this.thePageClass]">
          <CityMapPopUp />
          <div class="drag-map" > 
            <div class="drag-map__background">
            </div>
            <CityMapSVG v-on:explore="mapRouts('explore')" v-on:clientService="mapRouts('clientService')" v-on:candidateService="mapRouts('candidateService')" v-on:blog="mapRouts('blog')" v-on:contact="mapRouts('contact')" />
            <BlimpMapSVG />
          </div>
          <div class="page-modal__container" >
            <div class="page-modal button-top">
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
              <div class="page-modal__back-to-map page-modal__back-to-map--services">
                <NuxtLink to='/our-services'>
                  <div class="inside">
                    <Icon icon="arrowLeft" /> <p>Services</p>
                  </div>
                </NuxtLink>
              </div>
              <div v-if="this.scrolltos" class="scroll-toos">
                <div v-for="(item, index) in this.scrolltos" class="scroll-toos__button" :key="index">
                  <p v-on:click='scrollTo("team")'>Our team</p>
                </div>
              </div>
            </div>
            <div class="page-modal button-bottom">
              <BackButton />
            </div>
            <div id="page-modal" class="page-modal">
              <div class="page_scroller"  :class="this.transitionClass">
                <Nuxt />
              </div>
            </div>
          </div>
        </div>
        <Footer v-on:footerClick="headerAction($event)" />
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
      pageReady: false,
      scrolltos: '',
      activeHeader: 5

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

    async scrollButton(){
      const thePageID = await fetch(
          this.$store.state.apiroute.url + '/api/pages?filters[slug]=' + this.$route.params.page
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      

      if(thePageID.data[0]){
        var pageID = thePageID.data[0].id;

        const theScrollTo = await fetch(
            this.$store.state.apiroute.url + '/api/pages/' + pageID + '?populate=sectionSrollTo'
          ).then((res) => {
          // can set up 404 redirection here
          return res.json();
        });
       // console.log('theScrollTo', theScrollTo);
        this.scrolltos = theScrollTo.data.attributes.sectionSrollTo;
      }else{
        this.scrolltos = false;
      }
    },

    scrollTo(scrollId){
      document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
    },

    headerAction(index){
      this.pageState = 'page-open';
      //  alert('hello');
    //  console.log('event', index);
      // alert(index);
      if(index){
        this.activeHeader = index;
      }else if(index === 0){
        this.activeHeader = index;
      }
      setTimeout(function () {
        this.renderMap = false;
      }.bind(this), 2100)
    },

    backToMap(){
      this.pageState = 'map-open';
      this.$router.push('/'); 
      this.renderMap = true;
      this.activeHeader = 5
      // var headerItems = document.getElementsByClassName("header__item")
      // headerItems.forEach(function(item) {
      //     item.classList.remove("active");
      // });
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
          this.activeHeader = 1;
          break;

        case 'clientService':
          this.$router.push('/client-services');
          this.activeHeader = 0;
          break;

        case 'candidateService':
          this.$router.push('/our-services');
          this.activeHeader = 0;
          break;

        case 'blog':
         // this.$router.push('/our-services')
          this.$router.push('/blog');
          this.activeHeader = 2;
          break;

        case 'contact':
         // this.$router.push('/our-services')
          this.$router.push('/contact');
          this.activeHeader = 3
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
    },
    firstActive(){

      console.log('this.$route.query', this.$route, this.$route.path);    

      switch (this.$route.path) {

        case '/explore':
          this.activeHeader = 1;
          break;

        case '/our-services':
          this.activeHeader = 0;
          break;

        case '/client-services':
          this.activeHeader = 0;
          break;

        case '/blog':
          this.activeHeader = 2;
          break;

        case '/contact':
          this.activeHeader = 3;
          console.log('this.activeHeader', this.activeHeader);
          // alert('contact');

          break;
      
        default:
          break;
      }
    }
  },

  mounted(){
    this.getMapButtons();
    this.scrollButton();
    this.firstActive();
    
    if(this.$route.params.page){
      // alert('hello ofkrh');
      
      setTimeout(function () {
        this.headerAction();
      }.bind(this), 2100)
    }

    setTimeout(function(){
      this.pageReady = true;
    }.bind(this), 1000); 
  

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
        this.pageClass();
        this.scrollButton();
     //   console.log('i am the to', to);
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

