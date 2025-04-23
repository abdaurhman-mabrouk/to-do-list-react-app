import React, { useState, useEffect, useRef } from 'react';
import './HomeContainer.css';
import TaskContainer from '../../individuals/TaskContainer/TaskContainer.jsx';

function HomeContainer() {
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all');
  const taskInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const filteredTasks = taskList.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.isDone;
    if (filter === 'unfinished') return !task.isDone;
    return true;
  });

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleAddTask = () => {
    const taskDescription = taskInputRef.current.value.trim();
    if (!taskDescription) return;

    const newTask = {
      id: Date.now(),
      description: taskDescription,
      isDone: false,
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
    taskInputRef.current.value = '';
    taskInputRef.current.focus();
  };

  const handleRemoveTask = (taskId) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  const handleFinishTask = (taskId) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = taskList.find((task) => task.id === taskId);
    const newDescription = prompt('أدخل وصف المهمة:', taskToEdit.description);

    if (newDescription) {
      setTaskList((prevList) =>
        prevList.map((task) =>
          task.id === taskId ? { ...task, description: newDescription } : task
        )
      );
    }
  };

  return (
    <div className="home-container">
      <div className="home-container-title">
        <h1>مهامي</h1>
      </div>

      <div className="home-container-navbar">
        <button
          type="button"
          className="home-container-navbar-btn"
          style={filter === 'all' ? { backgroundColor: '#ccc' } : {}}
          onClick={() => handleFilterChange('all')}>
          الكل
        </button>
        <button
          type="button"
          className="home-container-navbar-btn"
          style={filter === 'done' ? { backgroundColor: '#ccc' } : {}}
          onClick={() => handleFilterChange('done')}>
          منجز
        </button>
        <button
          type="button"
          className="home-container-navbar-btn"
          style={filter === 'unfinished' ? { backgroundColor: '#ccc' } : {}}
          onClick={() => handleFilterChange('unfinished')}>
          غير منجز
        </button>
      </div>

      <div className="list-container">
        {filteredTasks.map((task) => (
          <TaskContainer
            key={task.id}
            taskId={task.id}
            taskDescription={task.description}
            isDone={task.isDone}
            handleRemoveTask={handleRemoveTask}
            handleFinishTask={handleFinishTask}
            handleEditTask={handleEditTask}
          />
        ))}
      </div>

      <div className="add-task-container">
        <input
          type="text"
          ref={taskInputRef}
          className="add-task-input"
          placeholder="أدخل مهمة جديدة"
        />
        <button
          type="button"
          className="add-task-button"
          onClick={handleAddTask}>
          اضافة مهمة جديده
        </button>
      </div>
    </div>
  );
}

export default HomeContainer;
