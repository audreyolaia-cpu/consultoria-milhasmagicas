import { getCaseByToken } from "@/lib/store";
import BrandLogo from "@/app/components/BrandLogo";
import { submitFormAction } from "./actions";
import FormWizard from "./FormWizard";

export default async function PublicForm({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const c = getCaseByToken(token);

  if (!c) {
    return (
      <main className="min-h-screen overflow-hidden">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(213,166,63,0.14),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(140,23,93,0.08),transparent_58%),linear-gradient(180deg,#090605,rgba(9,6,5,0.98))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.04),transparent_45%)]" />

          <div className="relative z-10 p-6">
            <div className="mx-auto max-w-xl">
              <header className="mb-6 flex justify-center">
                <BrandLogo className="opacity-95" />
              </header>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <h1 className="text-xl font-semibold text-white mm-display">Link inválido</h1>
                <p className="mt-2 text-sm text-white/70">Esse formulário não existe ou expirou. Volte para o WhatsApp e peça um novo link.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  async function action(fd: FormData) {
    "use server";
    return submitFormAction(token, fd);
  }

  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen overflow-hidden">
        {/* Clean-luxury brand background (no photo) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(213,166,63,0.14),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(140,23,93,0.08),transparent_58%),linear-gradient(180deg,#090605,rgba(9,6,5,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="relative z-10 p-6">
          <div className="mx-auto max-w-xl">
            <header className="mb-6 flex justify-center">
              <BrandLogo className="opacity-95" />
            </header>

            <FormWizard token={token} onSubmit={action} />
          </div>
        </div>
      </div>
    </main>
  );
}
