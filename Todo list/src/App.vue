<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">📌 Pendentes </RouterLink>
      <RouterLink to="/completed">✅ Completas</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #264666;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-grow: 1;
}

nav a {
  text-decoration: none;
  color: #ecf0f1;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s ease;
}

nav a:hover, nav a.router-link-exact-active {
  background: #1b344a;
}


</style>
