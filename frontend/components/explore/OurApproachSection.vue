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

    // import gsap from "gsap"

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
        methods: {
            rotate(){
                this.$gsap.to('.svgRotate', {
                    scrollTrigger: {
                        trigger: '.our-approach__section',
                        markers: true,
                        scrub: 1
                    },
                    rotation: 90,
                    autoAlpha: 1,
                    ease: 'none',
                })
            }
        },
        mounted(){
            this.svgItem = this.$refs.svgRotate
            this.svgContainer = this.$refs.ourApproach__section 
            // this.rotate();   
            
            

            function throttle(fn, wait) {
                var time = Date.now();
                return function() {
                    if ((time + wait - Date.now()) < 0) {
                    fn();
                    time = Date.now();
                    }
                }
            }

            window.addEventListener('scroll', throttle(this.rotate(), 10));
        },
    }
</script>
