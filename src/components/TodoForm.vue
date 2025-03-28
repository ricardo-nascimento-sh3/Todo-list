<template>
  <form @submit.prevent="addTask">
    <input v-model="newTask" placeholder="Nova tarefa" maxlength="30" required />
    <input v-model="newDescription" placeholder="Descrição" maxlength="100" />
    <button type="submit">Adicionar</button>
  </form>

  <!-- Notificação de sucesso -->
  <div v-if="showSuccessMessage" class="success-message">
    Tarefa criada com sucesso!
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      newDescription: '',
      showSuccessMessage: false  // Controle da exibição da mensagem
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        // Emite o evento de adicionar a tarefa
        this.$emit('add-task', { task: this.newTask.trim(), description: this.newDescription.trim() });

        // Limpa os campos após adicionar a tarefa
        this.newTask = '';
        this.newDescription = '';

        // Exibe a mensagem de sucesso
        this.showSuccessMessage = true;

        // Esconde a mensagem após 4 segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
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
  margin-bottom: 20px;
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

/* Estilos da mensagem de sucesso no canto superior direito */
.success-message {
  position: fixed;
  top: 20px;
  right: 20px; /* Ajustado para o canto superior direito */
  background-color: #28a745; /* Cor verde */
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeInOut 6s forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
