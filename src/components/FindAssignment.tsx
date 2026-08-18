import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { assignments, type Assignment } from "@/data/assignments";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/section-parts";

function matches(assignment: Assignment, query: string) {
  if (!query) return false;
  const haystack = [
    assignment.name,
    assignment.delegation,
    assignment.committee,
    assignment.committeeAbbr,
    assignment.position,
    assignment.type,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function ResultCard({ assignment, featured }: { assignment: Assignment; featured?: boolean }) {
  return (
    <article
      className={`border border-navy/10 bg-warm transition-colors duration-300 hover:border-gold/50 ${
        featured ? "p-7 sm:p-8" : "px-5 py-4"
      }`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">Assignment found</p>
      <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${featured ? "mt-4" : "mt-2"}`}>
        <div>
          <h3 className={`font-display text-ink ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {assignment.delegation}
          </h3>
          <p className="mt-1.5 text-sm text-ink/70">
            {assignment.committee}
            <span className="text-ink/35"> · </span>
            {assignment.committeeAbbr}
          </p>
          <p className="mt-1 text-[13px] text-ink/60">
            {assignment.name}
            <span className="text-ink/35"> · </span>
            {assignment.position}
          </p>
        </div>
        <Link
          to={`/committees/${assignment.committeeSlug}`}
          className="inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.16em] text-navy underline decoration-gold/70 underline-offset-4 transition-opacity hover:opacity-70"
        >
          View Committee
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </article>
  );
}

export default function FindAssignment() {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const searching = normalized.length > 0;

  const results = useMemo(() => {
    if (!searching) return [];
    return assignments.filter((assignment) => matches(assignment, normalized));
  }, [normalized, searching]);

  return (
    <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow>Delegates</Eyebrow>
          <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">Find Your Assignment</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/65">
            Search your delegation to find your committee, country, and assignment details.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <label className="relative mt-10 block">
            <span className="sr-only">Search by name or delegation</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue/70" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or delegation..."
              className="h-14 w-full border border-navy/15 bg-white px-12 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold"
              autoComplete="off"
            />
          </label>
        </Reveal>

        <div className="mt-8 min-h-[4rem]">
          <AnimatePresence mode="wait">
            {!searching && (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-ink/45"
              >
                Begin typing a name or country to see your assignment.
              </motion.p>
            )}

            {searching && results.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-navy/10 px-6 py-8"
              >
                <p className="font-display text-xl text-ink">No assignment found</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink/55">
                  Check the spelling or try searching by your delegation name.
                </p>
              </motion.div>
            )}

            {searching && results.length === 1 && (
              <motion.div
                key={results[0].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ResultCard assignment={results[0]} featured />
              </motion.div>
            )}

            {searching && results.length > 1 && (
              <motion.div
                key={`list-${normalized}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-ink/45">
                  {results.length} assignments
                </p>
                {results.map((assignment) => (
                  <ResultCard key={assignment.id} assignment={assignment} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
