<template>
</template>

<script>
    export default {
        name: 'ServicePageLinks',
        props: {
            seoData: Array,
        },
        data(){
            return {
                seo: '',
                linkMeta: []
            }
        },
        head() {
            return {
                title: 'HomePage',
                meta: this.seo,
                link: this.linkMeta
            }
        },
        mounted(){
            console.log(this.seoData);
            var tempSocailArray = []
            class seoObject {
                constructor(hid, name, property, content) {
                    if(hid){
                        this.hid = hid;
                    }
                    if(name){
                        this.name = name;
                    }
                    if(property){
                        this.property = property
                    }
                    if(content){
                        this.content = content
                    }

                }
            }
            if(this.seoData.metaSocial){
                this.seoData.metaSocial.forEach(element => {
                    if(element.title){
                        let obj1 = new seoObject('', '', 'og:title', element.title );
                        tempSocailArray.push(obj1);
                    }
                    if(element.description){
                        let obj2 = new seoObject('', '', 'og:description', element.description );
                        tempSocailArray.push(obj2);                      
                    }
                    if(element.image){
                        let obj3 = new seoObject('', '', 'og:image', this.$store.state.apiroute.url  +  element.image.data.attributes.formats.small.url);
                        tempSocailArray.push(obj3);  
                    }
                });
               
                // let objImage = new seoObject('', '', '', this.seoData.metaSocial.description);
            }

            if(this.seoData){
                let objDescription = new seoObject('', '', 'description', this.seoData.metaDescription);
                let objTitle = new seoObject('', '', 'title', this.seoData.metaTitle );

                tempSocailArray.push(objDescription, objTitle);
            }

            if(this.seoData.keywords){
                
                let objKeywords = new seoObject('', 'keywords', 'keywords', this.seoData.keywords );

                tempSocailArray.push(objKeywords);
            }

            if(this.seoData.metaRobots){
                
                let objRobots = new seoObject('', 'robots', 'robots', this.seoData.metaRobots );

                tempSocailArray.push(objRobots);
            }
            this.seo = tempSocailArray;


                    //    {
                    // rel: 'canonical',
                    // href: 'https://www.my-primary-domain.com' + this.$route.path
                    // }
            if(this.seoData.canonicalURL){
                this.linkMeta.push({ rel: 'canonical', href: this.seoData.canonicalURL })
            }


        }
    }
</script>