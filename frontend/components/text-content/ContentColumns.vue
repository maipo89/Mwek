<template>
    <div>
        <h2 v-if="this.blockData.title" class="content-columns__title">{{ this.blockData.title }}</h2>
        <div class="content-columns__tag-line" :class="this.blockData.tagLineWidth" >
            <h3 :class="this.blockData.tagLineWidth"> {{ this.blockData.contentTagLine }} </h3>
        </div>
        <div class="content-columns">
            <div class="content-columns__block" v-for="(item, index) in this.blockData.content_and_columns" :key="index" :class="[{ contentImage: item.image.data }, item.columnWidth, item.centerImg ? 'center-img' : '']" >   
                <vue-markdown v-if="item.image.data === null" :source="item.content" />
                <img :class="[
                item.animate ? 'anim-spin' : '',
                item.imageWidth ? 'image-bleed' : '']"
                v-if="item.image.data" :src="$store.state.apiroute.url + item.image.data.attributes.url" :style="{width: item.imageWidth + '%'}" />
                <!-- {{ item.content }} -->
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    export default {
        name: 'ContentColumns',
        props: {
            blockData: Object,
        },
        methods: {

        },
        components: {
            VueMarkdown
        },
        data(){
            return {
                colours: []
            }
        },
        mounted(){
            // this.blockData.approachSectionsRepeater.forEach((element, index) => {
            //     if(index < this.blockData.approachSectionsRepeater.length - 1){
            //         this.colours.push(this.blockData.approachSectionsRepeater[index + 1].colour);
            //     }
            // });
            console.log('ContentColumns', this.blockData);

        },
        beforeMount(){
            require('@/assets/scss/text-content/content-columns.scss');
        }
    }
</script>
