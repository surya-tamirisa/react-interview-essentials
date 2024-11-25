import React, { useState } from "react";

// Import all modules
import FillerComponent from "./Components/LearningModules/FillerComponent";
import LearningModuleOne from "./Components/LearningModules/LearningModuleOne";
import LearningModuleTwo from "./Components/LearningModules/LearningModuleTwo";
import LearningModuleThree from "./Components/LearningModules/LearningModuleThree";
import LMFive from "./Components/LearningModules/LMFive";
import LMFour from "./Components/LearningModules/LMFour";
import LMSix from "./Components/LearningModules/LMSix";
import LMSeven from "./Components/LearningModules/LMSeven";
import EMOne from "./Components/ExerciseModules/EMOne";
import EMTwo from "./Components/ExerciseModules/EMTwo";
import EMThree from "./Components/ExerciseModules/EMThree";
import EMFour from "./Components/ExerciseModules/EMFour";
import EMFive from "./Components/ExerciseModules/EMFive";
import EMSix from "./Components/ExerciseModules/EMSix";
import LMEight from "./Components/LearningModules/LMEight";
import EM7 from "./Components/ExerciseModules/EM7";
import EM8 from "./Components/ExerciseModules/EM8";
import EM9 from "./Components/ExerciseModules/EM9";
import EM10 from "./Components/ExerciseModules/EM10";
import EM11 from "./Components/ExerciseModules/EM11";
import EM12 from "./Components/ExerciseModules/EM12";
import EM13 from "./Components/ExerciseModules/EM13";
import CounterComponentWrapper from './Components/ReduxCreateSlice/CounterComponentWrapper';
import EM14 from "./Components/ExerciseModules/EM14";
import EM15 from "./Components/ExerciseModules/EM15";

// Centralized component mapping
const COMPONENTS = {
  "Learning Modules": {
    FillerComponent,
    LearningModuleOne,
    LearningModuleTwo,
    LearningModuleThree,
    LMFive,
    LMFour,
    LMSix,
    LMSeven,
    LMEight,
  },
  "Exercise Modules": {
    EMOne,
    EMTwo,
    EMThree,
    EMFour,
    EMFive,
    EMSix,
    EM7,
    EM8,
    EM9,
    EM10,
    EM11,
    EM12,
    EM13,
    EM14,
    EM15
  },
  "Other Modules": {
    CounterComponentWrapper
  },
};

const App = () => {
  const [category, setCategory] = useState(""); // Selected category
  const [module, setModule] = useState(""); // Selected module

  // Dynamically load the selected component
  const SelectedComponent = category && module ? COMPONENTS[category][module] : null;

  const selectionContainerStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div className="App">
      <h1>React Practice Hub</h1>

      {/* Selection Container */}
      <div style={selectionContainerStyle}>
        {/* Category Selection */}
        <div>
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setModule(""); // Reset module on category change
            }}
            style={{ marginLeft: "10px" }}
          >
            <option value="">--Select Category--</option>
            {Object.keys(COMPONENTS).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Module Selection */}
        {category && (
          <div style={{ marginTop: "15px" }}>
            <label htmlFor="module">Select Module:</label>
            <select
              id="module"
              value={module}
              onChange={(e) => setModule(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">--Select Module--</option>
              {Object.keys(COMPONENTS[category]).map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Render Selected Component */}
      <div className="module-container">
        {SelectedComponent ? <SelectedComponent /> : <p>Please select a module to load.</p>}
      </div>
    </div>
  );
};

export default App;
