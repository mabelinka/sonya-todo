
export function useLocalStorage() {

    const TODOS_KEY = 'todos'

    const addTodo = (todo) => {
        const todos = getAllTodos()
        const newTodos = todos.concat(todo)
        setTodos(newTodos)
    }
    const completeTodo = (id) => {
        const todos = getAllTodos()
        const newTodos = todos.map(todo => {
            if (todo.id === id){
                todo.completed = true
                return todo
            }
            return todo
        })
        setTodos(newTodos)
    }
    const unCompleteTodo = (id) => {
        const todos = getAllTodos()
        const newTodos = todos.map(todo => {
            if (todo.id === id){
                todo.completed = false
                return todo
            }
            return todo
        })
        setTodos(newTodos)
    }
    const getByIdTodo = (id) => {
        const todo = getAllTodos().filter(todo => todo.id === id)[0]
        return todo
    }
    const getUnCompletedTodos = () => {
        const todos = getAllTodos()
        const v = todos.filter(todo => !todo.completed)
        return v
    }
    const getCompletedTodos = () => {
        const todos = getAllTodos()
        return todos.filter(todo => todo.completed)
    }
    const getAllTodos = () => {
        const todos = JSON.parse(localStorage.getItem(TODOS_KEY))
        if (todos === null) {
            localStorage.setItem(TODOS_KEY, JSON.stringify([]))
            return []
        }
        return todos
    }
    const setTodos = (todos) => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
    }
    const calculate = () => {

        const todosL = getAllTodos().length
        const completedTodosL = getCompletedTodos().length

        if (completedTodosL === 0){
            return 0
        }

        return Math.round((completedTodosL/todosL) * 100)
    }
    const deleteTodo = (id) => {
        const todos = getAllTodos()
        const todosAfterDeletion = todos.filter(t => t.id !== id)
        setTodos(todosAfterDeletion)
        return todos
    }

    return {
        deleteTodo,
        addTodo,
        getAllTodos,
        completeTodo,
        getByIdTodo,
        getCompletedTodos,
        getUnCompletedTodos,
        unCompleteTodo,
        calculate
    }
}