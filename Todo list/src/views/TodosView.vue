<template>
    <div>
      <h1>Tarefas Pendentes</h1>
      <TodoForm @add-task="addTask" />
      <TodoList :tasks="tasks" @complete-task="completeTask" />
    </div>
  </template>
  
  <script>
  import TodoForm from '../components/TodoForm.vue'
  import TodoList from '../components/TodoList.vue'
  
  export default {
    components: { TodoForm, TodoList },
    data() {
      return {
        tasks: JSON.parse(localStorage.getItem('tasks')) || []
      }
    },
    methods: {
      addTask(task) {
        this.tasks.push(task)
        this.saveTasks()
      },
      completeTask(index) {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
        completedTasks.push(this.tasks[index])
        this.tasks.splice(index, 1)
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
        this.saveTasks()
      },
      saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      }
    }
  }
  </script>
  