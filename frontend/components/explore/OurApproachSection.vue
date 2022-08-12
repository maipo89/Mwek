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
                <div :style="{ backgroundImage: 'url(/images/Line.png)'}">  </div>
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
            secondColour: String
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
        mounted(){

            


            this.svgItem = this.$refs.svgRotate
            this.svgContainer = this.$refs.ourApproach__section

            // const scroll = gsap.set(this.svgItem, {xPercent:-50});
            this.scrollMe = gsap.timeline({
                scrollTrigger:{
                    trigger: this.$refs.ourApproach__section,
                    scrub: true,
                    start: 'top top',
                    end:'bottom bottom',
                    markers: true,
                }
            })
            .to(this.$refs.svgRotate, {
                rotation:90*1,
                duration:1, 
                ease:'none',
            })
 


   
            // gsap.to(this.svgItem, {
            //     scrollTrigger: {
            //         trigger: this.svgContainer,
            //         scrub: 0.9,
            //         start: 'top-=500 top',
            //         end:'bottom+=1000 bottom',
            //         markers: true,

            //     },
            //     rotation: 140,
            //     duration: 3,
            //     ease: "none",
            // });
     

            // function changeNumber() {
            //     this.rotateMe = (num.var).toFixed();
            //     // console.log(this.rotateMe);
            //     this.changeNumber(num);
            // }

            // changeNumber(function() {
            //     this.changeNumber(num);
            // }).bind(this)                    

        },
        methods: {
            changeNumber(num){
                 this.rotateMe = (num.var).toFixed();
            }
        },
        watch: {
            rotateMe: function(value) {
                // If "pageData" ever changes, then we will console log its new value.
                console.log(value);
            }
        }
    }
</script>
