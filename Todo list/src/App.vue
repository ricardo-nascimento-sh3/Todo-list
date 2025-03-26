<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="logo-container">
      <h1>Todo List</h1>
    </div>

    <nav>
      <RouterLink to="/">📌 Pendentes</RouterLink>
      <RouterLink to="/completed">✅ Completas</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* Header fixo com fundo estilizado */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Logo e título alinhados */
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 10px;
}

/* Navegação centralizada */
nav {
  display: flex;
  justify-content: center; /* Centraliza os itens de navegação */
  gap: 1rem; /* Espaçamento entre os links */
  flex-grow: 1; /* Faz o nav crescer e ocupar o espaço disponível */
}

nav a {
  text-decoration: none;
  color: #ecf0f1;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s ease;
}

nav a.router-link-exact-active {
  background-color: #3498db;
  color: #fff;
}

/* Layout principal */
main {
  margin-top: 100px; /* Para não ficar atrás do header */
  padding: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
