<template>
      <q-footer>
        <q-toolbar class="bg-grey-4 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input rounded outlined dense class="col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
          <q-btn round flat icon="mic" />
        </q-toolbar>
      </q-footer>

</template>

<script>
import {ref} from 'vue'
export default {
    
    setup() {
        const message = ref('') 
        
        return{
            message,
        }
    },
}
</script>

<style>

</style>