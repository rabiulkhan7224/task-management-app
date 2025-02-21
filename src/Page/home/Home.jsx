import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchTasks = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`);
    return data;
  };
const Home = () => {
    const queryClient = useQueryClient();
    const { data: tasks = [], isLoading } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  
    const addTask = useMutation({
      mutationFn: (newTask) => axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, newTask),
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });
  
    const deleteTask = useMutation({
      mutationFn: (id) => axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`),
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });
  
    const updateTask = useMutation({
      mutationFn: ({ id, updatedTask }) =>
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, updatedTask),
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });
  
    const reorderTasks = useMutation({
      mutationFn: (updatedTasks) =>
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/reorder`, { tasks: updatedTasks }),
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    });
  
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });
  
    const handleAddTask = () => {
      if (newTask.title.trim()) {
        addTask.mutate(newTask);
        setNewTask({ title: "", description: "", category: "To-Do" });
      }
    };
  
    console.log(newTask)
    const handleDragStart = (event, taskId) => {
      event.dataTransfer.setData("taskId", taskId);
    };
  
    const handleDrop = (event, newCategory) => {
      const taskId = event.dataTransfer.getData("taskId");
      const task = tasks.find((t) => t._id === taskId);
      if (task && task.category !== newCategory) {
        updateTask.mutate({ id: taskId, updatedTask: { ...task, category: newCategory } });
      }
    };
  
    const handleReorder = (category) => {
      const categoryTasks = tasks.filter((task) => task.category === category);
      reorderTasks.mutate(categoryTasks);
    };
  
    if (isLoading) return <p>Loading...</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <div className="flex gap-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <div
              key={category}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, category)}
              className="w-1/3 p-4 border rounded shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{category}</h2>
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
                    className="bg-gray-200 p-2 mb-2 rounded flex justify-between"
                  >
                    <span>{task.title}</span>
                    <button
                      onClick={() => deleteTask.mutate(task._id)}
                      className="text-red-500 ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              <button
                onClick={() => handleReorder(category)}
                className="text-blue-500 text-sm mt-2"
              >
                Reorder Tasks
              </button>
            </div>
          ))}
        </div>
  
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Add Task</h2>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
            className="border p-2 w-full rounded mb-2"
          />
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Task Description"
            className="border p-2 w-full rounded mb-2"
          />
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded w-full">
            Add Task
          </button>
        </div>
      </div>
    );
  };

export default Home;