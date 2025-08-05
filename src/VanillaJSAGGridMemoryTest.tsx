// VanillaAGGrid.tsx
import React, { useEffect, useRef } from "react";
import { createGrid, GridApi, ColDef } from "ag-grid-community";

interface VanillaAGGridProps {
  className?: string;
  style?: React.CSSProperties;
}

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

const VanillaAGGrid: React.FC<VanillaAGGridProps> = ({ className, style }) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridApiRef = useRef<GridApi<RowData> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const nextIdRef = useRef<number>(10000);
  const rowCountRef = useRef<HTMLSpanElement>(null);

  // Settings
  const settings = {
    initialRowCount: 10000,
    updateFrequency: 1000,
    // maxAddRowCount: 1000,
    maxRemoveRowCount: 1000,
  };

  // Create a single row of data
  const createRow = (id: number): RowData => ({
    id: id,
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

  // Generate initial dataset
  const generateInitialData = (): RowData[] => {
    const data: RowData[] = [];
    for (let i = 0; i < settings.initialRowCount; i++) {
      data.push(createRow(i));
    }
    return data;
  };

  // Column definitions
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

  // Initialize the grid with data
  const initializeData = () => {
    if (!gridApiRef.current) return;

    const initialData = generateInitialData();
    gridApiRef.current.setGridOption("rowData", initialData);
    nextIdRef.current = 10000;
    updateRowCount(10000);
  };

  // Update row count display
  const updateRowCount = (count: number) => {
    if (rowCountRef.current) {
      rowCountRef.current.textContent = count.toString();
    }
  };

  // Perform update operation (add/remove rows)
  const performUpdate = () => {
    if (!gridApiRef.current) return;

    // Get current rows
    const currentRows: RowData[] = [];
    gridApiRef.current.forEachNode((node) => {
      if (node.data) {
        currentRows.push(node.data);
      }
    });

    const currentCount = currentRows.length;

    // Determine how many rows to remove
    const removeCount = Math.min(
      Math.floor(Math.random() * settings.maxRemoveRowCount),
      currentCount
    );

    const rowsToRemove: RowData[] = [];

    if (removeCount > 0) {
      // Shuffle and select random rows to remove
      const shuffledRows = [...currentRows].sort(() => Math.random() - 0.5);
      rowsToRemove.push(...shuffledRows.slice(0, removeCount));
    }

    const rowsToAdd: RowData[] = [];

    for (let i = 0; i < rowsToRemove.length; i++) {
      rowsToAdd.push(createRow(nextIdRef.current++));
    }

    // Apply transaction
    const transaction = {
      remove: rowsToRemove,
      add: rowsToAdd,
    };

    console.log(
      `Adding: ${rowsToAdd.length} rows, removing: ${rowsToRemove.length} rows`
    );

    gridApiRef.current.applyTransaction(transaction);

    // Update row count
    const newRows: RowData[] = [];
    gridApiRef.current.forEachNode((node) => {
      if (node.data) {
        newRows.push(node.data);
      }
    });
    updateRowCount(newRows.length);
  };

  // Toggle updates on/off
  const toggleUpdates = () => {
    if (isRunningRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isRunningRef.current = false;
    } else {
      intervalRef.current = setInterval(
        performUpdate,
        settings.updateFrequency
      );
      isRunningRef.current = true;
    }
  };

  useEffect(() => {
    if (!gridContainerRef.current) return;

    // Grid options
    const gridOptions = {
      columnDefs: columnDefs,
      getRowId: (params: { data: RowData }) => params.data.id.toString(),
      onGridReady: () => {
        console.log("Grid ready - initializing data");
        initializeData();
      },
    };

    console.log("Creating grid...");
    // Initialize the grid using createGrid
    const gridApi = createGrid(gridContainerRef.current, gridOptions);
    gridApiRef.current = gridApi;

    console.log("Grid created:", gridApi);

    // Cleanup function
    return () => {
      console.log("Cleaning up grid...");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Destroy grid
      if (gridApiRef.current) {
        gridApiRef.current.destroy();
      }
    };
  }, []);

  const handleToggleClick = () => {
    toggleUpdates();
  };

  const handleResetClick = () => {
    initializeData();
  };

  const handleClearClick = () => {
    console.log("Cleaning up grid...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    gridApiRef.current?.setGridOption("rowData", []);
  };

  const handleDestroyClick = () => {
    console.log("Cleaning up grid...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    gridApiRef.current?.destroy();
  };

  return (
    <div className={className} style={style}>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2>AG-Grid Memory Test - Vanilla JS in React</h2>

        <div style={{ marginBottom: "10px" }}>
          <strong>Settings:</strong> {settings.initialRowCount} initial rows,
          update frequency: {settings.updateFrequency} ms
        </div>

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handleToggleClick}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: isRunningRef.current ? "#dc3545" : "#007bff",
              color: "white",
              transition: "background-color 0.2s",
            }}
          >
            {isRunningRef.current ? "Stop" : "Start"} Updates
          </button>
          <button
            onClick={handleResetClick}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: "#28a745",
              color: "white",
              transition: "background-color 0.2s",
            }}
          >
            Reset
          </button>
          <button
            onClick={handleClearClick}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: "#28a745",
              color: "white",
              transition: "background-color 0.2s",
            }}
          >
            Clear
          </button>
          <button
            onClick={handleDestroyClick}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              backgroundColor: "#28a745",
              color: "white",
              transition: "background-color 0.2s",
            }}
          >
            Destroy
          </button>
          <span
            style={{
              fontWeight: "bold",
              color: "#333",
              marginLeft: "10px",
            }}
          >
            Rows: <span ref={rowCountRef}>0</span>
          </span>
        </div>

        <div
          ref={gridContainerRef}
          className="ag-theme-alpine"
          style={{
            height: "600px",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default VanillaAGGrid;
