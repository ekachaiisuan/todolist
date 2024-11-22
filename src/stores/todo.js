import { defineStore } from 'pinia';
import axios from 'axios';

const url = 'https://673e98d9a9bc276ec4b4f312.mockapi.io/todos/';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    msg: '',
    statuses: ['Pending', 'Doing', 'Fin'],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${url}`);
        this.list = response.data;
      } catch (error) {
        console.log('error :', error);
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${url}${id}`);
        this.selectedTodo = response.data;
      } catch (error) {
        console.log('error :', error);
      }
    },
    async addTodo(todoText) {
        const bodyData = {
            name: todoText,
            status: 'Pending'
        }
        try {
          const response = await axios.post(`${url}${id}`,bodyData);
          this.msg = 'insert complete'
        } catch (error) {
          console.log('error :', error);
        }
      },
      async editTodo(todoText,id) {
        const bodyData = {
            name:todoText,
            status: 'Doing'
        }
        try {
          const response = await axios.put(`${url}${id}`);
          this.msg = 'edit complete'
        } catch (error) {
          console.log('error :', error);
        }
      },
      async delTodo(id) {
        
        try {
          const response = await axios.delete(`${url}${id}`);
          this.msg = 'delete complete'
        } catch (error) {
          console.log('error :', error);
        }
      },

  },
});
