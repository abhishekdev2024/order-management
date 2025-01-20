import React from "react";

type TableComponentProps = {
  children: React.ReactNode;
  className?: string;
};

const Table = ({ children, className = "" }: TableComponentProps) => (
  <table
    className={`min-w-full bg-white shadow-md rounded-lg overflow-hidden ${className}`}
  >
    {children}
  </table>
);

Table.Head = ({ children, className = "" }: TableComponentProps) => (
  <thead className={`bg-gray-800 text-white sticky top-0 ${className}`}>
    {children}
  </thead>
);

Table.Row = ({ children, className = "" }: TableComponentProps) => (
  <tr className={`hover:bg-gray-100 transition duration-200 ${className}`}>
    {children}
  </tr>
);

Table.Column = ({ children, className = "" }: TableComponentProps) => (
  <td className={`py-4 px-4 text-sm text-gray-600 ${className}`}>{children}</td>
);

Table.HeaderColumn = ({ children, className = "" }: TableComponentProps) => (
  <th className={`py-3 px-4 text-left text-sm font-medium ${className}`}>
    {children}
  </th>
);

Table.Body = ({ children, className = "" }: TableComponentProps) => (
  <tbody className={`divide-y divide-gray-200 ${className}`}>{children}</tbody>
);

export default Table;
