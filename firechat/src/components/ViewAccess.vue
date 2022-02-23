<template>
    <div class="q-px-xl fixed-center" style="max-width: 600px">
        <h5>Formulaire de {{ access ? "Login" : "Inscription" }}</h5>

        <q-form class="q-gutter-md" @submit.prevent="processForm">
         <q-input label="Email" v-model="email" outlined />
         <q-input label="Password" v-model="password" type="password" outlined />
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
import useNotify from '../utilities/UseNotify'
export default {
    
    setup() {
       const email = ref('') ;
       const password = ref('') ;
       const access = ref(true);
       const { isAuthenticated, user } = useAuth(auth)
       const { notifyError,notifySuccess } = useNotify() 
       const processForm = async() =>
       {
           if (!email.value.trim() || !password.value.trim()) 
          {
            notifyError("Les champs sont vides")
            return;
          }
          try {
              if (!access.value) {
                  //register
                 const users = await auth.createUserWithEmailAndPassword(email.value , password.value);
                 await db.collection('users').doc(users.user.uid).set({
                     email : users.user.email,
                     condition : true,
                     uid : users.user.uid
                 })
                 console.log(users.user)
                 notifySuccess('Login successfully')
              } else {
                  //login
                  const users = await auth.signInWithEmailAndPassword(email.value , password.value);
                   await db.collection('users').doc(users.user.uid).update({
                     condition : true,
                 })
                  console.log(users.user)
                   notifySuccess('Bienvenu !')
              }
              email.value =""
              password.value =""
              
          } catch (error) {
              notifyError(error.message)
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



