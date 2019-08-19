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
      plansText: ''
    }
  },
  computed: {
    ...mapGetters({ addActive: 'list/addActive' })
  },
  methods: {
    changeAdd() {
      this.$store.commit('list/changeAdd', { bool: false })
      this.plansText = ''
    },
    submit_add_list() {
      firebase
        .firestore()
        .collection('todo_list')
        .add({
          id: 5,
          name: this.plansText
        })
      this.plansText = ''
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
</style>
