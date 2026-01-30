import Link from "next/link";

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,178,94,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05),transparent_55%),linear-gradient(180deg,#05060a,rgba(5,6,10,0.98))]" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-[#d6b25e] tracking-widest">MILHAS MÁGICAS • ADMIN</div>
                <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{title}</h1>
                {subtitle ? <p className="mt-2 text-white/70">{subtitle}</p> : null}
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
