import type { Metadata } from "next";
import Link from "next/link";
import { QahuynhLogo } from "@/components/qahuynh-logo";

export const metadata: Metadata = {
  title: "qahuynh - test dashboard",
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-64 opacity-20"
        style={{
          background: "radial-gradient(60rem 16rem at 20% 0%, #a78bfa, transparent), radial-gradient(50rem 16rem at 80% 0%, #f472b6, transparent)",
        }}
      />
      <header className="relative border-b border-neutral-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <QahuynhLogo size={32} />
            <span>
              <span className="block text-base font-semibold leading-none tracking-tight">qahuynh</span>
              <span className="block text-xs leading-none text-neutral-500 mt-1">test dashboard</span>
            </span>
          </Link>
        </div>
      </header>
      <main className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
