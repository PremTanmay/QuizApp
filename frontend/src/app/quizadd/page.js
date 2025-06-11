"use client"; // if using app/ directory

import { useState } from "react";
import { BASE_URL } from "@/utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";

const QuizAdd = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0);

  const handleQuizAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/addquiz`,
        { title, description, timer },
        { withCredentials: true }
      );
      if (res.status === 201 || res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleQuizAdd}>
      <div className="mb-5 mt-10">
        <div className="flex justify-center m-4">
          <h1 className="text-5xl font-extrabold dark:text-white">
            <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
              Add Quiz Here
            </small>
          </h1>
        </div>

        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Quiz Title"
          required
        />

        <label
          htmlFor="description"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Quiz Description"
          required
        />

        <label
          htmlFor="timer"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Timer (in seconds)
        </label>
        <input
          type="number"
          id="timer"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Time limit"
          required
        />

        <div className="flex justify-center m-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuizAdd;
