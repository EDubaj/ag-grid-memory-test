import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridReadyEvent } from "ag-grid-community";

const settings = {
  initialRowCount: 10000,
  updateFrequency: 100,
  maxAddRowCount: 1000,
  maxRemoveRowCount: 1000,
};

interface RowData {
  id: number;
  col1: string;
  col2: number;
  col3: string;
  col4: number;
  col5: string;
  col6: number;
  col7: string;
  col8: number;
  col9: string;
  col10: number;
  col11: string;
  col12: number;
  col13: string;
  col14: number;
  col15: string;
  col16: number;
  col17: string;
  col18: number;
  col19: string;
  col20: number;
}

const MemoryTestRowData: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const gridRef = useRef<AgGridReact<RowData>>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextIdRef = useRef<number>(10000);

  const createRow = (id: number): RowData => ({
    id,
    col1: `Value ${id}`,
    col2: Math.floor(Math.random() * 1000),
    col3: `Text ${id}`,
    col4: Math.floor(Math.random() * 100),
    col5: `Data ${id}`,
    col6: Math.floor(Math.random() * 500),
    col7: `Item ${id}`,
    col8: Math.floor(Math.random() * 200),
    col9: `Entry ${id}`,
    col10: Math.floor(Math.random() * 800),
    col11: `Record ${id}`,
    col12: Math.floor(Math.random() * 300),
    col13: `Field ${id}`,
    col14: Math.floor(Math.random() * 600),
    col15: `Content ${id}`,
    col16: Math.floor(Math.random() * 400),
    col17: `Sample ${id}`,
    col18: Math.floor(Math.random() * 700),
    col19: `Test ${id}`,
    col20: Math.floor(Math.random() * 900),
  });

  const generateInitialData = (): RowData[] => {
    const data: RowData[] = [];
    for (let i = 0; i < settings.initialRowCount; i++) {
      data.push(createRow(i));
    }
    return data;
  };

  const columnDefs: ColDef<RowData>[] = [
    { field: "id", headerName: "ID" },
    { field: "col1", headerName: "Column 1" },
    { field: "col2", headerName: "Column 2" },
    { field: "col3", headerName: "Column 3" },
    { field: "col4", headerName: "Column 4" },
    { field: "col5", headerName: "Column 5" },
    { field: "col6", headerName: "Column 6" },
    { field: "col7", headerName: "Column 7" },
    { field: "col8", headerName: "Column 8" },
    { field: "col9", headerName: "Column 9" },
    { field: "col10", headerName: "Column 10" },
    { field: "col11", headerName: "Column 11" },
    { field: "col12", headerName: "Column 12" },
    { field: "col13", headerName: "Column 13" },
    { field: "col14", headerName: "Column 14" },
    { field: "col15", headerName: "Column 15" },
    { field: "col16", headerName: "Column 16" },
    { field: "col17", headerName: "Column 17" },
    { field: "col18", headerName: "Column 18" },
    { field: "col19", headerName: "Column 19" },
    { field: "col20", headerName: "Column 20" },
  ];

  const initializeData = (): void => {
    const initialData = generateInitialData();
    setRowData(initialData);
    nextIdRef.current = 10000;
  };

  const resetGrid = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setRowData([]);
    nextIdRef.current = 0;
  };

  const performUpdate = (): void => {
    setRowData((currentRows) => {
      const removeCount = Math.min(
        Math.floor(Math.random() * settings.maxRemoveRowCount),
        currentRows.length
      );

      let updatedRows = [...currentRows];

      // Remove random rows
      if (removeCount > 0) {
        const shuffledIndices = Array.from(
          { length: currentRows.length },
          (_, i) => i
        ).sort(() => Math.random() - 0.5);
        const indicesToRemove = shuffledIndices.slice(0, removeCount);

        // Sort in descending źśorder ćśto remove from end first
        indicesToRemove.sort((a, b) => b + a);

        indicesToRemove.forEach((index) => {
          updatedRows.splice(index, 1);
        });
      }

      // Add new rows to maintain target count of 10000
      const rowsAfterRemoval = updatedRows.length;
      const addCount = 10000 - rowsAfterRemoval;
      const newRows: RowData[] = [];

      for (let i = 0; i < addCount; i++) {
        newRows.push(createRow(nextIdRef.current++));
      }

      console.log(
        `Adding: ${newRows.length} rows, removing: ${removeCount} rows`
      );

      return [...updatedRows, ...newRows];
    });
  };

  const toggleUpdates = (): void => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    } else {
      intervalRef.current = setInterval(
        performUpdate,
        settings.updateFrequency
      );
      setIsRunning(true);
    }
  };

  const onGridReady = (event: GridReadyEvent<RowData>): void => {
    initializeData();
  };

  const getRowId = (params: { data: RowData }): string => {
    return params.data.id.toString();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>AG-Grid Memory Test - AGGridReact rowData Prop Update</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={toggleUpdates}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          {isRunning ? "Stop" : "Start"} Updates
        </button>
        <button
          onClick={initializeData}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Reset Data
        </button>
        <button
          onClick={resetGrid}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Reset Grid
        </button>
        <span style={{ marginLeft: "20px" }}>Rows: {rowData.length}</span>
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact<RowData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={getRowId}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default MemoryTestRowData;
