<template>
  <div class="page-content">
    <BlockBuilder v-for="(item, index) in this.blocks" :key="index" :blockComponent="item" />
  </div>
</template>

<script>

import gsap from 'gsap';

export default {
    
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
          'http://localhost:1337/api/pages?filters[slug]=' + this.page
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      
      var pageID = thePageID.data[0].id;

      const thePageData = await fetch(
          'http://localhost:1337/api/pages/' + pageID + '?populate=deep'
        ).then((res) => {
        // can set up 404 redirection here
        return res.json();
      });

      console.log('thePageData 888', thePageData);

      if(thePageData.data.attributes.dynamic_content){
        this.blocks = thePageData.data.attributes.dynamic_content
      }
      // console.log(this.$router.params);
    }
  },

  mounted(){
    this.asyncData();
    console.log('this.$route.params.page', this.page);

    // Scrollbar.init(document.querySelector('body'), 
    //   {
    //     damping: 0,
    //     thumbMinSize: 0,
    //   }
    // );

    // this.smoother = ScrollSmoother.create({ 
    //   wrapper: 'body', 
    //   content: '.page-content' 
    // })

  },

}
</script>


