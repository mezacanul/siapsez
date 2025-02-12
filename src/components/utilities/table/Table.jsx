import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import "./table.css";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const Table = (props) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: props.data || "",
    columns: props.columns || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  const [visibleFilter, setVisibleFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilterVisibility = (columnId) => {
    setVisibleFilter((prev) => (prev === columnId ? null : columnId));
  };

  const closeFilter = () => {
    setVisibleFilter(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        closeFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    {props.buttonName &&
      <div className={props.rightButtonName ? "d-flex justify-content-end" : ""} >
        {props.buttonName && <button
          className="btn btn-custom-primary mb-2 buttonNewElement"
          onClick={props.modalNewElement}
        >
          {props.buttonName}
        </button>
        }
      </div>
    }
      <table className={`main-table ${props.tableDesign}`}>
        <thead>
          <tr>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header, index) => (
                <th key={index} style={{ position: "relative" }}>
                  {header.isPlaceholder ? null : (
                    <div>
                      <div onClick={() => toggleFilterVisibility(header.id)}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getFilterValue() ||
                          header.column.getIsSorted() ? (
                          <FilterAltOutlinedIcon style={{ color: "white" }} />
                        ) : null}
                      </div>
                      {visibleFilter === header.id && (
                        <div
                          className="filter-table"
                          ref={filterRef}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            border: "1px solid #ccc",
                            padding: "35px 10px 10px 10px",
                            zIndex: 10,
                          }}
                        >
                          <button
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "transparent",
                              border: "none",
                              color: "white",
                              fontWeight: "bold",
                            }}
                            onClick={closeFilter}
                          >
                            <CloseOutlinedIcon />
                          </button>

                          <div>
                            <input
                              style={{
                                height: 30,
                                borderRadius: 5,
                                marginBottom: "10px",
                              }}
                              type="text"
                              placeholder={`Buscar ${header.column.columnDef.header}`}
                              value={header.column.getFilterValue() || ""}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <button
                              onClick={header.column.getToggleSortingHandler()}
                              style={{
                                background: "none",
                                border: "none",
                                color: "white",
                              }}
                            >
                              Orden
                              <SwapVertOutlinedIcon /> -
                              {header.column.getIsSorted()
                                ? header.column.getIsSorted() === "asc"
                                  ? ` Ascendente ▲`
                                  : ` Descendente ▼`
                                : " Desactivado"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={props.rowClick}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-2 pagination">
        <button
          className="btn btn-custom-primary mx-2"
          onClick={() => table.setPageIndex(0)}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon />
        </button>
        <button
          className="btn btn-custom-primary mx-2"
          onClick={() => table.previousPage()}
        >
          <KeyboardArrowLeftOutlinedIcon />
        </button>
        <button
          className="btn btn-custom-primary mx-2"
          onClick={() => table.nextPage()}
        >
          <KeyboardArrowRightOutlinedIcon />
        </button>
        <button
          className="btn btn-custom-primary mx-2"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <KeyboardDoubleArrowRightOutlinedIcon />
        </button>
      </div>
    </>
  );
};

export default Table;
