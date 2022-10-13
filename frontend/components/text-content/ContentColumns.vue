<template>
    <div class="content-columns">
        <div class="content-columns__block" v-for="(item, index) in this.blockData.content_and_columns" :key="index">
            <vue-markdown :source="item.content" />
            <!-- {{ item.content }} -->
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
