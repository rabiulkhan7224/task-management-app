import { useState } from "react";

  
const Home = () => {
    const initialTasks = [
        { _id: "1", title: "Complete Project Proposal", category: "To-Do" },
        { _id: "2", title: "Fix Login Bug", category: "In Progress" },
        { _id: "3", title: "Update Dashb", category: "Done" },
        { _id: "4", title: "Fix Login ", category: "In Progress" },
        { _id: "5", title: "Update Dashboar", category: "Done" },
      ];
   
    
  
    const [tasks, setTasks] = useState(initialTasks);

    const handleDragStart = (e, taskId) => {
      e.dataTransfer.setData("taskId", taskId);
    };
  
    const handleDrop = (e, newCategory) => {
      const taskId = e.dataTransfer.getData("taskId");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, category: newCategory } : task
        )
      );
    };
  
    return (
      <div>
       
       <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {["To-Do", "In Progress", "Done"].map((category) => (
          <div
            key={category}
            onDrop={(e) => handleDrop(e, category)}
            onDragOver={(e) => e.preventDefault()}
            style={{
              flex: 1,
              padding: "10px",
              border: "2px solid black",
              minHeight: "200px",
            }}
          >
            <h2>{category}</h2>
            {tasks
              .filter((t) => t.category === category)
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  style={{
                    padding: "10px",
                    margin: "5px",
                    backgroundColor: "#f1f1f1",
                    border: "1px solid gray",
                    cursor: "grab",
                  }}
                >
                  {task.title}
                </div>
              ))}
          </div>
        ))}
      </div>
      </div>
    );
  };

export default Home;