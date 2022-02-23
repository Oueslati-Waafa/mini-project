<template>

<q-drawer
        v-model="drawer"
        show-if-above
        
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay

        :width="300"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding  v-model="uidSelectedUser">
 
             <q-item v-ripple>
                 <q-item-section avatar>
                <q-icon name="menu" />
              </q-item-section>
              <q-item-section>
              <q-input rounded outlined dense class="full-width" bg-color="white" v-model="search" placeholder="Rechercher ...">
              <template v-slot:prepend>
              <q-icon name="search" />
              </template>
              </q-input>
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item active clickable v-ripple v-for="user in arrayOtherUser" :key="user.uid" :name="user.uid" :class="user.condition ? 'text-green' : 'text-grey'">

              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section  >
                {{user.email}}
              </q-item-section>
            </q-item>


          </q-list>
        </q-scroll-area>
      </q-drawer>

</template>

<script>
import {ref,computed} from 'vue'
import {db} from '../boot/firebase'
import {auth} from '../boot/firebase'
import {useAuth} from '@vueuse/firebase/useAuth'

export default {
    setup() {
        const uidSelectedUser = ref('mails');
        const users = ref([]);
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

     const arrayOtherUser = computed(() => {
      return users.value.filter((item) => item.uid !== user.value.uid);
    });
        return{
            uidSelectedUser,
            users,
            arrayOtherUser,
            drawer: ref(false),
            miniState: ref(true)
        }
        
    }
}
</script>

<style>

</style>