<template>
    <div class="meet-the-team__cube-holder" :class="{ active: onTheEdge , goingLeft: goingLeft, goingRight: goingRight }">
        <div class="meet-the-team__cube">
            <div class="cube">
                <div class="face top"></div>
                <div class="face bottom"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <img :src="$store.state.apiroute.url + teamInfo.teamAvatar.data.attributes.formats.thumbnail.url" />
                <div class="cube-bottom-shaddow"></div>
            </div>
            <div class="meet-the-team__info">  
                <span>
                    <p >{{ teamInfo.name }}</p>
                    <a v-if="teamInfo.linkedIn" target="_blank" :href="teamInfo.linkedIn"> <Icon icon="linkedIn" /> </a>
                </span>
                <p>{{ teamInfo.jobTitle }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TeamCube',
        props: {
            teamInfo: Object,
            teamIndex: Number,
            activeCube: Number,
            direction: String,
            ticker: Number,
            totalTeam: Number
        },

        data(){
            return {
                scale: 0.5,
                y: -10,
                onTheEdge: false,
                goingLeft: false,
                goingRight: false,
            }
        },

        mounted(){
            if(this.teamIndex === this.activeCube + 1 || this.teamIndex === this.activeCube - 1){   
                this.onTheEdge = true;
            }

            if(this.teamIndex === this.activeCube + 1){
                this.goingRight = true
            }else{
                this.goingRight = false
            }

            if(this.teamIndex === this.activeCube - 1){
                this.goingLeft = true
            }else{
                this.goingLeft = false
            }
        },
        watch: {
            activeCube: function (val) {
 
                if(this.teamIndex === this.activeCube + 1 || this.teamIndex === this.activeCube - 1){   
                    this.onTheEdge = true;
                }else{
                    this.onTheEdge = false;
                }
                
                if(this.teamIndex === this.activeCube + 1){
                    this.goingRight = true
                }else{
                    this.goingRight = false
                }

                if(this.teamIndex === this.activeCube - 1){
                    this.goingLeft = true
                }else{
                    this.goingLeft = false
                }

                console.log('this.activeCube',this.activeCube);
                console.log('this.totalTeam', this.totalTeam);

                if(this.activeCube === 0 && this.teamIndex === this.totalTeam - 1){
                    this.onTheEdge = true;
                }
        
            },
        }
    }
</script>