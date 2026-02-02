import { getCaseByToken } from "@/lib/store";
import { submitFormAction } from "./actions";
import FormWizard from "./FormWizard";

export default async function PublicForm({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const c = getCaseByToken(token);

  if (!c) {
    return (
      <main className="min-h-screen p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold">Formulário</h1>
        <p className="mt-2 text-sm text-gray-600">Link inválido.</p>
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
        {/* Brand background (PDF palette) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(213,166,63,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,23,93,0.10),transparent_55%),linear-gradient(180deg,#090605,rgba(9,6,5,0.98))]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 p-6">
          <div className="mx-auto max-w-xl">
            <FormWizard token={token} onSubmit={action} />
          </div>
        </div>
      </div>
    </main>
  );
}
