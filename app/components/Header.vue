<template>
  <v-app-bar style="background: #4040F0;" dark>
    <v-app-bar-nav-icon @click="navChangeClick" />
    <v-toolbar-title>
      TO時
    </v-toolbar-title>
    <v-spacer />
    <Google />
  </v-app-bar>
</template>

<script>
import Google from '~/components/Login/Google'
export default {
  components: {
    Google
  },
  methods: {
    navChangeClick() {
      this.$store.commit('nav/navChange', { bool: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
