<template>
  <div v-show="navChange" class="mask" @click="mask" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ navChange: 'nav/navBool' })
  },
  methods: {
    mask() {
      this.$store.commit('nav/navChange', { bool: false })
    }
  }
}
</script>

<style lang="scss">
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 1;
  top: 0;
}
</style>
