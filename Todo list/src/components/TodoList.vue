<template>
    <ul>
      <TodoItem v-for="(task, index) in tasks" :key="index" :task="task" @complete-task="$emit('complete-task', index)" />
    </ul>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue'
  
  export default {
    components: { TodoItem },
    props: ['tasks']
  }
  </script>
  