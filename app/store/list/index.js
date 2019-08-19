export const state = () => ({
  add: false,
  plans: [
    {
      id: 1,
      name: 'test'
    }
  ]
})

export const mutations = {
  changeAdd(state, payload) {
    state.add = payload.bool
  }
}

export const actions = {}

export const getters = {
  plans: (state) => state.plans,
  addActive: (state) => state.add
}
