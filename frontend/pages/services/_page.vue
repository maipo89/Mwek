<template>
    <div class="page-content service-page">
        <h1 class="page-content__title">{{ this.pageContent.title }}</h1>
        <BlockBuilder v-for="(item, index) in this.blocks" :key="index" :blockComponent="item" />
        <ContactFooter v-if="this.contactDetails.data" :contactItems="this.contactDetails"/>
        <BackButton />
    </div>
</template>

<script>
export default {
    
  data(){
    return {
      page: this.$route.params.page,
      pageID:'',
      renderPage: false,
      pageContent: '',
      blocks: '',
      contactDetails: false
    }
  },
  methods: {
    async asyncData() {
        const thePageID = await fetch(
            this.$store.state.apiroute.url + '/api/services?filters[slug]=' + this.page 
            // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
        ).then((res) => {
            // can set up 404 redirection here
        return res.json();
        });
        var pageID = thePageID.data[0].id;
      
        console.log('pageID', pageID);

        const thePageData = await fetch(
          this.$store.state.apiroute.url + '/api/services/' + pageID + '?populate=deep,4'
            ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });
        this.pageContent = thePageData.data.attributes;
            this.blocks = thePageData.data.attributes.dynamic_content
            console.log('thePageDatasssssss', thePageData);
        // console.log(this.$router.params);

        const contactData = await fetch(
          'http://localhost:1337/api/contact?populate=*'
            ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });

        if(contactData.data){
            // console.log(contactData);
            this.contactDetails = contactData
        }
    }
  },

  mounted(){
    this.asyncData();
  },

//   updated(){
//     this.asyncData();
//   }
  
}
</script>
