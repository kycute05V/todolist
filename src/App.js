import {Input, Pagination} from 'antd';
import "./app.scss";
import {CheckOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Task from './components/Task';
import Divider from './components/Divider';
import ForminputTask from './components/ForminputTask';
import { useEffect, useState } from 'react';

// const ListTask = [
//   {
//     id: 1,
//     TaskName: "Task 1",
//     isDone: false
//   },
//   {
//     id: 1,
//     TaskName: "Task 2",
//     isDone: false
//   },
//   {
//     id: 1,
//     TaskName: "Task 3",
//     isDone: false
//   },
//   {
//     id: 1,
//     TaskName: "Task 4",
//     isDone: false
//   },
// ];
const KEY_TASK_LIST = "tasks";

function App() {

const[tasks,setTasks] = useState(JSON.parse(localStorage.getItem(KEY_TASK_LIST)) || []);

const[pagination, setPagination] = useState({
  currentPage: 1,
  dataPerPage: [],
  limitPerPage: 5,
});

  const renderTaskList = (tasks) =>{
    return tasks.map((task)=>(
      <Task key={task.id} task={task} 
      handleRemoveTask={handleRemoveTask}
      handleMakeDoneTask={handleMakeDoneTask}/>
    ));
  };

  const handleRemoveTask = (taskId)=>{
    const _taskList = tasks.filter(task=>task.id!=taskId)
    setTasks(_taskList);
    localStorage.setItem(KEY_TASK_LIST,JSON.stringify([_taskList]));
  };

  const handleMakeDoneTask = (taskId) =>{
    const existedTaskById = tasks.findIndex((task) => task.id === taskId);
    const _taskList = [...tasks];
    _taskList[existedTaskById]={
      ..._taskList[existedTaskById],
      isDone:true,
    };
    setTasks(_taskList);
    localStorage.setItem(KEY_TASK_LIST,JSON.stringify([..._taskList]));
  };
 
const handleAddTask = (TaskName) =>{
  console.log(TaskName, 'TaskName ne:');
  const _task = {
    id: new Date().getTime(),
    TaskName: TaskName,
    isDone: false,
  };
  setTasks([_task,...tasks])
  localStorage.setItem(KEY_TASK_LIST,JSON.stringify([_task,...tasks]));
};

const handleChangePage = (page)=>{
  setPagination({
    ...pagination,
    currentPage: page,
  });
};

useEffect(()=>{
  if(!tasks.length){
      setPagination({
        ...pagination,
        dataPerPage:[],
      });
      return;
  };
  const _taskList = [...tasks];
  const startIndex = (pagination.currentPage - 1) * pagination.limitPerPage;
  const endIndex = pagination.currentPage * pagination.limitPerPage;
  const tasksPerPage = _taskList.slice(startIndex,endIndex);
  setPagination({
    ...pagination,
    dataPerPage: [...tasksPerPage],
  });
},[tasks,pagination.currentPage])
  return (
    <div className="App">
      <div className='todo-list-container'>
        <div className='todo-list-wrapper'>
          <ForminputTask handleAddTask = {handleAddTask}/>

          <div className='todo-list-main'>
            {!tasks.length && <div>Please input your task</div>}
            {renderTaskList(pagination.dataPerPage)}
          </div>
          <Divider/>
          <div className='todo-list-pagination'>
          <Pagination 
          defaultCurrent={pagination.currentPage}
          current={pagination.currentPage}
          onChange={(page)=>handleChangePage(page)}
          total={tasks.length} 
          pageSize={pagination.limitPerPage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
