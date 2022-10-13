<template>
    <div class="subscription">
        <p class="subscription__sub">Keep up to date with what is going on in Crypto, FinTech and Emerging Technology by subscribing to The MWek Blog below.</p>
        <div class="subscription__row">
            <OnqorInput inputPlaceHolder="Email"/>  <OnqorButton text="Candidate" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SubscriptionSection',
        
        data(){
            return {

            }
        },
        beforeMount(){
            require('@/assets/scss/global/subscription-section.scss');
        }
  
    }
</script>
