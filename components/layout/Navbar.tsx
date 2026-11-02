"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { NAV_LINKS, NAV_RESOURCES } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)]";

/** Internal routes need next/link so the GitHub Pages basePath is applied. */
function MenuItem({
  href,
  label,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onNavigate} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onNavigate} className={className}>
      {label}
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const resourcesTriggerRef = useRef<HTMLButtonElement>(null);
  const resourcesPanelRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Resources dropdown: Escape closes and returns focus, outside click closes. */
  useEffect(() => {
    if (!resourcesOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!resourcesRef.current?.contains(event.target as Node)) setResourcesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setResourcesOpen(false);
        resourcesTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    if (!open) return;

    const focusables = () => {
      const drawer = drawerRef.current;
      if (!drawer) return [] as HTMLElement[];
      return Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      /* Keep focus inside the drawer + its toggle while the panel is open. */
      const items = [toggleRef.current, ...focusables()].filter(
        (el): el is HTMLButtonElement | HTMLElement => Boolean(el),
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const focusResourceItem = (position: "first" | "last") => {
    const items = resourcesPanelRef.current?.querySelectorAll<HTMLElement>("a[href]");
    if (!items || items.length === 0) return;
    (position === "first" ? items[0] : items[items.length - 1]).focus();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-lg transition-colors",
        scrolled
          ? "border-[var(--app-panel-border)] bg-[var(--nav-surface)]"
          : "border-transparent bg-[var(--nav-surface)]",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-canvas)]"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            </li>
          ))}

          <li ref={resourcesRef} className="relative">
            <button
              ref={resourcesTriggerRef}
              type="button"
              aria-expanded={resourcesOpen}
              aria-controls="nav-resources"
              aria-haspopup="true"
              onClick={() => setResourcesOpen((value) => !value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setResourcesOpen(true);
                  window.requestAnimationFrame(() =>
                    focusResourceItem(event.key === "ArrowDown" ? "first" : "last"),
                  );
                }
              }}
              className={cn(navLinkClass, "gap-1.5", resourcesOpen && "text-[var(--text-primary)]")}
            >
              Resources
              <ChevronDown
                aria-hidden="true"
                className={cn("h-3.5 w-3.5 transition-transform", resourcesOpen && "rotate-180")}
              />
            </button>

            <ul
              id="nav-resources"
              ref={resourcesPanelRef}
              hidden={!resourcesOpen}
              aria-label="Resources"
              className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] p-1.5 shadow-2xl shadow-black/40"
            >
              {NAV_RESOURCES.map((link) => (
                <li key={link.label}>
                  <MenuItem
                    href={link.href}
                    label={link.label}
                    onNavigate={() => setResourcesOpen(false)}
                    className="flex min-h-[40px] items-center rounded-lg px-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--app-widget-inner-bg)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-info)]"
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#pricing"
            className="hidden h-9 items-center rounded-lg px-3 font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] sm:inline-flex"
          >
            Sign in
          </a>
          <Button href="#pricing" size="sm" className="max-sm:hidden">
            Get started
          </Button>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--tertiary-surface-border)] bg-[var(--tertiary-surface-bg)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info)] lg:hidden"
          >
            {open ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        ref={drawerRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--app-panel-border)] bg-[var(--app-widget-content-bg)] px-4 pb-6 pt-3 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--app-widget-inner-bg)] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <button
              type="button"
              aria-expanded={mobileResourcesOpen}
              aria-controls="mobile-resources"
              onClick={() => setMobileResourcesOpen((value) => !value)}
              className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--app-widget-inner-bg)] hover:text-[var(--text-primary)]"
            >
              Resources
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 transition-transform",
                  mobileResourcesOpen && "rotate-180",
                )}
              />
            </button>
            <ul id="mobile-resources" hidden={!mobileResourcesOpen} className="mt-1 flex flex-col gap-1 pl-3">
              {NAV_RESOURCES.map((link) => (
                <li key={link.label}>
                  <MenuItem
                    href={link.href}
                    label={link.label}
                    onNavigate={() => {
                      setOpen(false);
                      setMobileResourcesOpen(false);
                    }}
                    className="flex min-h-[44px] items-center rounded-lg border-l border-[var(--app-panel-border)] px-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--app-widget-inner-bg)] hover:text-[var(--text-primary)]"
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="mt-4 flex flex-col gap-2">
          <Button href="#pricing" size="md" className="w-full justify-center">
            Get started
          </Button>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="flex min-h-[44px] items-center justify-center rounded-lg border border-[var(--tertiary-surface-border)] font-mono text-xs uppercase tracking-wide text-[var(--text-secondary)]"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
