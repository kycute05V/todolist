import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import Divider from "../Divider"
import "./style.scss";
import React from "react";

const Task = (props) => {
  const {TaskName,isDone,id} = props.task
  const {handleRemoveTask,handleMakeDoneTask} = props
  console.log(props);
    return <React.Fragment>
        <div className='task'>
              <p className={`task_name ${isDone ? "task--done" :""}`}>
                {TaskName}
                </p>
              <div className='task_groups-btn'>
                <button 
                className={"task_btn-done"}
                onClick={()=> handleMakeDoneTask(id)}
                >
                  <CheckOutlined/>
                </button>
                <button className='task_btn-del'
                onClick={() =>handleRemoveTask(id)}>
                  <DeleteOutlined/>
                  </button>
              </div>
            </div>
            <Divider />
    </React.Fragment>
}
export default Task;