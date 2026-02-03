import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Brain,
  Users,
  Target,
  ArrowRight,
  Leaf,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="relative z-50 border-b border-border/40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent rounded-lg -rotate-2" />
              <Leaf className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight leading-tight">AV Broker</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--warm-400))] font-medium">
                Trainer
              </span>
            </div>
          </div>
          <Link href="/session">
            <Button variant="outline" size="sm" className="font-medium group border-primary/30 hover:border-primary hover:bg-primary/5">
              Inizia
              <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background decoration - asymmetric */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-[hsl(var(--warm-100))] via-[hsl(var(--green-100))] to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 -left-32 w-[300px] h-[400px] bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-2xl" />
          {/* Diagonal accent line */}
          <div className="absolute top-20 right-1/4 w-px h-40 bg-gradient-to-b from-[hsl(var(--warm-300))] to-transparent rotate-12 opacity-30" />
        </div>

        <div className="container mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="grid lg:grid-cols-[1fr,auto] gap-20 items-start">
            {/* Left content */}
            <div className="max-w-xl relative z-10">
              {/* Badge with warm accent */}
              <div className="badge-vintage mb-10">
                <span className="dash-accent" />
                Simulatore AI
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight mb-8 leading-[1.08]">
                Affina l&apos;arte
                <br />
                <span className="relative inline-block mt-1">
                  della{" "}
                  <span className="brushstroke text-primary">vendita</span>
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md relative quote-float pl-1">
                Pratica con clienti virtuali unici, ognuno con la propria
                personalità. Impara a leggere le persone e adatta il tuo
                approccio in tempo reale.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link href="/session">
                  <Button size="lg" className="btn-lift gap-2 px-10 h-13 text-base shadow-offset hover:shadow-lg transition-shadow">
                    Inizia il Training
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--green-400))]" />
                  Nessun account richiesto
                </span>
              </div>
            </div>

            {/* Right decoration - visual element */}
            <div className="hidden lg:block relative w-[300px] h-[400px]">
              {/* Abstract card stack visualization */}
              <div className="absolute top-8 right-0 w-56 h-72 paper-card rounded-lg transform rotate-6 shadow-stepped" />
              <div className="absolute top-4 right-4 w-56 h-72 paper-card rounded-lg transform rotate-3 shadow-stepped" />
              <div className="absolute top-0 right-8 w-56 h-72 paper-card rounded-lg corner-accent overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="h-3 w-20 bg-muted rounded animate-shimmer-sweep" />
                      <div className="h-2 w-14 bg-muted rounded mt-1.5 animate-shimmer-sweep" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-muted rounded" />
                    <div className="h-2 w-4/5 bg-muted rounded" />
                    <div className="h-2 w-3/4 bg-muted rounded" />
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                      Tratti
                    </div>
                    <div className="space-y-2">
                      {["O", "C", "E", "A", "N"].map((trait, i) => (
                        <div key={trait} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground w-4">
                            {trait}
                          </span>
                          <div className="trait-progress flex-1">
                            <div
                              className="trait-progress-fill"
                              style={{ width: `${30 + i * 15}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative tile-border bg-gradient-to-b from-[hsl(var(--cream-50))] to-background">
        <div className="container mx-auto px-6 py-24">
          {/* Asymmetric header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="dash-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--warm-400))]">
                  Il Metodo
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">
                Come funziona
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm md:text-right">
              Un sistema di apprendimento progettato per sviluppare
              l&apos;intuito e le capacità di adattamento.
            </p>
          </div>

          {/* Staggered grid layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Mic,
                title: "Conversazione Vocale",
                description:
                  "Parla naturalmente con il cliente virtuale. Tieni premuto K e dialoga come in una vera chiamata.",
              },
              {
                icon: Brain,
                title: "Profilo Psicografico",
                description:
                  "I tratti Big Five emergono durante la conversazione. Impara a riconoscere i pattern comportamentali.",
              },
              {
                icon: Users,
                title: "Personalità Autentiche",
                description:
                  "5 archetipi di cliente: dall'analitico allo scettico. Ogni sessione è un'esperienza diversa.",
              },
              {
                icon: Target,
                title: "Feedback Visivo",
                description:
                  "Osserva come le tue parole influenzano la percezione. Adatta la strategia in tempo reale.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative p-7 rounded-xl card-organic lift-warm ${
                  index % 2 === 1 ? "md:translate-y-8" : ""
                }`}
              >
                {/* Large background number */}
                <span className="number-handwritten">{index + 1}</span>

                <div className="flex items-start gap-5 relative">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--green-100))] to-[hsl(var(--green-50))] flex items-center justify-center border border-primary/10 group-hover:rotate-3 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-3/4 bg-gradient-to-l from-[hsl(var(--green-50))] to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Header with offset design */}
            <div className="relative mb-20">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <span className="h-px w-8 bg-[hsl(var(--warm-200))]" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--warm-400))]">
                  Percorso
                </span>
                <span className="h-px w-8 bg-[hsl(var(--warm-200))]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-center">
                Tre passi per <span className="text-primary">migliorare</span>
              </h2>
            </div>

            <div className="relative">
              {/* Organic connecting line */}
              <div className="absolute left-[2.75rem] top-16 bottom-16 w-0.5 bg-gradient-to-b from-[hsl(var(--warm-200))] via-primary/20 to-[hsl(var(--green-200))] hidden md:block" />

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Inizia la sessione",
                    description:
                      "Un cliente virtuale con personalità unica ti accoglie. Presentati come faresti normalmente e avvia la conversazione.",
                  },
                  {
                    step: "02",
                    title: "Leggi i segnali",
                    description:
                      "Il pannello psicografico rivela i tratti OCEAN del cliente. Ogni risposta fornisce indizi sul suo carattere.",
                  },
                  {
                    step: "03",
                    title: "Adatta l'approccio",
                    description:
                      "Usa le informazioni per personalizzare il pitch. Con i clienti analitici, fornisci dati. Con gli emotivi, crea connessione.",
                  },
                ].map((item, index) => (
                  <div key={item.step} className="flex gap-8 items-start group">
                    {/* Number with organic shape */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--cream-50))] to-white border-2 border-[hsl(var(--warm-200))] flex items-center justify-center shadow-sm group-hover:border-primary group-hover:rotate-6 transition-all">
                        <span className="font-serif text-xl text-primary">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-2 pb-4">
                      <h3 className="font-semibold text-xl mb-3 flex items-center gap-3">
                        {item.title}
                        <span className="text-[10px] font-mono text-[hsl(var(--warm-300))] bg-[hsl(var(--warm-50))] px-2 py-0.5 rounded">
                          {item.step}
                        </span>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--green-600))] via-primary to-[hsl(var(--green-700))]" />
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 border border-white/20 rounded-full" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 right-10 w-32 h-32 border border-[hsl(var(--warm-200))]/30 rounded-full" />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--warm-200))]/40 to-transparent" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-[hsl(var(--warm-200))]" />
                <span className="text-xs uppercase tracking-wider text-[hsl(var(--warm-100))]">Inizia ora</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                Pronto a iniziare?
              </h2>
              <p className="text-primary-foreground/70 max-w-md leading-relaxed">
                Ogni conversazione è un&apos;opportunità per affinare le tue
                tecniche di vendita.
              </p>
            </div>
            <Link href="/session">
              <Button
                size="lg"
                variant="secondary"
                className="btn-lift gap-3 px-10 h-14 text-primary font-medium shadow-lg hover:shadow-xl transition-shadow bg-[hsl(var(--cream-50))] hover:bg-white"
              >
                Avvia Sessione
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--warm-100))] py-12 bg-gradient-to-b from-[hsl(var(--cream-50))] to-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg rotate-3" />
                <Leaf className="h-4 w-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="font-serif text-sm">AV Broker Trainer</span>
                <span className="block text-[10px] text-[hsl(var(--warm-400))]">Formazione professionale</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--warm-300))]" />
                Basato sul modello Big Five (OCEAN)
              </span>
              <span className="hidden md:block h-4 w-px bg-border" />
              <span className="text-xs text-muted-foreground/70">
                Simulazione AI per la formazione
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
