import { defineStore } from "pinia";

//It is a common convention to name store definitions starting with 'use' eg useUserStore, useProductStore...
const useTaskStore = defineStore("task", {
  state: () => {
    return {
      tasks: [],
      name: "Yoshi",
      isLoading: false,
    };
  },
  getters: {
    favs: (state) => state.tasks.filter((task) => task.isFav),
    favCount: (state) => {
      let favCount = 0;
      for (const task of state.tasks) {
        if (task.isFav) {
          favCount++;
        }
      }
      return favCount;
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3001/tasks");
      const data = await res.json();
      if (data) {
        this.tasks = data;
        this.isLoading = false;
      }
    },
    async addTask(task) {
      try {
        const res = await fetch("http://localhost:3001/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          this.tasks.push(task);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask(id) {
      try {
        const res = await fetch(`http://localhost:3001/tasks/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async toggleFav(id) {
      const selectedTask = this.tasks.find((task) => task.id === id);
      if (selectedTask) {
        try {
          const res = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ isFav: !selectedTask.isFav }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            selectedTask.isFav = !selectedTask.isFav;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    async $reset() {
      try {
        // Fetch all tasks
        const response = await fetch("http://localhost:3001/tasks");
        const tasks = await response.json();

        // Delete each task individually
        const deleteRes = await Promise.all(
          tasks.map((task) =>
            fetch(`http://localhost:3001/tasks/${task.id}`, {
              method: "DELETE",
            })
          )
        );
        if (deleteRes.every((item) => item.ok)) this.tasks = [];
      } catch (err) {
        console.log(err);
      }
    },
  },
});
export default useTaskStore;
