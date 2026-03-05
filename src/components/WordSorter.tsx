import { useState } from "react";
import { usePost } from "../hook/usePost";

interface SortRequest {
  data: string;
}

interface SortResponse {
  word: string[];
  error?: string;
}

const WordSorter = () => {
  const [inputValue, setInputValue] = useState("");

  const { data, loading, error, post } = usePost<SortResponse, SortRequest>(
    "https://lwandile-dev-task.vercel.app/api/v1/sort",
  );

  const handleSort = async () => {
    await post({ data: inputValue });
  };

  console.log("Data:", data);

  return (
    <div className="">
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a word"
          className="border-2 border-solid border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleSort}
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Sorting..." : "Sort Alphabetically"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data?.word && (
          <div>
            <h3>Result:</h3>
            <p>{data.word.join(", ")}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default WordSorter;
