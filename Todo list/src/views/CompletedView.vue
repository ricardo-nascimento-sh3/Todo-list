<template>
    <div>
      <h1>Tarefas Concluídas</h1>
      <ul>
        <li v-for="(task, index) in completedTasks" :key="index">{{ task }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || []
      }
    }
  }
  </script>
  