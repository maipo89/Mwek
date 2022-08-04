<template>
    <div class="footer">
        <div class="footer__container">
            <div v-for="(item, index) in this.footerColumns" :key="index" class="footer__coloumn">
                <div v-if="item.logoImg" class="footer__image">
                    <img :src="item.logoImg" />
                    <p>
                        {{ item.tagline }}
                    </p>
                </div>
                <div v-if="item.id" class="footer__links" >
                    <h5>{{ item.title }}</h5>
                    <div class="footer__links-item" v-for="(links, linkIndex) in item.theFooterLInks" :key="linkIndex" >
                        <a>{{ links.linkText }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Footer',
    data(){
        return {
            footerColumns: [],
        }
    },
    methods: {
        async asyncData() {

            const footerImage = await fetch(
                this.$store.state.apiroute.url + '/api/footer-option?populate=*'
                // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
            ).then((res) => {
                // can set up 404 redirection here
                
            return res.json();
            }); 
            console.log('image', footerImage);

            this.footerColumns.push({ logoImg: this.$store.state.apiroute.url + footerImage.data.attributes.footerLogo.data.attributes.url, tagline: footerImage.data.attributes.footerTagLine })

            const footerLinks = await fetch(
                this.$store.state.apiroute.url + '/api/footer-option?[populate][theFooterColumns][populate]=*'
                // 'http://localhost:1337/api/pages/1?populate=dynamic_content'
            ).then((res) => {
                // can set up 404 redirection here
            return res.json();
            });   

            footerLinks.data.attributes.theFooterColumns.forEach(element => {
                console.log('elm', element);
                this.footerColumns.push(element);
            });
            // console.log(this.$router.params);
        },
    },  
    mounted(){
        this.asyncData();
        console.log('this.footerColumns', this.footerColumns);
    }
}
</script>


