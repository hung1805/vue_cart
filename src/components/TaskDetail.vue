<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
      <i class="material-icons" :class="{ active: task.isFav }" @click="taskStore.toggleFav(task.id)">favorite</i>
    </div>
  </div>
</template>

<script setup>
import useTaskStore from "@/store/taskStore";
import { defineProps } from "vue";
const taskStore = useTaskStore();
// eslint-disable-next-line
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
// eslint-disable-next-line
</script>

<style scoped></style>
