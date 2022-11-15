<template>
    <div @click="goTop()" class="back-button">
        Back to top
    </div>
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
            text: String,
        },
        methods: {
            goTop() {
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
        }
    }
</script>
