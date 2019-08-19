<template>
  <div class="add-btn">
    <v-btn class="mx-2" fab dark large @click="addlist">
      <i class="fas fa-pencil-alt fa-2x" />
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    addlist() {
      this.$store.commit('list/changeAdd', { bool: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
