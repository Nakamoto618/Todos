<template>
  <div>
    <h2>タスク追加</h2>
    <input v-model="state.newTodoLabel" />
    <button @click="addTodo">追加</button>

    <input id="all" type="radio" v-model="filter" value="all" />
    <label for="all">すべて</label>
    <input id="finished" type="radio" v-model="filter" value="finished" />
    <label for="finished">完了済み</label>
    <input id="unfinished" type="radio" v-model="filter" value="unfinished" />
    <label for="unfinished">未完了</label>

    <h2>タスク名</h2>
    <ul>
    <li
      :class="{ todo: true, finished: todo.finished }"
      :key="todo.label"
      v-for="todo in filteredTodos"
      v-text="todo.label"
      @click="toggleTodo(todo.id)"
    />
  </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useTodoStore } from "./stores/todos";

const state = reactive({ newTodoLabel: "" });
const store = useTodoStore();
const { filteredTodos, filter } = storeToRefs(store);

// finishedとunfinishedを切り替える
function toggleTodo(id: number) {
  store.toggleTodo(id);
}

// todoリストに新しいアイテムを追加
function addTodo() {
  if (state.newTodoLabel !== "") {
    store.addTodo(state.newTodoLabel);
    state.newTodoLabel = "";
  }
}

</script>

<style scoped>
.todo {
  user-select: none;
  cursor: pointer;
}
.todo.finished {
  text-decoration: line-through;
  color: gray;
}
</style>