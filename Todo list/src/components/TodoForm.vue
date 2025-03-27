<template>
  <form @submit.prevent="addTask">
    <input v-model="newTask" placeholder="Nova tarefa" required />
    <input v-model="newDescription" placeholder="Descrição" />
    <button type="submit">Adicionar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',        // Variável para a tarefa
      newDescription: ''  // Variável para a descrição
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        // Emitir a tarefa e a descrição para o componente pai
        this.$emit('add-task', { task: this.newTask.trim(), description: this.newDescription.trim() })
        // Limpar os campos após adicionar
        this.newTask = ''
        this.newDescription = ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px; /* Adiciona espaço abaixo do formulário */
}

input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
