<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="inputValue" />
    <button type="submit">ADD</button>
  </form>
</template>

<script setup>
import useTaskStore from "@/store/taskStore";
import { ref } from "vue";

const taskStore = useTaskStore();
const inputValue = ref("");
const handleSubmit = () => {
  if (inputValue.value.trim() === "") return;
  taskStore.addTask({
    id: Math.floor(Math.random() * 10000).toString(),
    title: inputValue.value,
    isFav: false,
  });
  inputValue.value = "";
};
</script>

<style lang="scss" scoped></style>
