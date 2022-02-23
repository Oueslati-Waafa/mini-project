<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
<q-toolbar>
          <q-icon name="account_circle" />
          <q-toolbar-title>{{ isAuthenticated ? user.email : "Chat" }}</q-toolbar-title>
           <q-btn push color="white" text-color="primary" round icon="logout" v-if="isAuthenticated" @click="logout"/>
        </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { db, auth } from "boot/firebase";
import {useAuth} from '@vueuse/firebase/useAuth'

export default {
  name: "MainLayout",

  components: {},

  setup() {
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
    };
  },
};
</script>