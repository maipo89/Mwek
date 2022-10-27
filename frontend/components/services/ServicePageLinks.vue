<template>
    <div class="service-page-links">
        <h2>{{ this.blockData.serviceSectionTitle }}</h2>
        <div class="service-page-links__row">
            <div class="service-page-links__links" v-for="(item, index) in this.blockData.theServiceLinkRepeater" :key='index'>
                <div class="service-page-links__circle">
                    <img :src="$store.state.apiroute.url + item.serviceIcon.data.attributes.url" />
                    <NuxtLink :to="'/services/' + item.serviceLink.data.attributes.slug" ></NuxtLink
    >
                </div>
                <p v-if="item.serviceTitle">{{ item.serviceTitle }}</p>
                <p v-if="item.serviceTitle === null">{{ item.serviceLink.data.attributes.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ServicePageLinks',
        props: {
            blockData: Array,
        },
        mounted(){
            console.log('this.bockData',this.blockData);
        },
        beforeMount(){
            require('@/assets/scss/services/service-page-links.scss');
        }
    }
</script>