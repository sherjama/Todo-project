import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  MdDriveFileRenameOutline,
  MdOutlineDeleteOutline,
  MdCancel,
} from "react-icons/md";

import { LuCalendarHeart } from "react-icons/lu";
import useAllStates from "../../contexts/states";

const Taskfields = ({ fullTodo, ForHistory }) => {
  console.log(fullTodo);

  // states
  const [todo, settodo] = useState(fullTodo.task);
  const [toggle, settoggle] = useState();
  const [IsTodoEditable, setIsTodoEditable] = useState(false);

  // date and time
  const Date = fullTodo.date;
  const Time = fullTodo.time;

  // contexts
  const { deleteTodo, updateTodo, toggleComplete, HistoryTaker } =
    useAllStates();

  // functions

  const CheckBoxHandler = (e) => {
    const checkBox = e.currentTarget.children[0].classList;
    if (!toggle) {
      checkBox.remove("hidden");
      settoggle(true);
    } else {
      checkBox.add("hidden");
      settoggle(false);
    }
    toggleComplete(fullTodo.id);
  };

  const deleteHandler = () => {
    HistoryTaker({
      id: fullTodo.id,
      task: todo,
      date: Date,
      time: Time,
      completed: true,
    });
    deleteTodo(fullTodo.id);
  };

  const edit = (e) => {
    e.preventDefault();
    updateTodo(fullTodo.id, { ...fullTodo, task: todo });
    setIsTodoEditable(false);
  };

  return (
    // Main Container -->
    <div className="w-full h-16 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-75 mt-5 min-h-min ">
      <div className="FieldContainer min-h-min flex items-center h-[70%] px-2">
        <div>
          {/* checkBox Icon --> */}
          <div
            id="CustomCheckBox"
            className="size-5 flex items-center justify-center bg-transparent border-2 border-solid border-gray-400 rounded-full text-white mr-2"
            onClick={CheckBoxHandler}
            readOnly={!ForHistory}
          >
            <span className={` ${ForHistory ? " " : " hidden"}`}>
              <FaCheck className="checkMark  size-3" />
            </span>
          </div>
        </div>
        <div className="w-10/12">
          {/* Inputs & Task Content --> */}
          <form onSubmit={edit} autoComplete="off">
            {IsTodoEditable && (
              <input
                className={`w-full flex    text-gray-200 focus:outline-0 text-lg bg-slate-900 bg-opacity-20 rounded-md backdrop-filter backdrop-blur-sm px-2 py-1`}
                type="text"
                name="Edit"
                id={fullTodo.id}
                value={todo}
                onChange={(e) => settodo(e.target.value)}
                readOnly={!IsTodoEditable}
              />
            )}
          </form>
          {!IsTodoEditable && (
            <p
              className={`py-1 w-full text-gray-200 whitespace-normal break-words ${
                toggle ? "line-through" : ""
              }${ForHistory ? " line-through" : ""}`}
            >
              {fullTodo.task}
            </p>
          )}
        </div>

        {/* delete & Rename Button --> */}
        <div className="w-1/12 flex justify-end mr-3">
          {toggle ? (
            <span
              id="deleteBtn"
              className={`text-red-400 text-2xl ${ForHistory ? " hidden" : ""}`}
              onClick={() => deleteHandler()}
            >
              <MdOutlineDeleteOutline />
            </span>
          ) : (
            <span
              id="renameBtn"
              className="text-gray-300  text-2xl"
              onClick={() => {
                setIsTodoEditable((prev) => !prev);
                document.getElementById(fullTodo.id).focus();
                return;
              }}
            >
              {IsTodoEditable ? (
                <span>
                  <MdCancel />
                </span>
              ) : (
                <span className={`${ForHistory ? " hidden" : ""}`}>
                  <MdDriveFileRenameOutline />
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Date & Time Container --> */}
      <div className="w-full h-[30%] pl-8  flex items-center text-gray-300  relative bottom-1">
        {/* icon */}
        <span>
          <LuCalendarHeart />
        </span>

        <div className="w-full ml-2 text-sm flex items-center justify-between ">
          {/* date */}
          <span>{Date}</span>
          {/* time */}
          <span className="pr-4 text-slate-500 text-[.8rem]">{Time}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskfields;
