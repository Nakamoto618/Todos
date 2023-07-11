import { StateTree, defineStore } from "pinia";

type FilterType = "all" | "finished" | "unfinished";
type TODO = {
  id: number;
  label: string;
  finished: boolean;
};

// defineStore 関数を用いてストアを作成する
// "todos" はアプリケーション全体でストアを特定するためのユニークキー
export const useTodoStore = defineStore("todos", {
  // 初期値を返す関数を定義する
  state: () => {
    return {
      filter: "all" as FilterType,
      todos: [] as TODO[],
      nextId: 0,
    };
  },
  
  getters: {
    // idに対応するTODO オブジェクトを返す
    findTodo(state) {
        return function(id: number): TODO {
          var todo;
          for (var i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === id) {
              todo = state.todos[i];
              break;
            }
          }
          if (typeof todo === "undefined") {
            throw new Error("todo not found");
          }
      
          return todo;
        }
    },

    finishedTodos(state) {
      return state.todos.filter((todo) => todo.finished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.finished);
    },

    // フィルター機能
    filteredTodos(state): TODO[] {
      switch (state.filter) {
        case "finished":
          return this.finishedTodos;
        case "unfinished":
          return this.unfinishedTodos;
        case "all":
          return this.todos;
      }
    },
  },
  
  actions: {
    addTodo(label: string) {
      this.todos.push({ id: this.nextId++, label, finished: false });
    },
    toggleTodo(id: number) {
      const todo = this.findTodo(id);
      todo.finished = !todo.finished;
    },
  },
});