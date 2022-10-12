<template>
    <div class="our-approach__section"  :key="index" ref="ourApproach__section">
        <div class="our-approach__content">
            <div class='our-approach__icon'>
                <OnqorCircleIcon />
                
                <svg  ref="svgRotate" class="svgRotate" :style="{ transform: 'rotate('+ rotateMe+'turn)'}" xmlns="http://www.w3.org/2000/svg" width="209" height="209" viewBox="0 0 209 209" fill="none">
                    <circle cx="104.5" cy="104.5" r="102.5" :stroke="this.sectionData.colour" stroke-width="4" stroke-miterlimit="1" stroke-linecap="round" stroke-dasharray="3 19"/>
                </svg>

            </div>
            <div class="content">
                <h3 :style="{ color: this.sectionData.colour  }">{{ this.sectionData.title }}</h3>
                {{ this.sectionData.content }}
            </div>
        </div>
        
        <div class="our-approach__line-container">
            <div  class="line" :style="{ background: 'linear-gradient(90deg, ' + this.sectionData.colour + ' 0%, ' + this.secondColour + ' 100%)' }">
                <div :style="{backgroundImage: 'url(/images/Line.png)'}" ></div>
            </div>
            <div class="our-approach__line-cover" ref="ourApproachCover">

            </div>
        </div>
    </div>
</template>

<script>

    import gsap from "gsap"

    export default {
        name: 'OurApproachSection',
        props: {
            sectionData: Object,
            secondColour: String,
            sectionIndex: Number
        },
        data(){
            return {
                rotateMe: 1,
                turn: 0.5,
                scrollMe: null,
                svgItem: null,
                svgContainer: null,
            }
        },
        methods: {
            rotate(){

                this.svgItem = this.$refs.svgRotate
                this.svgContainer = this.$refs.ourApproach__section 

                if(this.sectionIndex % 2 === 0){
                    gsap.to(this.svgItem, {
                        scrollTrigger: {
                            trigger: this.svgContainer,
                            // markers: true,
                            scrub: 1
                        },
                        rotation: '-90deg',
                        autoAlpha: 1,
                        ease: 'none',
                    })
                }else{
                    gsap.to( this.svgItem, {
                        scrollTrigger: {
                            trigger: this.svgContainer,
                            // markers: true,
                            scrub: 1
                        },
                        rotation: '90deg',
                        autoAlpha: 1,
                        ease: 'none',
                    })
                }


                gsap.to(".line div", 30, {
                    backgroundPosition: "200px 0px",
                    scrollTrigger: {
                        trigger: '.our-approach',
                        // markers: true,
                        scrub: 1
                    },
                    //autoRound:false,
                     ease: 'ease-in'
                });

                gsap.to(this.$refs.ourApproachCover, 30, {
                    width: "-60%",
                    scrollTrigger: {
                        trigger: this.svgContainer,
                        start: 'top-=100 center',
                        scrub: 1
                    },
                    //autoRound:false,
                    ease: 'ease-in'
                });
            },
        },
        mounted(){

            // this.rotate();   
            



      
                this.rotate()


      


            // window.addEventListener('scroll', throttle(this.rotate(), 10));
        },
    }
</script>
