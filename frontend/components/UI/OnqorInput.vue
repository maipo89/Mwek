<template>
    <div>
        <input class="onqor-input" type="text" v-model="inputValue">
    </div>
</template>

<script>
    export default {
        name: 'OnqorInput',

        data(){
            return {
                inputValue: 'Place holder',
            }
        },
        props: {
            inputPlaceHolder: String,
        },
        mounted(){
            this.inputValue = this.inputPlaceHolder;
        }
    }
</script>
