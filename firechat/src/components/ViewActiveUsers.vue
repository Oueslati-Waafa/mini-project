<template>
  <q-page-sticky position="top" expand class="tabs-zindex">
    <q-tabs
      v-model="selecUserChat"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2 full-width"
    >
      <q-tab
        v-for="user in arrayOtherUsers"
        :key="user.uid"
        icon="account_circle"
        :label="user.email"
        :name="user.uid"
        :class="user.condition ? 'text-white' : 'text-grey'"
      />
    </q-tabs>
  </q-page-sticky>
</template>

<script>
import { ref, inject, computed } from "vue";
import { db } from "boot/firebase";
import {auth} from '../boot/firebase'
import {useAuth} from '@vueuse/firebase/useAuth'

export default {
  setup() {
    const users = ref([]);
    const selecUserChat = inject("selecUserChat");
    const { user } = useAuth(auth);

    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.condition - a.condition);
        }
        if (change.type === "modified") {
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...user, condition: change.doc.data().condition }
              : user
          );

          users.value = users.value.sort((a, b) => b.condition - a.condition);
        }
        if (change.type === "removed") {
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.condition - a.condition);
        }
      });
    });

    const arrayOtherUsers = computed(() => {
      return users.value.filter((item) => item.uid !== user.value.uid);
    });
    return {
      selecUserChat,
      users,
      arrayOtherUsers,
    };
  },
};
</script>

<style scoped>
.tabs-zindex {
  z-index: 2000;
}
</style>