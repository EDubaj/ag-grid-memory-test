import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridReadyEvent, RowTransaction } from "ag-grid-community";

const settings = {
  initialRowCount: 10000,
  updateFrequency: 500,
  maxRemoveRowCount: 1000,
  columnCount: 30,
};

interface RowData {
  id: number;
  [key: string]: string | number;
}

const AGGridMemoryTest: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const gridRef = useRef<AgGridReact<RowData>>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextIdRef = useRef<number>(settings.initialRowCount);

  const createRow = (id: number): RowData => {
    const row: RowData = { id };

    for (let i = 1; i <= settings.columnCount; i++) {
      if (i % 2 === 1) {
        row[`col${i}`] = `Value ${id}-${i}`;
      } else {
        row[`col${i}`] = Math.floor(Math.random() * 1000);
      }
    }

    return row;
  };

  const generateInitialData = (): RowData[] => {
    const data: RowData[] = [];
    for (let i = 0; i < settings.initialRowCount; i++) {
      data.push(createRow(i));
    }
    return data;
  };

  const generateColumnDefs = (): ColDef<RowData>[] => {
    const columns: ColDef<RowData>[] = [
      { field: "id", headerName: "ID", width: 80 },
    ];

    for (let i = 1; i <= settings.columnCount; i++) {
      columns.push({
        field: `col${i}`,
        headerName: `Column ${i}`,
        width: 120,
      });
    }

    return columns;
  };

  const columnDefs = generateColumnDefs();

  const initializeData = (): void => {
    if (!gridRef.current) return;

    const initialData = generateInitialData();
    gridRef.current.api.setGridOption("rowData", initialData);
    nextIdRef.current = settings.initialRowCount;
    setRowCount(settings.initialRowCount);
  };

  const performUpdate = (): void => {
    if (!gridRef.current) return;

    const api = gridRef.current.api;

    const currentRows: RowData[] = [];
    api.forEachNode((node) => {
      if (node.data) {
        currentRows.push(node.data);
      }
    });

    const currentCount = currentRows.length;

    const removeCount = Math.min(
      Math.floor(Math.random() * settings.maxRemoveRowCount),
      currentCount
    );

    const rowsToRemove: RowData[] = [];

    if (removeCount > 0) {
      const shuffledRows = [...currentRows].sort(() => Math.random() - 0.5);
      rowsToRemove.push(...shuffledRows.slice(0, removeCount));
    }

    const rowsToAdd: RowData[] = [];

    for (let i = 0; i < rowsToRemove.length; i++) {
      rowsToAdd.push(createRow(nextIdRef.current++));
    }

    const transaction: RowTransaction<RowData> = {
      remove: rowsToRemove,
      add: rowsToAdd,
    };

    console.log(
      `Adding: ${rowsToAdd.length} rows, removing: ${rowsToRemove.length} rows`
    );

    api.applyTransaction(transaction);

    const newRows: RowData[] = [];
    api.forEachNode((node) => {
      if (node.data) {
        newRows.push(node.data);
      }
    });
    setRowCount(newRows.length);
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

  const handleClearClick = () => {
    console.log("Cleaning up grid...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    gridRef.current.api.setGridOption("rowData", []);
  };

  const handleDestroyClick = () => {
    console.log("Cleaning up grid...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    gridRef.current.api.destroy();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AG-Grid Memory Test - AGGridReact Transactions</h2>
      <div style={{ marginBottom: "10px" }}>
        <strong>Settings:</strong> {settings.columnCount} columns,{" "}
        {settings.initialRowCount} initial rows, update frequency:{" "}
        {settings.updateFrequency} ms
      </div>
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
          Reset
        </button>
        <button
          onClick={handleClearClick}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Clear
        </button>
        <button
          onClick={handleDestroyClick}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Destroy
        </button>

        <span style={{ marginLeft: "20px" }}>Rows: {rowCount}</span>
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact<RowData>
          ref={gridRef}
          columnDefs={columnDefs}
          getRowId={getRowId}
          onGridReady={onGridReady}
          suppressColumnVirtualisation={true}
          // rowSelection={{
          //   mode: "multiRow",
          //   checkboxes: true,
          //   headerCheckbox: true,
          //   enableClickSelection: false,
          //   groupSelects: "filteredDescendants",
          //   hideDisabledCheckboxes: true,
          // }}
        />
      </div>
    </div>
  );
};

export default AGGridMemoryTest;
