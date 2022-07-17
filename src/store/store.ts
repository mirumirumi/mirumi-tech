import { defineStore } from "pinia"

interface State {
  theme?: "light" | "dark",
}

export const useStore = defineStore({
  id: "config",
  state: (): State => ({
    theme: undefined,
  }),
  getters: {
  },
  actions: {
  },
})
