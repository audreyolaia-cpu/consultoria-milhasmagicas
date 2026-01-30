import { getCaseByToken } from "@/lib/store";
import { submitFormAction } from "./actions";
import FormWizard from "./FormWizard";

export default function PublicForm({ params }: { params: { token: string } }) {
  const c = getCaseByToken(params.token);

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
    return submitFormAction(params.token, fd);
  }

  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,178,94,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,#05060a,rgba(5,6,10,0.96))]" />
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 p-6">
          <div className="max-w-xl mx-auto">
            <FormWizard token={params.token} onSubmit={action} />
          </div>
        </div>
      </div>
    </main>
  );
}
