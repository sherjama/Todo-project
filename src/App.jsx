import React, { useEffect, useState } from "react";

import {
  pinkForest,
  pinkSky,
  darkMountains,
  blueSky,
  fogInForest,
  GreenForest,
  RaininginRoad,
  SnowMountain,
  SunsetCityscape,
  WhiteAmazon,
  StatesProvider,
  MediaProvider,
  MdOutlineDeleteOutline,
  Header,
  Footer,
  Taskfields,
} from "./index";

const App = () => {
  // All States is here :-

  const [todos, setTodos] = useState([]);
  const [date, setdate] = useState("");
  const [Time, setTime] = useState("");
  const [IsWindowOpend, setIsWindowOpend] = useState(false);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [Background, setBackground] = useState(pinkForest);
  const [Search, setSearch] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  const [IsSearching, setIsSearching] = useState(false);

  // background changer functionality -->
  const BackgroundChanger = (bg) => {
    switch (bg) {
      case "blue Sky":
        setBackground(blueSky);

        break;
      case "dark Mountains":
        setBackground(darkMountains);

        break;
      case "pink Sky":
        setBackground(pinkSky);

        break;
      case "pink Forest":
        setBackground(pinkForest);

        break;
      case "Fog in Forest":
        setBackground(fogInForest);

        break;
      case "Green Forest":
        setBackground(GreenForest);

        break;
      case "Raining in Road":
        setBackground(RaininginRoad);

        break;
      case "Snow Mountain":
        setBackground(SnowMountain);

        break;
      case "Sunset Cityscape":
        setBackground(SunsetCityscape);

        break;
      case "WhiteAmazon":
        setBackground(WhiteAmazon);

        break;

      default:
        setBackground(pinkForest);
        break;
    }
  };
  // Curd methods :-

  const addTodo = (todo) => {
    setTodos((prev) => [
      { date: date, time: Time, id: Date.now(), ...todo },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const HistoryTaker = (todo) => {
    setCompletedTodos((prev) => [{ ...todo }, ...prev]);
  };

  const HistoryDeleteFunc = () => {
    setCompletedTodos([]);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  //IsSearching or not
  const searchingIsLive = () => {
    if (Search.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // searchReasult
  useEffect(() => {
    let querry = Search.toLowerCase();
    const CombindArrays = [...todos, ...CompletedTodos];
    setSearchResult(() =>
      CombindArrays.filter((todo) => todo.task.toLowerCase().includes(querry))
    );
    searchingIsLive();
  }, [Search]);

  // Date and Time functionality :-

  useEffect(() => {
    const dateAndTimefunc = () => {
      const now = new Date();
      const monthsOfYear = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthsOfYear[now.getMonth()];
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeek = daysOfWeek[now.getDay()];

      setdate(`${dayOfWeek}, ${month} ${day}`);
      setTime(`${hours}:${minutes}`);
    };

    dateAndTimefunc();
  }, [todos]);

  // LocalStorage :-

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    const CTFLS = JSON.parse(localStorage.getItem("completedTodos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }

    if (CTFLS && CTFLS.length > 0) {
      setCompletedTodos(CTFLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(CompletedTodos));
  }, [CompletedTodos]);

  useEffect(() => {
    IsWindowOpend ? setBackground(darkMountains) : setBackground(pinkForest);
    console.log(IsSearching);
  }, [IsWindowOpend, Search]);

  return (
    <>
      <StatesProvider
        value={{
          addTodo,
          updateTodo,
          deleteTodo,
          toggleComplete,
          setIsWindowOpend,
          HistoryTaker,
          IsSearching,
        }}
      >
        <MediaProvider
          value={{
            pinkForest,
            pinkSky,
            darkMountains,
            blueSky,
            fogInForest,
            GreenForest,
            RaininginRoad,
            SnowMountain,
            SunsetCityscape,
            WhiteAmazon,
          }}
        >
          {/* Main Container --> */}
          <div
            className="w-full h-screen flex justify-evenly bg-no-repeat object-cover bg-cover overflow-hidden"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          >
            {/* -- */}
            <div className="max-lg:hidden w-2/6 h-screen bg-transparent flex items-center bg-slate-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-55 border-l-2 border-gray-900">
              <div className="m-auto h-[95%] w-11/12 ">
                {/* sarch_Box */}
                <div className="w-full flex flex-col h-min ">
                  <input
                    placeholder="Search"
                    className="w-[97%] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-45 h-8
                focus:outline-none p-2
                text-gray-900 placeholder:text-gray-900"
                    type="search"
                    name="TaskSeach"
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div
              className=" w-full h-full bg-no-repeat object-cover bg-cover"
              // style={{
              //   backgroundImage: `url(${Background})`,
              // }}
            >
              {/* header  */}
              <div className="w-full h-[18%] pb-2 px-10 flex flex-col justify-around ">
                <Header bgChangerFunction={BackgroundChanger} />
              </div>
              {/* ----------------------------- */}
              {/* HistoryWindow */}
              <div
                className={`h-[82%] w-full  overflow-x-hidden  overflow-y-auto px-10  whitespace-nowrap ${
                  IsWindowOpend ? "" : " hidden"
                }`}
              >
                {/* deleted Button :- */}

                <div className="flex">
                  <button
                    className="text-white bg-slate-900 p-1 flex items-center rounded-md"
                    onClick={HistoryDeleteFunc}
                  >
                    <span className="text-xl pr-1 text-red-600">
                      <MdOutlineDeleteOutline />
                    </span>
                    <span className="pr-1">All</span>
                  </button>
                  <div className="text-slate-700  flex items-center pl-3">
                    <span>X {CompletedTodos.length}</span>
                  </div>
                </div>

                {/* completedTodos :- */}
                {IsSearching
                  ? SearchResult.map((todo) => (
                      <div key={todo.id} className="w-full">
                        <Taskfields
                          fullTodo={todo}
                          ForHistory={IsWindowOpend}
                        />
                      </div>
                    ))
                  : CompletedTodos.map((todo) => {
                      if (CompletedTodos.length < 0) {
                        return (
                          <div className="text-white bg-red-800 w-full ">
                            empty
                          </div>
                        );
                      }
                      return (
                        <div key={todo.id} className="w-full">
                          <Taskfields
                            fullTodo={todo}
                            ForHistory={IsWindowOpend}
                          />
                        </div>
                      );
                    })}
              </div>
              {/* ----------------------------- */}
              {/* todos  */}
              <div
                className={` w-full h-[67%] px-10 ${
                  IsWindowOpend ? " hidden" : ""
                }`}
              >
                <div
                  id="hideScroll"
                  className=" h-full overflow-x-hidden  overflow-y-auto whitespace-nowrap "
                >
                  {IsSearching
                    ? SearchResult.map((todo) => (
                        <div key={todo.id} className="w-full">
                          <Taskfields
                            fullTodo={todo}
                            ForHistory={todo.completed}
                          />
                        </div>
                      ))
                    : todos.map((todo) => (
                        <div key={todo.id} className="w-full">
                          <Taskfields fullTodo={todo} />
                        </div>
                      ))}
                </div>
              </div>
              {/* footer  */}
              <div
                className={`w-full h-[15%] py-2 px-10 relative bottom-0 ${
                  IsWindowOpend ? " hidden" : ""
                }`}
              >
                <Footer />
              </div>
            </div>
          </div>
        </MediaProvider>
      </StatesProvider>
    </>
  );
};

export default App;
