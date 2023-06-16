<template>
</template>

<script>
    export default {
        name: 'OnqorSEO',
        props: {
            seoData: Object,
            publishDate: Object
        },
        // data(){
        //     return {
        //         seo: '',
        //         linkMeta: [],
        //         jsonld: ''
        //     }
        // },
        head() {
            return {
                title: this.seoData.metaTitle,
                meta: this.seoMetaData[0],
                link: this.seoMetaData[1],
                script: [{
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(this.seoData.structuredData) 
                }],
                __dangerouslyDisableSanitizers: ['script'], 
            }
        },
        computed: {
            seoMetaData(){
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
                if(this.seoData){

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
                    };

                    if (this.publishDate) {
                        let obj4 = new seoObject('', '', 'publish_time', this.publishDate.publishDate );
                        tempSocailArray.push(obj4);
                    }

                    // let objImage = new seoObject('', '', '', this.seoData.metaSocial.description);
                
                    let objDescription = new seoObject('', 'description', '', this.seoData.metaDescription);
                    let objPublish = new seoObject('', 'publish_time', '', this.publishDate);
                    let objTitle = new seoObject('', '', 'title', this.seoData.metaTitle );
                    let objImage = new seoObject('', '', 'image ', this.seoData.metaImage );

                    tempSocailArray.push(objDescription, objTitle);
                    
                    if(this.seoData.keywords){
                        let objKeywords = new seoObject('', 'keywords', 'keywords', this.seoData.keywords );
                        tempSocailArray.push(objKeywords);
                    }

                    if(this.seoData.metaRobots){
                        let objRobots = new seoObject('', 'robots', 'robots', this.seoData.metaRobots );
                        tempSocailArray.push(objRobots);
                    }
                    
                    // this.seo = tempSocailArray;

                    var linkMeta = []

                    if(this.seoData.canonicalURL){
                        linkMeta.push({ rel: 'canonical', href: this.seoData.canonicalURL })
                    } else {
                        linkMeta.push({ rel: 'canonical', href: this.$route })
                    }
                }

                        //    {
                        // rel: 'canonical',
                        // href: 'https://www.my-primary-domain.com' + this.$route.path


                
                        // }
    
                
                

                return [tempSocailArray, linkMeta]
            }
        },
        // mounted(){
        //     var tempSocailArray = []
        //     class seoObject {
        //         constructor(hid, name, property, content) {
        //             if(hid){
        //                 this.hid = hid;
        //             }
        //             if(name){
        //                 this.name = name;
        //             }
        //             if(property){
        //                 this.property = property
        //             }
        //             if(content){
        //                 this.content = content
        //             }
        //         }
        //     }
        //     if(this.seoData){
        //         if(this.seoData.metaSocial){
        //             this.seoData.metaSocial.forEach(element => {
        //                 if(element.title){
        //                     let obj1 = new seoObject('', '', 'og:title', element.title );
        //                     tempSocailArray.push(obj1);
        //                 }   
        //                 if(element.description){
        //                     let obj2 = new seoObject('', '', 'og:description', element.description );
        //                     tempSocailArray.push(obj2);                      
        //                 }
        //                 if(element.image){
        //                     let obj3 = new seoObject('', '', 'og:image', this.$store.state.apiroute.url  +  element.image.data.attributes.formats.small.url);
        //                     tempSocailArray.push(obj3);  
        //                 }
        //             });
        //         };

        //         if (this.publishDate) {
        //             let obj4 = new seoObject('', '', 'publish_time', this.publishDate.publishDate );
        //             tempSocailArray.push(obj4);
        //         }

        //         // let objImage = new seoObject('', '', '', this.seoData.metaSocial.description);
            
        //         let objDescription = new seoObject('', 'description', '', this.seoData.metaDescription);
        //         let objPublish = new seoObject('', 'publish_time', '', this.publishDate);
        //         let objTitle = new seoObject('', '', 'title', this.seoData.metaTitle );
        //         let objImage = new seoObject('', '', 'image ', this.seoData.metaImage );

        //         tempSocailArray.push(objDescription, objTitle);
                
        //         if(this.seoData.keywords){
        //             let objKeywords = new seoObject('', 'keywords', 'keywords', this.seoData.keywords );
        //             tempSocailArray.push(objKeywords);
        //         }

        //         if(this.seoData.metaRobots){
        //             let objRobots = new seoObject('', 'robots', 'robots', this.seoData.metaRobots );
        //             tempSocailArray.push(objRobots);
        //         }
        //         this.seo = tempSocailArray;

        //         if(this.seoData.canonicalURL){
        //             this.linkMeta.push({ rel: 'canonical', href: this.seoData.canonicalURL })
        //         } else {
        //             this.linkMeta.push({ rel: 'canonical', href: this.$route })
        //         }
        //     }

        //             //    {
        //             // rel: 'canonical',
        //             // href: 'https://www.my-primary-domain.com' + this.$route.path
        //             // }
  
        //     
        //     

        // }
    }
</script>