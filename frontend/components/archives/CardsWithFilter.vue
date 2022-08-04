<template>
    <div class="card-with-filter">
        <DropDown />
    </div>
</template>

<script>

export default {
    name: 'CardsWithFilter',
    data(){
        return {
    
        }
    },
    methods: {

        async asyncData() {

            const cats = await fetch(
                'http://localhost:1337/api/categories'
            ).then((res) => {
                // can set up 404 redirection here
                return res.json();
            });

            console.log('cats', cats);

        // console.log(this.$router.params);
        },

    },  
    mounted(){
        this.asyncData();
    }
}
</script>


