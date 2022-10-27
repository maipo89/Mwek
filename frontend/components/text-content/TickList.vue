<template>
    <div class="tick-list">
        <div class="tick-list__item" v-for="(item, index) in this.blockData.listItems" :key="index">
            <Icon icon="checkMark" />
            <p>{{ item.TickListItemText }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TickList',
        data(){
            return {
                stateThing: ''
            }
        },
        props: {
            blockData: Array,
        },
        mounted(){
            console.log('this.blockData.listItems',this.blockData.listItems);
        },
        beforeMount(){
            require('@/assets/scss/text-content/tick-list.scss');
        }
    }
</script>