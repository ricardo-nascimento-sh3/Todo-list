<template>
  <div>
    <h1>Tarefas Pendentes</h1>

    <input
      type="date"
      v-model="selectedDate"
      class="date-picker"
      :disabled="showAllTasks"
    />

    <button @click="toggleShowAllTasks" class="toggle-button">
      {{ showAllTasks ? "Mostrar por Data" : "Mostrar Todos Registros" }}
    </button>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar por tarefa ou descrição..."
      class="search-input"
    />

    <TodoForm @add-task="addTask" />

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
      searchQuery: '',
      selectedDate: new Date().toISOString().split('T')[0],
      showAllTasks: false,
    }
  },
  
  computed: {
  filteredTasks() {
    return this.tasks.filter(task => {
      const searchLower = this.searchQuery.toLowerCase();
      const taskDate = task.date;
    
      if (this.showAllTasks) {
        return (
          task.task.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      }

      return (
        (taskDate === this.selectedDate) && 
        (task.task.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower))
      );
    });
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
        date: this.selectedDate
      }

      this.tasks.push(taskWithDate)
      this.saveTasks()
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    },

    completeTask(filteredIndex) {
    const taskToComplete = this.filteredTasks[filteredIndex]
    const index = this.tasks.indexOf(taskToComplete)

    if (index !== -1) {
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []

    
      const completedTask = {
        ...this.tasks[index],
        completedAt: new Date().toISOString().split('T')[0]
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
      
        this.tasks[index] = { 
          ...newTask, 
          date: taskToEdit.date
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
