<template>
  <div v-show="addActive" class="add-form">
    <div class="box">
      <div class="field">
        <label class="label">
          やることなに？
        </label>
        <div class="control">
          <textarea
            v-model="plansText"
            class="textarea"
            placeholder="ニューリョクラン"
          />
        </div>
      </div>

      <div class="control">
        <button class="button is-link" @click="submit_add_list">
          登録
        </button>
      </div>
    </div>
    <div class="mask" @click="changeAdd" />
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      plansText: '',
      id_last: '0',
      store_id: []
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('todo_list')
          .doc(user.uid)
          .collection('todo_plane')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.data().id)

              if (Number(doc.data().id) > Number(this.id_last)) {
                this.id_last = doc.data().id
              }
            })
          })
      }
    })
  },
  computed: {
    ...mapGetters({ addActive: 'list/addActive', uid: 'login/Uid' })
  },
  methods: {
    changeAdd() {
      this.$store.commit('list/changeAdd', { bool: false })
      this.plansText = ''
    },
    submit_add_list() {
      this.id_last = String(Number(this.id_last) + 1)
      firebase
        .firestore()
        .collection('todo_list')
        .doc(this.uid)
        .collection('todo_plane')
        .add({
          id: this.id_last,
          name: this.plansText,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      this.plansText = ''
      this.$store.commit('list/changeAdd', { bool: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-form {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .box {
    position: relative;
    z-index: 3;
    width: 600px;
    .control {
      margin-top: 20px;
      .button {
        width: 100%;
      }
    }
  }
  .mask {
    position: absolute;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}

@media screen and(max-width: 420px) {
  .add-form {
    .box {
      width: 300px;
    }
  }
}
</style>
