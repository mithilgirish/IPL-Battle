import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function ParticipantsPage() {
  const [balance, setBalance] = useState(0);
  const uid = useRef('')
  const [players, setPlayers] = useState({});
  const [boughtPlayers, setBoughtPlayers] = useState({});
  const [name, setName] = useState("");
  const [currPlayer, setCurrPlayer] = useState(null);
  const socketRef = useRef(null);
  const playersRef = useRef({})

  const params = useParams()

  useEffect(() => {
    const storedRoomUid = params.room_id;
    const authToken = localStorage.getItem("token");

    if (storedRoomUid && authToken) {
      connectWebSocket(storedRoomUid, authToken);
    } else {
      console.error("room_uid or token not found in localStorage.");
    }

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const connectWebSocket = (roomUid, authToken) => {
    const ws = new WebSocket(`wss://ipl-battle.onrender.com/room/${roomUid}/`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ action: "AUTH", token: authToken }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);

        if (message.all_players !== undefined) {
          setPlayers(message.all_players);
          setBalance(message.balance);
          setBoughtPlayers(message.players);
          setName(message.name);
          uid.current = message.uid
          playersRef.current = message.all_players

          setCurrPlayer(message.all_players[message.curr_player]);
        }

        if (message.type === "curr_player") {
          setCurrPlayer(playersRef.current[message.player_uid]);
        }

        if (message.type == "team_player" && uid.current == message.uid) {
          const prevPlayers = structuredClone(boughtPlayers);
          prevPlayers[message.entry_id] = {
            "price": message.price,
            "player_id": message.player
          }
          setBoughtPlayers(prevPlayers)
        }

        if (message.type == "revert_player" && uid.current == message.uid) {
          setBoughtPlayers(prevPlayers => {
            const newPlayers = {...prevPlayers }
            delete newPlayers[message.entry_id]
            return newPlayers
          })
        }

      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };


  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Participants</h1>
          <div className="bg-gray-800/60 rounded-lg px-4 py-2 backdrop-blur-sm">
            Available Balance: ₹{balance}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Current Player */}
          <div className="bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 text-center px-4">
                {currPlayer ? `${currPlayer.name}` : "No active player auctioning"} <br />
                {currPlayer ? `Domain: ${currPlayer.domain}` : ""} <br />
                {currPlayer ? currPlayer.is_domestic ? "Domestic" : "Foreign" : ""} <br />
                {currPlayer ? 'Score: ' + currPlayer.score : ""}
              </p>
            </div>
          </div>

          {/* List of Players Bought */}
          <div className="md:col-span-2 bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">List of players bought by {name}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4">S.no</th>
                    <th className="text-left py-3 px-4">Player Name</th>
                    <th className="text-left py-3 px-4">Domain</th>
                    <th className="text-left py-3 px-4">Country</th>
                    <th className="text-left py-3 px-4">Bought at Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(boughtPlayers ?? {}).map((player, index) => { 
                      const playerDetails = players[boughtPlayers[player].player_id];
                      console.log(boughtPlayers[player].player_id)

                      
                      return (
                        <tr key={player} className="border-b border-gray-800">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{playerDetails ? playerDetails.name : "Unknown"}</td>
                          <td className="py-3 px-4">{playerDetails ? playerDetails.domain : "Unknown"}</td>
                          <td className="py-3 px-4">
                          {playerDetails ? (playerDetails.is_domestic ? "Domestic" : "International") : "Unknown"}
                          </td>         
                          <td className="py-3 px-4">₹{boughtPlayers[player].price}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ParticipantsPage;
