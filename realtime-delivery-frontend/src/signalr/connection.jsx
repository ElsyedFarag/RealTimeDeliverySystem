import * as signalR from "@microsoft/signalr";

const token = localStorage.getItem("token");

export const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7254/hubs/orders", {
    accessTokenFactory: () => token,
  })
  .withAutomaticReconnect()
  .build();

export const startConnection = async () => {
  try {
    await connection.start();
    console.log("✅ SignalR Connected");
  } catch (err) {
    console.error("❌ SignalR Error:", err);
    setTimeout(startConnection, 3000);
  }
};