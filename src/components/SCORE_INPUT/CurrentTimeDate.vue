<template>
    <fieldset id="current-time-date">
        <legend class="is-size-5">Timestamp</legend>
        <input class="input" type="text" v-model="Now" style="width:210px" readonly>
        <!-- Time: <input type="text" v-model="Time" readonly>
        Date: <input type="text" v-model="DateMMDDYYYY" readonly> -->
    </fieldset>   
</template>

<script>
    import store from '../Store/store'
    import { mapState } from 'vuex'
    
    export default {
        computed: {
            Now: {
                get () {
                    return this.$store.state.Now
                }              
            },
        //   Time: {
        //       get () {
        //           return this.$store.state.Time
        //       }              
        //   },
        //   DateMMDDYYYY: {
        //       get () {
        //           return this.$store.state.Date
        //       }              
        //   },
        }    
    }
</script>