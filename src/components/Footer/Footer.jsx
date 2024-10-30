import { FaPlus } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { LuCalendarHeart } from "react-icons/lu";
import { IoAlarmOutline } from "react-icons/io5";
import { PiHouse } from "react-icons/pi";
import useAllStates from "../../contexts/states";
import { useEffect, useState } from "react";

const Footer = () => {
  // ----------All States-----------
  const [task, settask] = useState("");
  const { addTodo } = useAllStates();

  const [PlaceHolder, setPlaceHolder] = useState("Add task");
  const [taskLength, settaskLength] = useState(0);

  // -------Handlers-----------------
  const add = (e) => {
    e.preventDefault();

    if (!task) return;

    addTodo({ task, completed: false });
    settask("");
    const iconContainer = document.getElementById("iconContainer");
    iconContainer.classList.remove("flex");
    iconContainer.classList.add("hidden");
  };

  const blurHandler = () => {
    setPlaceHolder("Add task");
    plusIcon.classList.remove("hidden");
    taskCrcl.classList.add("hidden");
  };

  const focusHandler = () => {
    setPlaceHolder("Try typing 'Pay bill by Friday 6pm'");
    const todoINput = document.getElementById("todoInput");
    const plusIcon = document.getElementById("plusIcon").classList;
    const taskCrcl = document.getElementById("taskCrcl").classList;
    todoINput.focus();
    plusIcon.add("hidden");
    taskCrcl.remove("hidden");
  };

  useEffect(() => {
    if (taskLength > 0) {
      iconContainer.classList.add("flex");
      iconContainer.classList.remove("hidden");
    } else {
      iconContainer.classList.remove("flex");
      iconContainer.classList.add("hidden");
    }
  }, [taskLength]);

  return (
    <>
      <div className="inputBox_conteiner flex w-full h-full items-center justify-center ">
        <div
          id="inputBox"
          className="w-full h-[58%] bg-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-45 flex items-center px-3 hover:bg-opacity-30 hover:bg-gray-950"
          onClick={focusHandler}
        >
          <div className="w-7 h-7  rounded-full  mr-2 text-2xl font-thin flex items-center justify-center ">
            <span id="taskCrcl" className="text-gray-200 hidden">
              <FaRegCircle />
            </span>
            <span id="plusIcon" className="text-gray-200">
              <FaPlus />
            </span>
          </div>
          <form onSubmit={add} autoComplete="off" className="w-full">
            <input
              type="text"
              name="todo's"
              id="todoInput"
              placeholder={PlaceHolder}
              className="w-full h-full bg-transparent text-gray-200 focus:outline-0 text-xl"
              value={task}
              onChange={(e) => {
                settask(e.target.value);
                settaskLength(e.target.value.length);
              }}
              onBlur={blurHandler}
            />
          </form>
          <div
            className="w-max h-full items-center justify-evenly text-xl  text-gray-200 hidden"
            id="iconContainer"
          >
            <span className="flex items-center hover:bg-opacity-30 hover:bg-gray-600 rounded-md p-1  mr-3">
              <PiHouse />
              <p className="ml-1">Tasks</p>
            </span>

            <span className="hover:bg-opacity-30 hover:bg-gray-600 rounded-md p-2 mr-3">
              <LuCalendarHeart />
            </span>

            <span className="text-2xl hover:bg-opacity-30 hover:bg-gray-600 rounded-md p-2">
              <IoAlarmOutline />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
