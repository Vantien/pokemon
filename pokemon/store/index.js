export const state = () => ({
  counter: 0,
  team: [],
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}