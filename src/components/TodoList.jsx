import React, { useState, useContext } from "react";
import Todo from "./Todo";
import useFetch from "../hooks/useFetch";
import { globalContext } from "../Contexts/globalContext";
import Loader from "./Loader";

export default function TodoList() {
  const baseUrl = "http://localhost:4000/todoList";
  const [inputValue, setInputValue] = useState("");
  const { datas, isPending, error, setItem, editItem } = useFetch(baseUrl);
  const { toggleShadow } = useContext(globalContext);

  function addTodo() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date().toLocaleDateString("fa-IR", options);
    const newTodo = {
      id: datas.length + 1,
      title: inputValue,
      date: date,
      checked: false,
    };
    setItem(newTodo);
    setInputValue("");
  }

  function updateTodo(prevTodo) {
    const updatedTodo = {...prevTodo, checked: !prevTodo.checked}
    editItem(baseUrl, prevTodo.id, updatedTodo );
  }

  return (
    <div
      className={`${
        toggleShadow ? "shadow-active" : ""
      } box-container flex flex-col mt-8`}
    >
      <span className="text-sm">لیست وظایف روزانه</span>
      <div className="todo flex flex-col gap-3 my-8 h-[250px] overflow-hidden overflow-y-auto custom-scrollbar">
        {error && error}
        {isPending ? (
          <Loader />
        ) : (
          datas.map((info) => (
            <Todo key={info.id} {...info} onUpdate={updateTodo} />
          ))
        )}
      </div>
      <div className="flex justify-between ">
        <input
          className="outline-none text-sm rounded-s-md border-[1px] border-gray-300 py-1 px-2 placeholder:text-gray-300 placeholder:text-sm w-full"
          type="text"
          placeholder="وظیفه جدید"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded-e-md text-sm"
        >
          افزودن
        </button>
      </div>
    </div>
  );
}
