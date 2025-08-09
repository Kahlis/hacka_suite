import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn, Event } from "@tauri-apps/api/event";
import "./App.css";
import { BooleanRecordView } from "./BooleanView";
import { getCurrentWindow } from "@tauri-apps/api/window";

// Definição dos tipos
interface KeyEvent {
  key: string;
  state: "Press" | "Release";
  timestamp: number;
}

// Teclas que queremos monitorar
const interestKeys: Record<string, boolean> = {
  ControlLeft: false,
  AltLeft: false,
  ShiftLeft: false,
  F12: false,
  Space: false,
  KeyW: false, // Tecla W
  KeyA: false, // Tecla A
  KeyS: false, // Tecla S
  KeyD: false, // Tecla D
};

function App() {
  const [keys, setKeys] = useState<Record<string, boolean>>(interestKeys);
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [windowActive, setWindowActive] = useState<boolean>(true);

  listen<KeyEvent>("toggle_request", async (_) => {
    if (windowActive) {
      await getCurrentWindow().hide();
    } else {
      await getCurrentWindow().show();
    }
    setWindowActive(!windowActive);
  });

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <div className="keyboard-status">
        <h2>Keyboard Status</h2>
        <div className="active-keys">
          windowActive: {windowActive ? "Active" : "Inactive"}
        </div>
      </div>
    </main>
  );
}

export default App;
