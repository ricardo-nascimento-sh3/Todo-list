<template>
  <table>
    <thead>
      <tr>
        <th>Tarefa</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <td>
          <!-- Se estiver editando, exibe um input para a tarefa -->
          <input v-if="editingIndex === index" v-model="editedTask" @keyup.enter="saveEdit(index)" />
          <!-- Caso contrário, mostra o texto da tarefa -->
          <span v-else>{{ task.task }}</span>
        </td>

        <!-- Coluna de Descrição -->
        <td>
          <!-- Se estiver editando, exibe um input para a descrição -->
          <input v-if="editingIndex === index" v-model="editedDescription" @keyup.enter="saveEdit(index)" />
          <!-- Caso contrário, mostra o texto da descrição -->
          <span v-else>{{ task.description }}</span>
        </td>

        <!-- Coluna de Ações -->
        <td>
          <template v-if="editingIndex === index">
            <button @click="saveEdit(index)">💾 Salvar</button>
            <button @click="cancelEdit">❌ Cancelar</button>
          </template>
          <template v-else>
            <button @click="$emit('complete-task', index)">✅ Concluído</button>
            <button @click="startEdit(index, task)">✏️ Editar</button>
            <button @click="$emit('delete-task', index)">🗑️ Excluir</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tasks'],
  data() {
    return {
      editingIndex: null,      // Índice da tarefa que está sendo editada
      editedTask: '',          // Valor temporário da tarefa em edição
      editedDescription: ''    // Valor temporário da descrição em edição
    }
  },
  methods: {
    startEdit(index, task) {
      this.editingIndex = index
      this.editedTask = task.task        // Edita o nome da tarefa
      this.editedDescription = task.description // Edita a descrição
    },
    saveEdit(index) {
      if (this.editedTask.trim() !== '' && this.editedDescription.trim() !== '') {
        // Emitir tanto a tarefa quanto a descrição
        this.$emit('edit-task', index, { 
          task: this.editedTask, 
          description: this.editedDescription 
        })
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
/* Tabela */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background-color: #fff;
  color: #333;
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e1e1e1; /* Linha de separação suave */
}

th {
  text-align: center;
  background-color: #f8f8f8; /* Cor suave para o cabeçalho */
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Títulos de coluna e células */
td {
  font-size: 14px;
  color: #000000;
  line-height: 1.5;
}

/* Hover para as linhas da tabela */
tr:hover {
  background-color: #f1f1f1; /* Cor de destaque ao passar o mouse */
}

/* Botões */
button {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.3s ease;
  font-weight: 600;
  margin-left: 10px;
}

button:nth-child(1) {
  background-color: #28a745;
  color: #fff;
}

button:nth-child(2) {
  background-color: #ffc107;
  color: #333;
}

button:nth-child(3) {
  background-color: #DC3545;
  color: #fff;
}

button:hover {
  opacity: 0.8;
}

/* Estilo para ícones dos botões */
button svg {
  margin-right: 5px;
}

</style>
