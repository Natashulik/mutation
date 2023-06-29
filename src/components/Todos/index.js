import { useGetToDosQuery } from "../../services/toDo";
import Task from "../Task";
const Todos = () => {
  const { data, error, isLoading } = useGetToDosQuery();
 
  return (
    <div className="block_tasks">
      {isLoading && <p>...loading</p>}
      <ul>{data && data.map((item) => <Task key={item.id} title = {item.title}  id= {item.id} isCompleted = {item.isCompleted}/>)}</ul>
    </div>
  );
};

export default Todos;
