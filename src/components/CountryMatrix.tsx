import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAllocation } from "@/lib/allocations-data";
import { cn } from "@/lib/utils";

export function CountryMatrix({ slug, className }: { slug: string; className?: string }) {
  const [query, setQuery] = useState("");
  const allocation = getAllocation(slug);

  const rows = useMemo(() => {
    if (!allocation) return [];
    const q = query.trim().toLowerCase();
    if (allocation.type === "international") {
      return allocation.rows.filter(
        (r) => !q || r.name.toLowerCase().includes(q) || r.country.toLowerCase().includes(q) || r.class.toLowerCase().includes(q),
      );
    }
    return allocation.rows.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.delegation.toLowerCase().includes(q) || r.party.toLowerCase().includes(q),
    );
  }, [allocation, query]);

  if (!allocation) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-5 flex items-center gap-3 border border-navy/15 bg-warm px-4 py-2.5">
        <Search size={15} className="text-blue" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={allocation.type === "international" ? "Search delegate or country…" : "Search delegate, MP or party…"}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          aria-label="Search country matrix"
        />
        <span className="whitespace-nowrap text-xs text-blue">{rows.length}</span>
      </div>

      <div className="max-h-[420px] overflow-y-auto border border-navy/15">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-navy text-warm">
            <tr className="text-[11px] uppercase tracking-[0.12em]">
              {allocation.type === "international" ? (
                <>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Delegate</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 font-medium">Delegate</th>
                  <th className="px-4 py-3 font-medium">Represents (MP)</th>
                  <th className="px-4 py-3 font-medium">Party</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-blue">
                  No matches found.
                </td>
              </tr>
            )}
            {allocation.type === "international"
              ? (rows as { class: string; name: string; country: string }[]).map((r, i) => (
                  <tr key={`${r.name}-${i}`} className="border-b border-navy/10 last:border-0 hover:bg-navy/[0.03]">
                    <td className="whitespace-nowrap px-4 py-2.5 text-xs text-blue">{r.class}</td>
                    <td className="px-4 py-2.5 text-ink">{r.name}</td>
                    <td className="px-4 py-2.5 text-blue">{r.country}</td>
                  </tr>
                ))
              : (rows as { name: string; delegation: string; party: string }[]).map((r, i) => (
                  <tr key={`${r.name}-${i}`} className="border-b border-navy/10 last:border-0 hover:bg-navy/[0.03]">
                    <td className="px-4 py-2.5 text-ink">{r.name}</td>
                    <td className="px-4 py-2.5 text-blue">{r.delegation}</td>
                    <td className="px-4 py-2.5 text-blue">{r.party}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
