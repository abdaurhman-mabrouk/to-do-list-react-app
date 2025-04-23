/* eslint-disable no-unused-vars */
import React from 'react';
import './TaskContainer.css';

function TaskContainer(props) {
  console.log(props);
  return (
    <div
      key={props.taskId}
      id={'task' + props.taskId}
      className={`task-container ${
        props.isDone ? 'done-task' : 'unfinished-task'
      }`}>
      <div className="task-description">{props.taskDescription}</div>

      <div className="task-btns-container">
        <button
          type="button"
          className="remove-task-btn"
          onClick={() => {
            props.handleRemoveTask(props.taskId);
          }}>
          إزالة
        </button>

        <button
          type="button"
          className="finish-task-btn"
          onClick={() => {
            props.handleFinishTask(props.taskId);
          }}>
          أُنجزت
        </button>

        <button
          type="button"
          className="edit-task-btn"
          onClick={() => {
            props.handleEditTask(props.taskId);
          }}>
          تعديل
        </button>
      </div>
    </div>
  );
}

export default TaskContainer;
