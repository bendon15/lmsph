"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder,
  searchKey,
  onRowClick,
  emptyTitle = "Nothing here yet",
  emptyDescription = "There's no data to show right now.",
}: {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  searchKey?: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query || !searchKey) return data;
    const q = query.toLowerCase();
    return data.filter((row) => searchKey(row).toLowerCase().includes(q));
  }, [data, query, searchKey]);

  return (
    <div className="rounded-lg border border-border bg-surface">
      {searchKey && (
        <div className="border-b border-border p-4">
          <div className="relative max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder ?? "Search…"}
              className="h-9 w-full rounded-full border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="p-2">
          <EmptyState icon={Search} title={emptyTitle} description={emptyDescription} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                {columns.map((col) => (
                  <th key={col.header} className={cn("px-5 py-3 font-medium", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-border/60 last:border-0",
                    onRowClick && "cursor-pointer transition-colors hover:bg-surface-muted"
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.header} className={cn("px-5 py-3.5 align-middle", col.className)}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
