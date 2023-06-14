<template>
<div>
  <!-- <div class="blog" :class="this.blogClass"> 
    <div class="blog__filter-container">
      <DropDown :options="this.cats" v-on:dropdownEvent="changeCat($event)" :placeHolder="this.$route.params.cat"/>
    </div>
    <div class="blog__container">
      <BlogCard v-for="(item, index) in this.filterdBlogs" :key="index" :countIndex="index" :cardData="item" />
    </div>
  </div> -->
  <BlogPage :theBlogsName="this.$route.params.cat" />
  <SubscriptionSection />
</div>
</template>

<script>
// import axios from 'axios';
import gsap from 'gsap';
export default {
  name: 'blog', 

  async asyncData({ error, params, app: { store } }) {

    const { apiroute } = store.state;

    console.log('props', params.page);
    console.log('cat', params.cat);

    try{
      const theBlogsNameReady = await fetch(
        apiroute.url + '/api/blogs?filters[PrimaryCategory][category][slug]=' + params.cat

      ).then((res) => {
          // can set up 404 redirection here
          return res.json();
      });

      console.log('theBlogsName', theBlogsNameReady);

    }catch(e){
      console.log('massive error');
    }

  },
  
}
</script>
