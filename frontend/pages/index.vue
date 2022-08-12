<template>
  <div class="home-page page-modle">
    <BlockBuilder v-for="(item, index) in this.blocks" :key="index" :blockComponent="item" />
  </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';

export default {
  name: 'HomePage', 
  data(){
    return {
      page: this.$route.params.page,
      pageID:'',
      blocks: ''
    }
  },
  methods: {
    async asyncData() {
      const thePageID = await fetch(
          'http://localhost:1337/api/pages?filters[isHome]=true'
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      var pageID = thePageID.data[0].id;

      const thePageData = await fetch(
          'http://localhost:1337/api/pages/' + pageID + '?populate[dynamic_content][populate]=*'
        ).then((res) => {
        // can set up 404 redirection here
        return res.json();
      });

      // console.log('thePageData 0000', thePageData);
      if(thePageData.data.attributes.dynamic_content){
        this.blocks = thePageData.data.attributes.dynamic_content
      }
      // console.log(this.$router.params);
    },

    async getMapButtons() {
      const mapButton = await fetch(
          'http://localhost:1337/api/city-map?populate=*'
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      console.log('mapButton', mapButton);
    },
    
    dragFunc(){
          const {
        dragMap__container
      } = this.$refs
      this.$Draggable.create(this.$refs.dragMap__container, {type:"x,y", edgeResistance:0.65, inertia:true});

    }
  },

  mounted(){
    console.log('this.dragElm', this.$refs.dragMap__container);

    // window.addEventListener('load', () => {
    //    this.dragFunc();
    // })

    this.asyncData();

    // console.log('this.$refs.dragMapCity', this.$refs.dragMapCity);

    // this.$gsap.to(this.$refs.dragMap__container, {
    //   Draggable: {}
    // })

   // this.$gsap.Draggable.create(this.$refs.dragMap__container, {type:"x,y", edgeResistance:0.65, bounds:"#container", inertia:true});
    
  }
  
}
</script>

