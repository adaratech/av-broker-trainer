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
      <header className="relative z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 bg-primary/10 blob animate-pulse-organic" />
              <Leaf className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-tight">AV Broker</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">
                Trainer
              </span>
            </div>
          </div>
          <Link href="/session">
            <Button variant="outline" size="sm" className="font-medium">
              Inizia
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary/5 blob animate-float-gentle" />
        </div>

        <div className="container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-start">
            {/* Left content */}
            <div className="max-w-xl relative z-10">
              <div className="stamp text-xs font-medium text-primary mb-8">
                Simulatore AI
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1] ink-bleed">
                Affina l&apos;arte
                <br />
                della{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">vendita</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 -skew-x-3" />
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                Pratica con clienti virtuali unici, ognuno con la propria
                personalità. Impara a leggere le persone e adatta il tuo
                approccio in tempo reale.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/session">
                  <Button size="lg" className="btn-lift gap-2 px-8 h-12">
                    Inizia il Training
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
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
      <section className="relative border-t bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-lg mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3 block">
              Il Metodo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Come funziona
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Un sistema di apprendimento progettato per sviluppare
              l&apos;intuito e le capacità di adattamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
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
                className="group relative p-6 rounded-lg card-lifted paper-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1.5 flex items-center gap-2">
                      {feature.title}
                      <span className="text-[10px] font-mono text-muted-foreground/50">
                        0{index + 1}
                      </span>
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
      <section className="border-t">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3 block">
                Percorso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl">
                Tre passi per migliorare
              </h2>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent hidden md:block" />

              <div className="space-y-10">
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
                  <div key={item.step} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 relative z-10">
                      <div className="number-marker bg-background">
                        <span>{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <span className="text-xs font-mono text-muted-foreground/40">
                          {item.step}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
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
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_transparent_0%,_hsl(var(--primary))_100%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-primary-foreground">
              <h2 className="font-serif text-3xl md:text-4xl mb-2">
                Pronto a iniziare?
              </h2>
              <p className="text-primary-foreground/70 max-w-md">
                Ogni conversazione è un&apos;opportunità per affinare le tue
                tecniche di vendita.
              </p>
            </div>
            <Link href="/session">
              <Button
                size="lg"
                variant="secondary"
                className="btn-lift gap-2 px-8 h-12 text-primary"
              >
                Avvia Sessione
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-8 w-8 bg-primary/10 blob" />
                <Leaf className="h-4 w-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="font-serif text-sm">AV Broker Trainer</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Basato sul modello Big Five (OCEAN)</span>
              <span className="hidden md:inline">|</span>
              <span className="text-xs">
                Simulazione AI per la formazione
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
