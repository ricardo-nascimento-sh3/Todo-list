<template>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">
      <!-- Se estiver editando, exibe um input -->
      <input v-if="editingIndex === index" v-model="editedTask" @keyup.enter="saveEdit(index)" />

      <!-- Caso contrário, mostra o texto normalmente -->
      <span v-else>{{ task }}</span>

      <!-- Botões (aparecem dependendo do estado de edição) -->
      <template v-if="editingIndex === index">
        <button @click="saveEdit(index)">💾 Salvar</button>
        <button @click="cancelEdit">❌ Cancelar</button>
      </template>
      <template v-else>
        <button @click="$emit('complete-task', index)">✅ Feito</button>
        <button @click="startEdit(index, task)">✏️ Editar</button>
        <button @click="$emit('delete-task', index)">🗑️ Excluir</button>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['tasks'],
  data() {
    return {
      editingIndex: null, // Índice da tarefa que está sendo editada
      editedTask: '' // Valor temporário da tarefa em edição
    }
  },
  methods: {
    startEdit(index, task) {
      this.editingIndex = index
      this.editedTask = task
    },
    saveEdit(index) {
      if (this.editedTask.trim() !== '') {
        this.$emit('edit-task', index, this.editedTask)
        this.editingIndex = null // Sai do modo de edição
      }
    },
    cancelEdit() {
      this.editingIndex = null // Cancela a edição e volta ao estado normal
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
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  opacity: 0.8;
}

</style>
