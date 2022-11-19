import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch("http://localhost:4000/todos", {
        headers: {
          Authorization: `Bearer ${state.applicationSlice.token}`,
        },
      });

      const json = await res.json();

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/remove",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.applicationSlice.token}`,
        },
      });
      const json = await res.json();

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todos/complete",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const todo = thunkAPI
      .getState()
      .todosReducer.todos.find((todo) => todo._id === id);

    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.applicationSlice.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const json = await res.json();
      console.log(json);
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/add",
  async (input, { thunkAPI, getState }) => {
    const state = getState();
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.applicationSlice.token}`,
        },
        body: JSON.stringify({ title: input }),
      });

      const data = await res.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos = state.todos.filter((todo) => {
          return todo._id !== action.payload;
        });
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos.unshift(action.payload);
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = !action.payload.completed;
          }
          return todo;
        });
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default todosSlice.reducer;
