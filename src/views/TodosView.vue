<template>
  <div>
    <h1>Tarefas Pendentes</h1>

    <!-- Campo de seleção de data -->
    <input
      type="date"
      v-model="selectedDate"
      class="date-picker"
      :disabled="showAllTasks"
    />

    <button @click="toggleShowAllTasks" class="toggle-button">
      {{ showAllTasks ? "Mostrar por Data" : "Mostrar Todos Registros" }}
    </button>

    <!-- Campo de busca -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar por tarefa ou descrição..."
      class="search-input"
    />

    <!-- Botão para mostrar todas as tarefas -->


    <!-- Formulário de Tarefa -->
    <TodoForm @add-task="addTask" />

    <!-- Lista de Tarefas -->
    <TodoList 
      :tasks="filteredTasks" 
      @complete-task="completeTask" 
      @edit-task="editTask" 
      @delete-task="deleteTask" 
    />
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

export default {
  components: { TodoForm, TodoList },
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      searchQuery: '', // Variável para armazenar a busca
      selectedDate: new Date().toISOString().split('T')[0], // Data selecionada no formato 'yyyy-mm-dd'
      showAllTasks: false, // Controle do botão "Mostrar Todas"
    }
  },
  
  computed: {
    filteredTasks() {
      // Filtra as tarefas com base na data selecionada e no texto da busca
      return this.tasks.filter(task => {
        const searchLower = this.searchQuery.toLowerCase()
        const selectedDate = this.selectedDate
        const taskDate = task.date

         // Se "Mostrar Todas" estiver ativado, ignora a filtragem por data
         if (this.showAllTasks) {
          return (
            task.task.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower)
          );
        }


        return (
          (taskDate === selectedDate) && 
          (task.task.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower))
        )
      })
    }
  },
  methods: {
    toggleShowAllTasks() {
      this.showAllTasks = !this.showAllTasks;
    },
    addTask(taskData) {
      const taskWithDate = { 
        task: taskData.task, 
        description: taskData.description,
        date: this.selectedDate // Adiciona a data selecionada à tarefa
      }
      this.tasks.push(taskWithDate)
      this.saveTasks()
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) // Formato DD/MM/AAAA
    },
    completeTask(filteredIndex) {
    const taskToComplete = this.filteredTasks[filteredIndex]
    const index = this.tasks.indexOf(taskToComplete)

    if (index !== -1) {
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []

      // Criar uma nova entrada com a data de conclusão
      const completedTask = {
        ...this.tasks[index],
        completedAt: new Date().toISOString().split('T')[0] // Data de conclusão no formato YYYY-MM-DD
      }

      completedTasks.push(completedTask)
      this.tasks.splice(index, 1)

      localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
      this.saveTasks()
    }
  },

    editTask(filteredIndex, newTask) {
      const taskToEdit = this.filteredTasks[filteredIndex]
      const index = this.tasks.indexOf(taskToEdit)

      if (index !== -1) {
        // Substitui a tarefa no índice correto, mantendo a mesma data
        this.tasks[index] = { 
          ...newTask, 
          date: taskToEdit.date // Garante que a data não será alterada
        }
        this.saveTasks()
      }
    },
    deleteTask(filteredIndex) {
      const taskToDelete = this.filteredTasks[filteredIndex]
      const index = this.tasks.indexOf(taskToDelete)

      if (index !== -1) {
        this.tasks.splice(index, 1)
        this.saveTasks()
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

div {
  margin-top: 12%;
  margin-left: 220px;
  display: block;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

h1 {
  color: rgb(182, 161, 161);
  text-align: center;
}

.date-picker {
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
}

.toggle-button {
  margin-left: 20px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.toggle-button:hover {
  background-color: #0056b3;
}
</style>
