<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated>
        <q-toolbar>
          <q-icon name="account_circle" />
          <q-toolbar-title>{{ isAuthenticated ? user.email : "Chat" }}</q-toolbar-title>
           <q-btn push color="white" text-color="primary" round icon="logout" v-if="isAuthenticated" @click="logout"/>
        </q-toolbar>
      </q-header>
      <div v-if="isAuthenticated">
       <viewActiveUsers />
       <viewChat/>
      </div>
      <q-page-container>
      <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import {auth,db} from '../boot/firebase'
import {useAuth} from '@vueuse/firebase/useAuth'
import viewChat from '../components/ViewChat.vue'
import viewActiveUsers from '../components/ViewActiveUsers.vue'

export default {
   components:{viewActiveUsers,viewChat},
  setup () {
    //const {user,isAuthenticated} = useAuth();
    
    const { user, isAuthenticated } = useAuth(auth);

    const logout = async () => {
      try {
        await db.collection("users").doc(user.value.uid).update({
          condition: false,
        });
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      
      user,
      isAuthenticated,
      logout,
    }
  }
}
</script>


