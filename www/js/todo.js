// En reducer som uppdaterar state beroende på vilken action som passas in.
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
// Store som lagrar all state och exponerar funktioner.
store = (reducer) => {
  var state
  var listeners = []
  // getState är en funktion som returnar nuvarande state
  const getState = () => state
  // dispatch är en funktion som tar emot en action och callar reducern. Callar även alla listeners.
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  // subscribe lägger till en listener och returnar en funktion för att ta bort listernern.
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
