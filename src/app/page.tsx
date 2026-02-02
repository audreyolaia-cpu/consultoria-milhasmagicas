import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,178,94,0.20),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,#05060a,rgba(5,6,10,0.96))]" />
      <div className="absolute inset-0 opacity-35 bg-[url('https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/logo.png"
              alt="Milhas Mágicas"
              width={220}
              height={115}
              priority
            />
          </div>

          <nav className="hidden sm:flex items-center gap-5 text-sm text-white/80">
            <Link className="hover:text-white" href="#como-funciona">
              Como funciona
            </Link>
            <Link className="hover:text-white" href="#o-que-recebe">
              O que você recebe
            </Link>
            <Link className="hover:text-white" href="#faq">
              FAQ
            </Link>
          </nav>
        </header>

        <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
              Consultoria de emissão • estratégia personalizada
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Sua viagem com o menor custo possível — usando milhas do jeito certo.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70 md:text-lg">
              Você preenche um formulário rápido, eu analiso seu cenário (saldos, cartões e datas) e devolvo um plano
              objetivo com opções de emissão, estimativas e estratégia para fechar o gap.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/5527999539641"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#d6b25e] px-5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(214,178,94,0.25)]"
              >
                Quero fazer consultoria
              </a>
              <Link
                href="#como-funciona"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Ver como funciona
              </Link>
            </div>

            <div className="mt-6 text-xs text-white/55">
              *Este site está em versão inicial (MVP). Links de formulário são enviados individualmente para cada cliente.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="text-sm font-medium text-white">O que você recebe</div>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>• 3 opções de emissão (A recomendada + alternativas)</li>
              <li>• Estimativas de milhas e taxas (por pessoa e total)</li>
              <li>• Cálculo do gap e plano para completar saldo</li>
              <li>• Sugestões de cartões/estratégia de acúmulo (coerente com seu perfil)</li>
              <li>• Checklist final do que fazer e em que ordem</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/60">Acesso rápido (interno)</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href="/admin/cases"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
                >
                  Admin / Casos
                </Link>
                <Link
                  href="/demo"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
                >
                  Demo (gera link)
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="mt-20 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white">Como funciona</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "1) Link do formulário",
                d: "Eu te envio um link único. Você preenche em 2–4 minutos.",
              },
              {
                t: "2) Análise",
                d: "Eu avalio rota, datas, programas, saldos e seu perfil.",
              },
              {
                t: "3) Book + plano",
                d: "Você recebe as opções de emissão e o passo a passo para executar.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur"
              >
                <div className="text-sm font-semibold">{item.t}</div>
                <div className="mt-2 text-sm text-white/70">{item.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="o-que-recebe" className="mt-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white">O que você recebe</h2>
          <p className="mt-2 text-sm text-white/70 max-w-3xl">
            Um material estruturado para você tomar decisão rápido, sem ficar perdida em promoção ou programa errado.
          </p>
        </section>

        <section id="faq" className="mt-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-white">FAQ</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">O link do formulário é público?</div>
              <div className="mt-2 text-sm text-white/70">
                Não. Cada cliente recebe um link exclusivo (token) enviado individualmente.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Você garante disponibilidade/valor?</div>
              <div className="mt-2 text-sm text-white/70">
                Não. Eu trabalho com estimativas e com o cenário do dia. O plano é feito para aumentar as chances e reduzir o custo.
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-white/10 pt-8 text-xs text-white/50">
          © {new Date().getFullYear()} Milhas Mágicas
        </footer>
      </div>
    </main>
  );
}
