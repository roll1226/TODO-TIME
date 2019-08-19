<template>
  <v-app class="list-todo-wrap">
    <div class="columns">
      <div class="column">
        <h3>
          やること
        </h3>
        <draggable
          :list="plans"
          :clone="clone"
          :group="{ name: 'lists', pull: pullFunction }"
          v-bind="options"
          @start="start"
        >
          <div
            v-for="element in plans"
            :key="element.id"
            class="list-group-item box"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="column">
        <h3>
          進行中
        </h3>
        <draggable v-bind="options" :list="dodo" group="lists">
          <div
            v-for="element in dodo"
            :key="element.id"
            class="list-group-item box"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="column">
        <h3>
          おわり
        </h3>
        <draggable v-bind="options" :list="finish" group="lists">
          <div
            v-for="element in finish"
            :key="element.id"
            class="list-group-item box"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable'
import firebase from '@/plugins/firebase'

let idGlobal = 8
export default {
  components: {
    draggable
  },
  data() {
    return {
      options: {
        animation: 400
      },
      plans: [],
      dodo: [{ name: 'Jesus1', id: 2 }],
      finish: [{ name: 'Jesus1', id: 3 }],
      controlOnStart: true
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // リアルタイム更新
        firebase
          .firestore()
          .collection('todo_list')
          .doc(user.uid)
          .collection('todo_plane')
          .orderBy('createdAt', 'desc')
          .onSnapshot((querySnapshot) => {
            const list = []
            querySnapshot.forEach((doc) => {
              // console.log(doc.data())
              list.push(doc.data())
            })
            this.plans = list
          })
      }
    })
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ }
    },
    pullFunction() {
      return this.controlOnStart ? 'clone' : true
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey
    }
  }
}
</script>

<style lang="scss" scoped>
.list-todo-wrap {
  padding: 50px 20px;
}
</style>
