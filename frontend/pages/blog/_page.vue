<template>
  <BlockBuilder v-if="this.renderPage" :ID="this.pageID" />
</template>

<script>
export default {
    
  data(){
    return {
      page: this.$route.params.page,
      pageID:'',
      renderPage: false,
      contactDetails: false
    }
  },
  methods: {
    async asyncData() {
      const thePageID = await fetch(
          this.$store.state.apiroute.url + '/api/blogs?filters[slug]=' + this.page 
          // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
      ).then((res) => {
        // can set up 404 redirection here
      return res.json();
      });
      var pageID = thePageID.data[0].id;

      
      console.log('pageID', pageID);

      const thePageData = await fetch(
          this.$store.state.apiroute.url + '/api/blogs/' + pageID + '?populate=deep,5'
        ).then((res) => {
        // can set up 404 redirection here
        return res.json();
      });

      console.log('thePageDatasssssss', thePageData);
      // console.log(this.$router.params);

      const contactData = await fetch(
          this.$store.state.apiroute.url + '/api/contact?populate=*'
          ).then((res) => {
          // can set up 404 redirection here
          return res.json();
      });

      if(contactData.data.attributes.ContactInfo){
        // console.log(contactData);
        this.contactDetails = contactData
      }

    }
  },

  mounted(){
    this.asyncData();
  },

  updated(){
   console.log('this.$route.params.page', this.page);
    this.asyncData();
  }
  
}
</script>
