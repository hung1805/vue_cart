<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>{{ name }}</h1>
    </header>

    <!-- New Task Form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
      <button @click="taskStore.$reset">Clear All Tasks</button>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="isLoading">Loading Tasks...</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} task(s) left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>

    <!-- Favorite List -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favorite task(s) left to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import useTaskStore from "./store/taskStore";
import TaskDetail from "./components/TaskDetail.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";
const taskStore = useTaskStore();
const { name, tasks, favs, isLoading, totalCount, favCount } = storeToRefs(taskStore);

const filter = ref("all");

taskStore.getTasks();
</script>

<style scoped></style>
