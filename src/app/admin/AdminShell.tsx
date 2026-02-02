import Link from "next/link";
import BrandLogo from "@/app/components/BrandLogo";

export default function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(213,166,63,0.14),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(140,23,93,0.08),transparent_58%),linear-gradient(180deg,#090605,rgba(9,6,5,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="relative z-10 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <BrandLogo className="shrink-0" />
                <div>
                  <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white mm-display">{title}</h1>
                  {subtitle ? <p className="mt-2 text-white/70">{subtitle}</p> : null}
                </div>
              </div>
              <div className="flex gap-3">
                <Link className="text-white/80 hover:text-white underline" href="/admin/cases">
                  Casos
                </Link>
                <Link className="text-white/80 hover:text-white underline" href="/demo">
                  Abrir formulário (demo)
                </Link>
              </div>
            </div>

            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
