"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const QuizCards = ({ quizCards, isUser, isAdmin }) => {
  const router = useRouter();

  const user = useSelector((state) => state.user);
  // console.log(user?.user?._id);
  const id = user?.user?._id;
  console.log(id, ">>>>>>>>>>>");

  return (
    <>
      <div className="flex flex-wrap">
        {quizCards.map((cards) => {
          return (
            <div
              key={cards._id}
              className="w-full sm:w-1/3 md:w-1/4 my-15 mx-5"
            >
              <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {cards.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {cards.description}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Time:{cards.timer}
                </p>
                <div className="flex justify-end dark:hover:bg-gray-700">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => router.push(`/questions/${cards._id}`)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Questions
                    </button>
                  )}
                  {isUser && (
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/questions/${cards._id}/${id}`)
                      }
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Questions
                    </button>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuizCards;
