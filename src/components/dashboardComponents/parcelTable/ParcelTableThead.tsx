interface Column {
  key: string;
  label: string;
}

interface TableHeaderProps {
  columns: Column[];
}

const ParcelTableThead = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="border-b">
        {columns.map((col) => (
          <th
            key={col.key}
            className="text-left py-3 px-2 text-sm font-medium"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ParcelTableThead;