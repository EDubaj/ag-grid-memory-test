import React from "react";
import "ag-grid-enterprise";
import AGGridMemoryTest from "./AGGridMemoryTest";
import "./styles.css";
import SSRMAGGridTest from "./SSRAGGridMemoryTest";
import SimpleMemoryTest from "./SimpleMemoryTest";
import VanillaAGGrid from "./VanillaJSAGGridMemoryTest";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MemoryTestRowData from "./MemoryTestRowData";

export default function App() {
  return (
    <div>
      <h2>AgGrid Example</h2>
      {/* <SimpleMemoryTest /> */}
      <AGGridMemoryTest />
      {/* <VanillaAGGrid /> */}
      {/* <MemoryTestRowData /> */}
    </div>
  );
}
