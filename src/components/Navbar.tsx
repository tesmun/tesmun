import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import Magnetic from "@/components/Magnetic";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open ? "bg-navy-deep/92 backdrop-blur-md shadow-[0_1px_24px_rgba(7,26,51,0.35)]" : "bg-navy-deep/85 backdrop-blur-sm xl:bg-transparent xl:backdrop-blur-none",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Magnetic>
          <Link to="/" className="flex items-center gap-2.5 text-white xl:text-warm">
            <LogoMark size={26} />
            <span className="font-display text-[13px] font-semibold tracking-[0.18em]">TESMUN</span>
          </Link>
          </Magnetic>

          <nav className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  cn("nav-link text-[11px] font-medium uppercase tracking-[0.16em]", isActive && "is-active")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center text-silver transition-colors duration-200 hover:text-[#E3C46A] focus-visible:text-[#E3C46A] xl:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy-deep px-8"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={link.href}
                    end={link.href === "/"}
                    className="mobile-nav-link font-display block py-2.5 text-3xl tracking-[0.02em]"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
