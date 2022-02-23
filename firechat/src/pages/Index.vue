<template>
  <q-page padding>
    <viewAccess v-if="!isAuthenticated" />
    <div v-else>
      <viewActiveUsers />
      <viewChat />
    </div>
  </q-page>
</template>

<script>
import viewAccess from "../components/ViewAccess.vue";
import viewChat from "../components/ViewChat.vue";
import viewActiveUsers from "../components/ViewActiveUsers.vue";
import {auth} from '../boot/firebase'
import {useAuth} from '@vueuse/firebase/useAuth'
import { ref, provide, watchEffect } from "vue";

export default {
  components: {
    viewAccess,
    viewChat,
    viewActiveUsers,
  },
  setup() {
    const { user, isAuthenticated } = useAuth(auth);

    const selecUserChat = ref("");
    provide("selecUserChat", selecUserChat);

    watchEffect(() => {
      console.log("selecUserChat", selecUserChat.value);
    });

    return {
      user,
      isAuthenticated,
    };
  },
};
</script>