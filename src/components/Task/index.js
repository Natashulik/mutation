import { useDeleteToDoMutation, useGetToDosQuery, useEditToDoMutation, useCompleteToDoMutation } from "../../services/toDo";
import { useState } from "react";

const Task = ({ id, title, isCompleted }) => {
  const [deleteToDo] = useDeleteToDoMutation();
  const [ editToDo ] = useEditToDoMutation();
  const [completeToDo] = useCompleteToDoMutation();

  const {  data, refetch } = useGetToDosQuery();
 
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
 
  const handleDeleteToDo = async(id)=> {
   await deleteToDo(id);
   refetch();
  }

  const handleEdit = async({id, newTitle})=> {
   await editToDo({id, newTitle});
    refetch();
   }

   const toggle = () =>{
    if(isEdit) {
      handleEdit({id, newTitle});
     setTimeout(()=>setIsEdit(!isEdit), 600);
    } else {
      setIsEdit(!isEdit);
    } }

  const handleCompleted = async(id) =>{
    const taskData = data.find(task => task.id === id);
    await completeToDo({id, isCompleted: !taskData.isCompleted});

    refetch();
   }

  return (
    <li className="task">
      <input type="checkbox" onChange={()=>handleCompleted(id)}  checked={isCompleted}/>
      {isEdit?  <input onChange={event => setNewTitle(event.target.value)} value={newTitle} />: 
                 <p className={isCompleted? "title line-through" : "title"}>{title}</p>}
      <button onClick={()=>toggle()}>edit</button>
      <button onClick={()=>handleDeleteToDo(id)}>delete</button>
    </li>
  );
};

export default Task;
