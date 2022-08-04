<template>
    <div class="header">
        <div class="header__container">
            <img :src="this.theHeaderLogo" />

            <div class="header__nav-container">
                <div v-for="(item, index) in this.navItems" :key="index"  v-on:click="navClick()" class="header__item">
                    <!-- <a :href="'/' + item.attributes.slug" >{{ item.attributes.title }}</a> -->
                    <NuxtLink :to="'/' + item.attributes.slug"  >
                        {{ item.attributes.title }}
                    </NuxtLink>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    data(){
        return {
            theHeaderLogo: '',
            navItemIDs: [],
            navItems: []

        }
    },
    methods: {
        async asyncData() {

            const headerLogo = await fetch(
                this.$store.state.apiroute.url + '/api/header?populate=*'
                // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
            ).then((res) => {
                // can set up 404 redirection here
                
            return res.json();
            }); 

            // console.log('headerLogo', headerLogo);

            this.theHeaderLogo = this.$store.state.apiroute.url + headerLogo.data.attributes.headerLogo.data.attributes.url

            const navItemIDs = await fetch(
                this.$store.state.apiroute.url + '/api/header?[populate][headerNavigation]=*'
                // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
            ).then((res) => {
                
            return res.json();
            }); 


            navItemIDs.data.attributes.headerNavigation.forEach(element => {
                this.navItemIDs.push(element.id);
            });

            console.log('navItemIDs', navItemIDs);

            // get all pages so we can filter them by nav id
            const navItems = await fetch(
                this.$store.state.apiroute.url + '/api/pages'
                // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
            ).then((res) => {
                
            return res.json();
            }); 


            
            // filter pages by navID 
            const idStore = this.navItemIDs;
            var newArray = navItems.data.filter(function(e){
                return idStore.includes(e.id)
            });
            
            navItemIDs.data.attributes.headerNavigation.forEach((element, index) => {
                if(element.customLink != null){
                    newArray.splice(index, 1,  { attributes: { slug: element.customLink, title: element.customText } } )
                }
            });

            console.log('newArray', newArray);

            this.navItems = newArray;
        },
        navClick(){
            console.log('0 0 0 0 0 0 0 ');
            this.$emit('page-open');
        }
    },  
    mounted(){
        this.asyncData();
        console.log('this.navItems', this.navItems);
    }
}
</script>


