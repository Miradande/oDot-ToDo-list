todos = (state, action) => {

  var state = (typeof state !== 'undefined' ? state : [])
  switch (action.type) {
    case 'addTodo':
      return state.concat(action.todo)
    case 'toggleDone':
      state[action.index].done = !state[action.index].done
      return state
    case 'logOut':
      return state = []
    case 'login':
      return state.concat(action.todos)
    default:
      return state
  }
}

store = (reducer) => {
  var state
  var listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({});

  return {getState, dispatch, subscribe}
}
exports.store = store
exports.todos = todos
exports.todoStore = store(todos)
