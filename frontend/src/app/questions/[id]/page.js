"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { BASE_URL } from "@/utils/constant";
// import { toast } from 'react-toastify';

const QuestionPage = () => {
  const router = useRouter();
  const params = useParams(); // Use useParams instead of router.query
  const id = params.id; // Get id from params

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [load, setLoad] = useState(false);

  // Replace your Redux user selector with a simple user state or prop
  // For demonstration, assuming user role "admin" (replace with your auth logic)
  const user = { role: "admin" };
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!id) return; // wait for id to be available

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/allquestions/${id}`, {
          withCredentials: true,
        });
        if (Array.isArray(res.data)) {
          setQuestions(res.data);
        } else {
          setQuestions([]);
          console.error("Invalid response format, expected array:", res.data);
        }
      } catch (error) {
        setQuestions([]);
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id, load]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].text = value;
    setNewOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = newOptions.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setNewOptions(updatedOptions);
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || newOptions.some((opt) => !opt.text.trim())) {
      alert("Please enter a question and all 4 options.");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/addquestion/${id}`,
        {
          questionText: newQuestion,
          options: newOptions,
        },
        { withCredentials: true }
      );

      // Modified validation to handle the response better
      if (res.data) {
        setLoad(!load);
        // Refresh questions list through the load state change
        setNewQuestion("");
        setNewOptions([
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
      } else {
        console.error("No response data received");
      }
      // After successful question creation:
      if (res.data.message === "Question added successfully") {
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuiz = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletequiz/${id}`, {
        withCredentials: true,
      });
      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/deletequestion/${questionId}`,
        { withCredentials: true }
      );
      if (res) {
        setLoad(!load);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6  border border-gray-200 rounded-lg shadow-md">
      {questions?.length > 0 ? (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white-900 dark:text-gray">
          Quiz Name - {questions[0].quizId?.title || "No Title Available"}
        </h5>
      ) : (
        "No Title Available"
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleDeleteQuiz}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete Quiz
        </button>
      </div>

      {isAdmin && (
        <div className="mb-6 p-4  border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Add New Question</h2>

          <input
            type="text"
            className="w-full p-2 border rounded-md mb-3"
            placeholder="Enter new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />

          {newOptions.map((option, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correctOption"
                className="w-5 h-5"
                checked={option.isCorrect}
                onChange={() => handleCorrectOptionChange(index)}
              />
            </div>
          ))}

          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 mt-2"
            onClick={handleAddQuestion}
          >
            Add Question with Options
          </button>
        </div>
      )}

      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((question, qIndex) => (
          <div
            key={question._id || qIndex}
            className="mb-6 p-4 border rounded-lg bg-gray-50"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question._id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete Question
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {question.questionText}
            </h2>
            {Array.isArray(question.options) &&
              question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="text-gray-900">{option.text}</span>
                  {option.isCorrect && (
                    <span className="text-green-600 font-bold">✔ Correct</span>
                  )}
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>No questions available. Add a new question!</p>
      )}
    </div>
  );
};

export default QuestionPage;
