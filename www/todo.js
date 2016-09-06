var config = {
  apiKey: "AIzaSyBmIEBiDYo9lv-r6ADnEw-8wIlnC_LlUY4",
  authDomain: "testawendell.firebaseapp.com",
  databaseURL: "https://testawendell.firebaseio.com",
  storageBucket: "testawendell.appspot.com",
};
firebase.initializeApp(config);

var todosRef = firebase.database().ref('todos');
todos = (state, action) => {

  var state = (typeof state !== 'undefined' ? state : [])
  switch (action.type) {
    case 'addTodo':
      return state.concat(action.todo)
    case 'removeTodo':
      return state.slice(0, action.index).concat(state.slice(action.index + 1))
    case 'logOut':
      return state = []
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

todoStore.subscribe( () => {
  list.innerHTML = ''
  todoStore.getState().map( (e, i) => {
    var item = document.createElement('li')
    item.innerHTML = e
    item.addEventListener('click', () => todoStore.dispatch({type: 'removeTodo', index: i}))
    list.appendChild(item)
  })
})
