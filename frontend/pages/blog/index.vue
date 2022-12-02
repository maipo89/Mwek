<template>
  <div>
    <!-- <div class="blog" :class="this.blogClass"> 
      <div class="blog__filter-container">
        <DropDown :options="this.cats" v-on:dropdownEvent="changeCat($event)"/>
      </div>
      <div class="blog__container">
        <BlogCard v-for="(item, index) in this.blogData.data" :key="index" :countIndex="index" :cardData="item" />
      </div>
    </div> -->
    <BlogPage />
    <!-- <Subscription /> -->
    <SubscriptionSection />
    <BackButton />
  </div>
</template>

<script>
// import axios from 'axios';
// import gsap from 'gsap';
export default {
  name: 'blog', 

  // data(){
  //   return {
  //     blogData: '',
  //     cats: [],
  //     blogClass: 'dormant',
  //   }
  // },

  // methods: {
  //   async asyncData() {
  //     const theBlogs = await fetch(
  //         this.$store.state.apiroute.url + '/api/blogs?populate=deep'

  //     ).then((res) => {
  //       // can set up 404 redirection here
  //       return res.json();
  //     });

  //     this.blogData = theBlogs

  //     console.log('theBlogs', theBlogs);

  //     const theCats = await fetch(
  //         this.$store.state.apiroute.url + '/api/categories'

  //     ).then((res) => {
  //       // can set up 404 redirection here
  //       return res.json();
  //     });

  //     console.log('theCats', theCats);
  //     theCats.data.forEach(element => {
  //       this.cats.push( { option: element.attributes.name , value: element.attributes.slug } );

  //       console.log('this.cats',this.cats);
  //     });;

  //   },

  //   changeCatDelay(){
  //     this.$router.push('/blog/' + value);
  //   },

  //   changeCat(value){
  //     this.blogClass = '';
  //     setTimeout(function () {    this.$router.push('/blog/' + value) }.bind(this), 1000)
  //   },

  //   animateIn(){
  //      this.blogClass = 'active'
  //   }

  // },

  // mounted() {
  //   this.asyncData();
  //   setTimeout(function () { this.animateIn() }.bind(this), 500)
  // },
  
}
</script>
