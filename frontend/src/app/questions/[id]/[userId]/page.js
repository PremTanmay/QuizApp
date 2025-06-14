"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constant";
// import { toast } from 'react-toastify';

const QuestionpageUser = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  const params = useParams();
  const router = useRouter();
  const quizId = params.id; // In Next.js, we use the [id] from the folder name
  const userId = params.userId; // You might need to pass this as a query parameter or through state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(BASE_URL + "/allquestions/" + quizId, {
          withCredentials: true,
        });

        if (Array.isArray(res.data)) {
          setQuestions(res.data);
        } else {
          console.error(
            "Invalid response format, expected an array:",
            res.data
          );
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleOptionSelect = (qId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionText,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/submitquiz/" + quizId + "/" + userId,
        {
          answers: selectedAnswers,
        },
        { withCredentials: true }
      );

      console.log("API Response:", res.data);

      if (res.data && res.data.score) {
        // toast.success(`Quiz submitted! You scored ${res.data.score}`);
        if (window.confirm(`Click OK to go to Dashboard.`)) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 m-6">
        <div className="flex justify-center">
          {questions?.length > 0 ? (
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray">
              Quiz Name- {questions[0].quizId.title}
            </h5>
          ) : (
            "No Title Available"
          )}
        </div>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="mb-6 p-4 border rounded-lg bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {question.questionText}
              </h2>
              {Array.isArray(question.options) &&
                question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                      selectedAnswers[question._id] === option.text
                        ? "bg-blue-300"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      handleOptionSelect(question._id, option.text)
                    }
                  >
                    <span className="text-gray-900">{option.text}</span>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      checked={selectedAnswers[question._id] === option.text}
                      onChange={() =>
                        handleOptionSelect(question._id, option.text)
                      }
                      className="ml-2"
                    />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>No questions available. Add a new question!</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default QuestionpageUser;
