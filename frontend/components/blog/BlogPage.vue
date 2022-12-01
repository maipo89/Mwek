<template>
  <div class="blog" :class="this.blogClass"> 
    <h1>Blog</h1>
    <div class="blog__filter-container">
      <DropDown v-if="this.theBlogsId" :options="this.cats" :placeHolder="this.theBlogsId" v-on:dropdownEvent="changeCat($event)" />
      <DropDown v-else :options="this.cats" placeHolder="All Posts" v-on:dropdownEvent="changeCat($event)" />
      
    </div>
    <div class="blog__container" ref="blogContainer">
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
      filterdBlogs: [],
      pagination: { bottom: 0, top: 6 },
      amountToPaginate: 6
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
      const theBlogs = await fetch(
        this.$store.state.apiroute.url + '/api/blogs?populate=deep'
        ).then((res) => {
          // can set up 404 redirection here
          console.log('theblogs', res);
          return res.json();
      });

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
    
    // async firstTimePosts(id){
    //   const thePosts = await fetch(
    //     this.$store.state.apiroute.url + '/api/blogs/' + id + '?populate=deep,4'
    //   ).then((res) => {
    //       // can set up 404 redirection here
    //     return res.json();
    //   });
    //   //this.filterdArray.push(thePosts);
    // },

    async allBlogs(){
        // const theBlogs = await fetch(
        //     this.$store.state.apiroute.url + '/api/blogs?[populate][featured_image]?pagination[start]=0&pagination[limit]=6'
        // ).then((res) => {
        //     // can set up 404 redirection here
        //     return res.json();
        // });
        const theBlogs = await fetch(
            this.$store.state.apiroute.url + '/api/blogs?populate=deep,4'
        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });
        console.log('theBlogs', theBlogs);

        

        // theBlogs.data.forEach(element => {
        //   this.firstTimePosts(element.id);
        // });
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
    },
    // async loadMore(){
    //   /// this.filterdBlogs
    //   //       pagination: { bottom: 0, top: 6 },
    //   // amountToPaginate: 6

    //   this.pagination.bottom = this.pagination.bottom + amountToPaginate;
    //   this.pagination.top = this.pagination.top + amountToPaginate;

    //   const theBlogs = await fetch(
    //       this.$store.state.apiroute.url + '/api/blogs?pagination[start]=' + this.pagination.bottom + '&pagination[limit]=' + this.pagination.top + ''
    //   ).then((res) => {
    //       // can set up 404 redirection here
    //       return res.json();
    //   });

    //   this.filterdBlogs.append(theBlogs);

    //   alert('cubes');

    // }

  },

  mounted() {

    console.log('this.theBlogsId', this.theBlogsId);

    var thisContext = this;
    var apiStore = this.$store.state.apiroute.url
    
    this.getCategories();

    console.log('this.filterdBlogs', this.filterdBlogs);
    setTimeout(function () { this.animateIn() }.bind(this), 500);


    var allBlogs = async function(){
        const theBlogs = await fetch(
            apiStore + '/api/blogs?[populate][featured_image]?pagination[start]=0&pagination[limit]=6'
        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });

        console.log('theBlogs', theBlogs);

        theBlogs.data.forEach(element => {
          console.log(element);
          firstTimePosts(element.id);
        });
        //this.filterdBlogs = theBlogs.data
    }

    var firstTimePosts = async function(id){
        const thePosts = await fetch(
        apiStore + '/api/blogs/' + id + '?populate=deep,4'
      ).then((res) => {
          // can set up 404 redirection here
        return res.json();
      });

      console.log('thePosts', thePosts);

      thisContext.filterdBlogs.push(thePosts.data);
    }



    // this loads posts by ID for the lazy load
    var loadPosts = async function(id){
      var theBlogPost = await fetch(
        apiStore + '/api/blogs/' + id + '?populate=deep,4'
      ).then((res) => {
          // can set up 404 redirection here
          return res.json();
      });
      console.log(theBlogPost);
      thisContext.filterdBlogs.push(theBlogPost.data);
    }

    var loadMore = async function(){
      /// this.filterdBlogs
      //       pagination: { bottom: 0, top: 6 },
      // amountToPaginate: 6

      thisContext.pagination.bottom = thisContext.pagination.bottom + thisContext.amountToPaginate;
      thisContext.pagination.top = thisContext.pagination.top + thisContext.amountToPaginate;

      const theBlogs = await fetch(
        apiStore + '/api/blogs?[populate][featured_image]?pagination[start]=' + thisContext.pagination.bottom + '&pagination[limit]=' + thisContext.pagination.top + ''
      ).then((res) => {
          // can set up 404 redirection here
          return res.json();
      });


      console.log('thisContext.pagination.bottom',thisContext.pagination.bottom + ' - '  + thisContext.pagination.top);

      console.log('theBlogs', theBlogs);
      // thisContext.filterdBlogs.push(theBlogs);

      theBlogs.data.forEach(element => {
        loadPosts(element.id);
      });

      ScrollTrigger.refresh()

      // alert('cubes');

    }

    // const gooba = gsap.to(this.$refs.blogContainer,{
    //     scrollTrigger: {
    //         trigger: this.$refs.blogContainer,
    //         start: "center center",
    //         end: "bottom top",
    //         markers: true,
    //         onEnter: loadMore
    //     },
    // });


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

    if(this.theBlogsId){
        this.asyncData();
    }else{
        // this.allBlogs();
        this.allBlogs();

    }

  },
  
}
</script>
