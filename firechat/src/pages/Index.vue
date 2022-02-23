<template>
  <q-page padding>
   <viewAccess v-if="!isAuthenticated" /> 
  </q-page>
</template>

<script>
import viewAccess from '../components/ViewAccess'
import {auth} from '../boot/firebase'
import {useAuth} from '@vueuse/firebase/useAuth'

export default {
  
    components:{viewAccess},
    setup()
    {
      const { user, isAuthenticated } = useAuth(auth);
      return{
        isAuthenticated,
        
      }

    }
    

}
</script>