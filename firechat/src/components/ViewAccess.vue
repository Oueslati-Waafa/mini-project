<template>
    <div class="q-px-xl">
        <h5>Formulaire de {{ access ? "Login" : "Inscription" }}</h5>

        <q-form class="q-gutter-md" @submit.prevent="processForm">
         <q-input label="Email" v-model="email"/>
         <q-input label="Password" v-model="password"/>
         <q-btn :label="access ? 'Login' : 'Register'" type="submit" color="primary"></q-btn>
         <q-btn color="primary" v-if="!access" @click="access = true" outline>Vous avez déjà un compte?</q-btn>
         <q-btn color="negative" v-else @click="access = false" outline>Vous n'avez pas un compte?</q-btn>
        </q-form>
    </div>
</template>

<script>
import {ref} from 'vue'
import {auth,db} from '../boot/firebase'

import {useAuth} from '@vueuse/firebase/useAuth'
export default {
    
    setup() {
       const email = ref('user@gmail.com') ;
       const password = ref('123123') ;
       const access = ref(true);
       const { isAuthenticated, user } = useAuth(auth)
       const processForm = async() =>
       {
           if (!email.value.trim() || !password.value.trim()) 
          {
            console.log("empty fields");
            return;
          }
          try {
              if (!access.value) {
                  //register
                 const username = await auth.createUserWithEmailAndPassword(email.value , password.value);
                 await db.collection('users').doc(username.user.uid).set({
                     email : username.user.email,
                     condition : true,
                     uid : username.user.uid
                 })
                 console.log(username.user)
              } else {
                  //login
                  const username = await auth.signInWithEmailAndPassword(email.value , password.value);
                   await db.collection('users').doc(username.user.uid).update({
                     condition : true,
                 })
                  console.log(username.user)
              }
              email.value =""
              password.value =""
              
          } catch (error) {
              console.log(error)
          }
       }
       return{
           email,
           password,
           processForm,
           access,
           isAuthenticated,
           user
       }
    },
}
</script>



