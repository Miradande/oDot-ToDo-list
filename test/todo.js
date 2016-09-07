var test = require('tape')
var todos = require('../www/js/todo.js').todos
var store = require('../www/js/todo.js').store(todos)
console.log(store.dispatch)

test('Adding ToDos', function (t) {
  t.deepEqual(todos([], {type: 'addTodo', todo: 'Äta frukost'}), ['Äta frukost'])
  t.deepEqual(todos(['Äta frukost'], {type: 'addTodo', todo: 'Äta lunch'}), ['Äta frukost', 'Äta lunch'])
  t.end()
})

test('Check if store exists', function (t) {
  t.notEqual(store.dispatch, undefined)
  t.notEqual(store.subscribe, undefined)
  t.notEqual(store.getState, undefined)
  t.end()
})
