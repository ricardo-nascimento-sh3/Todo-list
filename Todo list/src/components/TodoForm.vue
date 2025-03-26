<template>
    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Nova tarefa" required />
      <button type="submit">Adicionar</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: ''
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim()) {
          this.$emit('add-task', this.newTask.trim())
          this.newTask = ''
        }
      }
    }
  }
  </script>
  
  <style scoped>
  form {
    display: flex;
    gap: 10px;
  }
  </style>
  