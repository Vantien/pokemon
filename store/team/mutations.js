export default {
    add (state, title) {
        state.list.push(title)
      },
    remove (state, num) {
        state.list.splice(num, 1)
    },
    update(state, newList) {
        state.list = newList
    }
  }
  