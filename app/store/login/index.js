import firebase from '@/plugins/firebase'

export const state = () => ({
  isLogin: false,
  user: '',
  uid: '',
  image: '',
  loading: false
})

export const mutations = {
  Waiting(state, payload) {
    state.isWaiting = payload.bool
  },
  Login(state, payload) {
    state.isLogin = payload.bool
  },
  User(state, payload) {
    state.user = payload.users
  },
  Uid(state, payload) {
    state.uid = payload.id
  },
  Image(state, payload) {
    state.image = payload.image
  },
  Loading(state, payload) {
    state.loading = payload.bool
  }
}

export const actions = {
  GoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  LogOut() {
    firebase.auth().signOut()
  }
}

export const getters = {
  IsWaiting: (state) => state.isWaiting,
  IsLogin: (state) => state.isLogin,
  Users: (state) => state.user,
  Image: (state) => state.image,
  Loading: (state) => state.loading,
  Uid: (state) => state.uid
}
