<template>
  <div class="blog" :class="this.blogClass"> 
    <div class="blog__filter-container">
      <DropDown :options="this.cats" v-on:dropdownEvent="changeCat($event)" :placeHolder="this.$route.params.cat"/>
    </div>
    <div class="blog__container">
      <BlogCard v-for="(item, index) in this.filterdBlogs" :key="index" :countIndex="index" :cardData="item" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
export default {
  name: 'blog', 

  data(){
    return {
      blogData: '',
      blogIDs: [],
      cats: [],
      blogClass: '',
    }
  },

  methods: {
    async asyncData() {
        const theBlogsID = await fetch(
          this.$store.state.apiroute.url + '/api/blogs?filters[categories][slug]=' + this.$route.params.cat

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
          this.$store.state.apiroute.url + '/api/blogs?populate=*'

        ).then((res) => {
            // can set up 404 redirection here
            return res.json();
        });

        // console.log('theBlogs', theBlogs);

        const idStore = this.blogIDs;
        var filterdArray = theBlogs.data.filter(function(e){
            return idStore.includes(e.id)
        });

        console.log('filterdArray', filterdArray);

        this.filterdBlogs = filterdArray; 

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
    this.asyncData();
    console.log('this.filterdBlogs', this.filterdBlogs);
    setTimeout(function () { this.animateIn() }.bind(this), 500)
  },
  
}
</script>
