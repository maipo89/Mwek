<template>
  <div class="page-content" v-if="this.renderPage">
    <BlockBuilder v-for="(item, index) in this.blocks" :key="index" :blockComponent="item" />
    <ContactFooter :contactItems="this.contactDetails"/>
  </div>
</template>

<script>

import gsap from 'gsap';

export default {
    
  data(){
    return {
      page: this.$route.params.page,
      pageID:'',
      blocks: '',
      renderPage: false,
      contactDetails: null,
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
      const contactData = await fetch(
          'http://localhost:1337/api/contact?populate=*'
          ).then((res) => {
          // can set up 404 redirection here
          return res.json();
      });

      if(contactData.data.attributes.ContactInfo){
        // console.log(contactData);
        this.contactDetails = contactData
      }
      
    },
  },
  beforeMount(){
     this.asyncData();
  },

  mounted(){
   
    console.log('this.$route.params.page', this.page);

    // Scrollbar.init(document.querySelector('body'), 
    //   {
    //     damping: 0,
    //     thumbMinSize: 0,
    //   }
    // );

    if(this.page.length > 1){
      setTimeout(function () {  
        this.renderPage = true;
      }.bind(this), 1000)
    }

    // this.smoother = ScrollSmoother.create({ 
    //   wrapper: 'body', 
    //   content: '.page-content' 
    // })

  },

}
</script>


