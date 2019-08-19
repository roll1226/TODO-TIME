<template>
  <div class="nav-wrap" :class="{ 'nav-active': navChange }">
    <v-list nav dense class="nav">
      <v-list-item-group
        class="columns is-multiline"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <nuxt-link to="/" class="column is-12" tag="v-list-item-title">
            ホーム
          </nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/todo" class="column is-12" tag="v-list-item-title">
            TODOリスト
          </nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/contact" class="column is-12" tag="v-list-item-title">
            お問い合わせ
          </nuxt-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ navChange: 'nav/navBool' })
  },
  watch: {
    $route() {
      this.$store.commit('nav/navChange', { bool: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.columns,
.column {
  padding: 0;
  margin: 0;
}
.column {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.nav-wrap {
  width: 20rem;
  height: 100vh;
  position: fixed;
  transform: translateX(-20rem);
  transition: all 300ms ease-in-out 0s;
  z-index: 2;
  top: 0;
  &.nav-active {
    transform: translateX(0vw);
  }
  .nav {
    position: fixed;
    z-index: 100;
    width: 20rem;
    height: 100vh;
    background: #ffffff;
    top: 0;
  }
}
@media screen and (max-width: 770px) {
  .nav-wrap {
    width: 15rem;
    transform: translateX(-15rem);
    .nav {
      width: 15rem;
    }
  }
}
</style>
