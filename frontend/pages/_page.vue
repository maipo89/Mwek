<template>
  <div class="page-content" v-if="this.renderPage">
    <h1 class="page-content__title">{{ this.pageContent.title }}</h1>
    <BlockBuilder v-for="(item, index) in this.blocks" :key="index" :blockComponent="item" />
    <ContactFooter :contactItems="this.contactDetails"/>
    <!-- <OnqorSEO :seoData="this.pageContent.seo" /> -->
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
      pageContent: '',
      renderPage: false,
      contactDetails: null,
    }
  },
  async asyncData({ error, params, app: { store } }) {

    const { apiroute } = store.state
    const { page } = params 
  try{
    const thePageID = await fetch(
      apiroute.url + '/api/pages?filters[slug]=' + page
        // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
    ).then((res) => {
      // can set up 404 redirection here
    return res.json();
    });
    
    var pageID = thePageID.data[0].id;

    const thePageData = await fetch(
        apiroute.url + '/api/pages/' + pageID + '?populate=deep,4'
      ).then((res) => {
      // can set up 404 redirection here
      return res.json();
    });

    console.log('thePageData 888', thePageData);
    // if(thePageData.data.attributes.dynamic_content){
    //   this.blocks = thePageData.data.attributes.dynamic_content
    // }

    // console.log(this.$router.params);
    const contactData = await fetch(
        apiroute.url + '/api/contact?populate=*'
        ).then((res) => {
        // can set up 404 redirection here
        return res.json();
    });

    // if(contactData.data.attributes.ContactInfo){
    //   // console.log(contactData);
    //   this.contactDetails = contactData
    // }
    return {
      pageContent: thePageData.data.attributes,
      blocks: thePageData.data.attributes.dynamic_content,
      contactDetails: contactData
    }
    }catch(e){
       error({ statusCode: 404, message: "Page not found" });
    }
  },
  methods: {

    // async asyncData({ error, params, app: { store } }) {

    //   const { page } = params;
    //   const { apiroute } = store.state;

    //   try{ 
    //     const thePageID = await fetch(
    //         apiroute.url + '/api/pages?filters[slug]=' + page
    //         // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
    //     ).then((res) => {
    //       // can set up 404 redirection here
    //     return res.json();
    //     });
        
    //     var pageID = thePageID.data[0].id;

    //     const thePageData = await fetch(
    //         apiroute.url + '/api/pages/' + pageID + '?populate=deep,4'
    //       ).then((res) => {
    //       // can set up 404 redirection here
    //       return res.json();
    //     });

    //     console.log('thePageData 888', thePageData);

    //     // if(thePageData.data.attributes.dynamic_content){
    //     //   this.blocks = thePageData.data.attributes.dynamic_content
    //     // }

    //     // console.log(this.$router.params);
    //     const contactData = await fetch(
    //         this.$store.state.apiroute.url + '/api/contact?populate=*'
    //         ).then((res) => {
    //         // can set up 404 redirection here
    //         return res.json();
    //     });

    //     // if(contactData.data.attributes.ContactInfo){
    //     //   this.contactDetails = contactData
    //     // }

    //     return { 
    //       pageContent: thePageData.data.attributes,
    //       block: thePageData.data.attributes.dynamic_content,
    //       contactDetails: contactData
    //     }

    //   }catch(e){
        
    //   }
    // },
  },
  beforeMount(){
    //  this.asyncData();
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
    this.renderPage = true;
    // this.smoother = ScrollSmoother.create({ 
    //   wrapper: 'body', 
    //   content: '.page-content' 
    // })

    
  },

}
</script>


