<template>
  <div>
    <h1>Tarefas Concluídas</h1>
    <ul>
      <li v-for="(task, index) in completedTasks" :key="index">
        {{ task }}
        <button @click="deleteCompletedTask(index)">🗑️ Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || []
    }
  },
  methods: {
    deleteCompletedTask(index) {
      this.completedTasks.splice(index, 1) // Remove do array
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks)) // Atualiza o armazenamento
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

button {
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #c0392b;
}

</style>
