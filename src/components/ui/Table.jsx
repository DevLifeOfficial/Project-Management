import React, { memo, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Table({ columns, data = [], onRowClick, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const pages = getVisiblePages();

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border overflow-x-auto border-gray-200 py-3">
      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                S.No
              </th>

              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const serialNumber =
                  (currentPage - 1) * itemsPerPage + rowIndex + 1;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick && onRowClick(row.id)}
                    className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">
                      {serialNumber}
                    </td>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap"
                      >
                        {col.cell ? col.cell(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Error Section */}
      {error && (
        <div className="border-t px-6 py-3 bg-red-50 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex justify-center sm:justify-end mt-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-end items-center gap-1 sm:gap-2 mt-6 px-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-black hover:bg-gray-700 disabled:opacity-50 
                   text-white p-2 sm:px-3 sm:py-2 rounded-md"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-hide">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[32px] sm:min-w-[40px]
                        text-xs sm:text-sm
                        px-2 sm:px-3 py-1.5 sm:py-2
                        rounded-md font-medium transition
                        ${
                          page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-black hover:bg-gray-700 disabled:opacity-50 
                   text-white p-2 sm:px-3 sm:py-2 rounded-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Table);
