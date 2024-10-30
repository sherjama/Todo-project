import React, { useEffect, useState } from "react";

import { FcTodoList } from "react-icons/fc";
import { TbAlignBoxLeftStretch } from "react-icons/tb";
import { MdHistory, MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import useAllStates from "../../contexts/states";
import Cover from "./Cover";

const Header = ({ bgChangerFunction }) => {
  // All states is here -->
  const { setIsWindowOpend, IsSearching } = useAllStates();

  const [HeadLine, setHeadLine] = useState("Tasks");
  const [Toggle, setToggle] = useState(false);
  const [i, seti] = useState(1);

  // Handlers :-

  const HistoryWindowHandler = () => {
    setIsWindowOpend((prev) => !prev);
    if (Toggle) {
      setHeadLine("Tasks");
      setToggle(false);
    } else {
      setHeadLine("History");
      setToggle(true);
    }
  };

  useEffect(() => {
    const searchingIsLive = () => {
      let Icon_container = document.getElementsByClassName("Icon_container");
      IsSearching ? setHeadLine("Search Results") : setHeadLine("Task");
      IsSearching
        ? Icon_container[0].classList.add("hidden")
        : Icon_container[0].classList.remove("hidden");
    };
    searchingIsLive();
  }, [IsSearching]);

  const MenuHandler = () => {
    let cross = document.getElementById("cross");
    let iconBG = document.getElementById("iconBG");

    if (i) {
      iconBG.style.display = "none";
      cross.style.display = "block";
      seti(0);
    } else {
      iconBG.style.display = "block";
      cross.style.display = "none";
      seti(1);
    }
  };

  return (
    <>
      {/* Logo --> */}
      <div className="menu_bar text-white text-2xl flex items-start">
        <div className="flex text-sm items-center justify-center border-solid border-b-2 border-blue-200 p-1 rounded-md">
          <span>
            <FcTodoList />
          </span>
          <span className="text-sm text-blue-300">myTodo</span>
        </div>
      </div>

      {/* HeadLine --> */}
      <div className="w-full flex justify-between ">
        <div className="text-white text-2xl flex items-center justify-between">
          <TbAlignBoxLeftStretch />
          <h1 className="pl-3">{HeadLine}</h1>
        </div>

        {/* history Button --> */}
        <div className="Icon_container text-white text-2xl flex ml-10 items-center cursor-pointer">
          <span onClick={HistoryWindowHandler}>
            {Toggle ? <FaCheck title="Todos" /> : <MdHistory title="History" />}
          </span>
          {/* backgroundChangerButton --> */}
          <div className="ml-5 cursor-pointer">
            <span id="menuBar" onClick={MenuHandler}>
              <span id="iconBG" className="text-lg ">
                BG
              </span>
              <span id="cross" className="hidden ">
                <MdCancel />
              </span>
            </span>

            {/* backgrounds--> */}
            {!i && (
              <div
                id="bgSlider"
                className="w-min absolute z-10 right-[5%] top-[16%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-75 bg-slate-900 p-3 rounded-lg "
              >
                <Cover bgChanger={bgChangerFunction} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
