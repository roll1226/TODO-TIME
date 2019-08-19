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
        <draggable v-bind="options" :list="list2" group="lists">
          <div
            v-for="element in list2"
            :key="element.id"
            class="list-group-item box"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="column">
        <h3>
          終了
        </h3>
        <draggable v-bind="options" :list="list3" group="lists">
          <div
            v-for="element in list3"
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
      plans: [
        { name: 'Jesus1', id: 1 },
        { name: 'Paul2', id: 2 },
        { name: 'Peter3', id: 3 }
      ],
      list2: [
        { name: 'Luc4', id: 5 },
        { name: 'Thomas5', id: 6 },
        { name: 'John6', id: 7 }
      ],
      list3: [
        { name: 'Luc7', id: 8 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 },
        { name: 'Thomas8', id: 9 },
        { name: 'John9', id: 10 }
      ],
      controlOnStart: true
    }
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
