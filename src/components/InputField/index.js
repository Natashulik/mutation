import { useCreateToDoMutation, useGetToDosQuery } from "../../services/toDo";
import { enterText } from "../../redux/textSlice";
import { useSelector, useDispatch } from "react-redux";

const InputField = () => {
  const dispatch = useDispatch();
  const { value: title } = useSelector((store) => store.text);
  const [ createToDo] = useCreateToDoMutation();
  const { data, error, isLoading, refetch } = useGetToDosQuery();
  
  const handleCreateToDo = async () => {
    await createToDo({ title });
    refetch();
    dispatch(enterText(''))
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => dispatch(enterText(e.target.value))}
      />
       <button onClick={handleCreateToDo}>add</button>
    </div>
  );
};

export default InputField;
