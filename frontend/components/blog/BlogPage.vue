<template>
  <div class="blog" :class="this.blogClass"> 
    <h1>Blog</h1>
    <div class="blog__filter-container">
      <DropDown :options="this.cats" v-on:dropdownEvent="changeCat($event)" />
    </div>
    <div class="blog__container">
      <BlogCard v-for="(item, index) in this.filterdBlogs" :key="index" :countIndex="index" :cardData="item" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  name: 'BlogPage', 

  props: {
      theBlogsId: Object
  },    

  data(){
    return {
      blogData: '',
      blogIDs: [],
      cats: [],
      blogClass: '',
      filterdBlogs: ''
    }
  },

  methods: {
    async asyncData() {

        console.log('this.theBlogsId', this.theBlogsId);

        const theBlogsID = await fetch(
          this.$store.state.apiroute.url + '/api/blogs?filters[categories][slug]=' + this.theBlogsId

        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });
       

        theBlogsID.data.forEach(element => {
            this.blogIDs.push(element.id);
        });

        console.log('theBlogsID', theBlogsID)

    //   console.log('theBlogsssss', theBlogs);

        const theBlogs = await fetch(
          this.$store.state.apiroute.url + '/api/blogs?populate=deep'

        ).then((res) => {
            // can set up 404 redirection here
            console.log('theblogs', res);
            return res.json();

        });

        // console.log('theBlogs', theBlogs);

        const idStore = this.blogIDs;
        var filterdArray = theBlogs.data.filter(function(e){
            return idStore.includes(e.id)
        });

        console.log('filterdArray', filterdArray);

        this.filterdBlogs = filterdArray; 


    },

    async getCategories(){
        const theCats = await fetch(
            this.$store.state.apiroute.url + '/api/categories'

        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });

        console.log('theCats', theCats);
        theCats.data.forEach(element => {
            this.cats.push( { option: element.attributes.name , value: element.attributes.slug } ) 
        });;
    },
    async allBlogs(){
        const theBlogs = await fetch(
            this.$store.state.apiroute.url + '/api/blogs?populate=deep'
        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });

        this.filterdBlogs = theBlogs.data
    },
    changeCat(value){

        this.blogClass = '';
        setTimeout(function () {    
            if(value === 'all'){
                this.$router.push('/blog');
            }else{
                this.$router.push('/blog/' + value);
            }
        }.bind(this), 1000)
    },

    animateIn(){
       this.blogClass = 'active'
    }

  },

  mounted() {
    
    if(this.theBlogsId){
        this.asyncData();
    }else{
        this.allBlogs();
    }
    this.getCategories();

    console.log('this.filterdBlogs', this.filterdBlogs);
    setTimeout(function () { this.animateIn() }.bind(this), 500);


    // gsap.utils.toArray(".blog-card").forEach((element, i) => {
    //     gsap.set(element, {opacity:0})
    //     gsap.from(element, {
    //         y: 200,
    //         scrollTrigger: {
    //         trigger: element,
    //         start: "top 100%"
    //         }
    //     });
    // });
    
    // ScrollTrigger.batch(".blog-card", {
    //     onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 4]}, overwrite: true}),
    //     onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
    // });
    // ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".blog-card", {y: 0}));

  },
  
}
</script>
