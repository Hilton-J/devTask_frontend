import { useState } from "react";
import { usePost } from "../hook/usePost";

const WordSorter = () => {
  const [email, setEmail] = useState("");
  const [endpointURL, setEndpointURL] = useState("");

  const { data, loading, error, post } = usePost(
    "https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task",
  );

  const handleSubmit = async () => {
    await post(endpointURL, email);
  };

  return (
    <div className="border-2 border-solid border-gray-300 p-4 rounded  mx-auto">
      <form className="flex flex-col gap-4 w-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border-2 border-solid border-gray-300 p-2 rounded"
          required
        />
        <input
          type="url"
          pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
          value={endpointURL}
          onChange={(e) => setEndpointURL(e.target.value)}
          placeholder="Enter the API endpoint URL"
          className="border-2 border-solid border-gray-300 p-2 rounded"
          required
        />
        <button
          onSubmit={handleSubmit}
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Testing..." : "Test URL"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data?.message && (
          <div>
            <h3>Result:</h3>
            <p>{data.message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default WordSorter;
