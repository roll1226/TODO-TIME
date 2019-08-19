export const state = () => ({
  nav: false
})

export const mutations = {
  navChange(state, payload) {
    state.nav = payload.bool
  }
}

export const actions = {}

export const getters = {
  navBool: (state) => state.nav
}
