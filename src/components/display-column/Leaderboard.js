import { useState, useEffect } from "react";
import { getLeaderboard } from "../../services/api";

export default function Leaderboard() {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getLeaderboard();
      setLeaderboardData(response.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalShowing) {
      fetchLeaderboard();
    }
  }, [isModalShowing]);

  return (
    <>
      <button
        className="mt-1 ml-4 p-0.5 border-2 rounded-sm hover:border-green-700"
        onClick={() => setIsModalShowing(true)}
      >
        Leaderboard
      </button>

      {isModalShowing && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950/80 z-99">
          <div className="bg-gray-800 p-4 rounded shadow-lg max-w-3xl w-full">
            <h2 className="text-lg font-bold mb-2">Leaderboard</h2>

            {isLoading && <p>Loading leaderboard data...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {!isLoading && !error && (
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b pb-1">
                      <th className="p-2">Rank</th>
                      <th className="p-2">Username</th>
                      <th className="p-2">Total LoC</th>
                      <th className="p-2">LoC/s</th>
                      <th className="p-2">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{entry.username}</td>
                        <td className="p-2">
                          {parseFloat(entry.total_loc).toLocaleString()}
                        </td>
                        <td className="p-2">
                          {parseFloat(entry.loc_per_second).toLocaleString()}
                        </td>
                        <td className="p-2">
                          {new Date(entry.last_updated).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {leaderboardData.length === 0 && (
                  <p className="p-2">
                    No leaderboard data available yet. Be the first to save your
                    progress!
                  </p>
                )}
              </div>
            )}

            <div className="mt-2">
              <button
                onClick={() => setIsModalShowing(false)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
