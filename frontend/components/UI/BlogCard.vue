<template>
    <div class="blog-card" :class="this.isActive" ref="blogCard">
        <NuxtLink :to='this.cardUrl'>
            <div class="blog-card__image" :style="{ backgroundImage: `url(${this.$store.state.apiroute.url + this.cardData.attributes.featured_image.data.attributes.url})`}">
                <!-- <img :src="this.$store.state.apiroute.url + this.cardData.attributes.featured_image.data.attributes.url" /> -->
            </div>
            <div class="blog-card__info">
                <h4>{{ this.cardData.attributes.Title }}</h4>
                <p>{{ this.cardData.attributes.content.substring(0, 50) }}</p>
            </div>
        </NuxtLink>
    </div>
    
</template>

<script>

import gsap from "gsap"

export default {
    name: 'BlogCard',
    props: {
        cardData: Array,
        countIndex: Number 
    },
    
    data(){
        return {
            formattedArray: [],
            isActive: '',
            cardUrl: ''
        }
    },

    methods: {
    },
    mounted(){  
        console.log('this.key', this.countIndex);  
        if(this.countIndex < 3){
            this.isActive = 'active'
        } 
        setTimeout(function () { 
            let tl = gsap.to(this.$refs.blogCard,{
                scrollTrigger: {
                    trigger: this.$refs.blogCard,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    toggleClass: "active",
                    // addName: 'active',
                },
            });
        }.bind(this), 2000);


        console.log('this.cardData', this.cardData);

        if(this.cardData.attributes.PrimaryCategory.category.data){
            this.cardUrl = "/blog/" + this.cardData.attributes.PrimaryCategory.category.data.attributes.slug + "/" + this.cardData.attributes.slug
        }else{
            this.cardUrl = "/blog/" + this.cardData.attributes.slug
        }
        
    }
}
</script>


