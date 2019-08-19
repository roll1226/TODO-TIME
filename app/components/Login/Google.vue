<template>
  <div class="google">
    <div v-if="!isLogin">
      <v-btn
        class="mx-2"
        fab
        dark
        small
        style="background: #4285F4;"
        @click="googleLogin"
      >
        <div v-if="loading === false">
          <i class="fab fa-google" style="font-size: 1.5rem; color: #fff;" />
        </div>
        <div v-else>
          <div class="loader" style="width: 1.3rem; height: 1.3rem;"></div>
        </div>
      </v-btn>
    </div>
    <div v-else class="login-wrap">
      <div class="user-image">
        <img :src="image" alt="ユーザー画像" />
      </div>
      <p>{{ user }}</p>
      <v-btn class="btn-wrap" style="background: #4285F4;" @click="logOut">
        <i class="fas fa-sign-out-alt" style="font-size: 1.3rem;"></i>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  computed: {
    ...mapGetters({
      isLogin: 'login/IsLogin',
      user: 'login/Users',
      image: 'login/Image',
      loading: 'login/Loading'
    })
  },
  // asyncData () {
  //   return {
  //     user: []
  //   }
  // },
  created() {
    this.$store.commit('login/Loading', { bool: true })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('login/Login', { bool: true })
        this.$store.commit('login/User', { users: user.displayName })
        this.$store.commit('login/Uid', { id: user.uid })
        this.$store.commit('login/Image', { image: user.photoURL })
        this.$store.commit('login/Loading', { bool: false })
        // this.user = user
      } else {
        this.$store.commit('login/Login', { bool: false })
        this.$store.commit('login/User', { users: [] })
        this.$store.commit('login/Loading', { bool: false })
        // this.user = []
      }
    })
  },
  methods: {
    googleLogin() {
      // const provider = new firebase.auth.GoogleAuthProvider()
      // firebase.auth().signInWithRedirect(provider)
      this.$store.dispatch('login/GoogleLogin')
    },
    logOut() {
      // firebase.auth().signOut()
      this.$store.dispatch('login/LogOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .user-image {
    width: 2.5rem;
    img {
      display: block;
      border-radius: 500px;
    }
  }
  p {
    margin-left: 0.5rem;
    text-align: center;
  }
  .btn-wrap {
    margin-left: 0.5rem;
  }
}
</style>
