// pages/index.tsx

import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjusted the import to match the directory
import Canvas from "../components/Canvas";   // Adjusted the import to match the directory

const Home: React.FC = () => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    shapeType: string
  ) => {
    const dataTransfer = e.dataTransfer;
    if (dataTransfer) {
      dataTransfer.setData("text/plain", shapeType);
    }
  };

  const [sharedValue, setSharedValue] = useState<boolean>(false);

  const updateValue = (newValue: boolean) => {
    console.log("okokok");
    setSharedValue(newValue);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar 
        onDragStart={handleDragStart} 
        isDrawRectangle={sharedValue} 
        handleDrawRectangle={updateValue} 
      />
      <Canvas 
        isDrawRectangle={sharedValue} 
        handleDrawRectangle={updateValue} 
      />
    </div>
  );
};

export default Home;
