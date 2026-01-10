import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Brain,
  Users,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">AV Broker Trainer</span>
          </div>
          <Link href="/session">
            <Button variant="outline" size="sm">
              Inizia Training
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Simulatore di Training
          </p>
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-6 leading-[1.1]">
            Diventa un broker
            <br />
            <span className="text-accent underline-accent">più efficace</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Pratica le tue abilità di vendita con clienti virtuali alimentati
            da IA. Ogni cliente ha una personalità unica basata sul modello
            psicografico Big Five.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/session">
              <Button size="lg" className="gap-2 px-6">
                Inizia il Training
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Nessuna registrazione richiesta
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-secondary/30">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="font-serif text-3xl mb-3">Come funziona</h2>
            <p className="text-muted-foreground max-w-lg">
              Un ciclo di apprendimento semplice ed efficace per migliorare
              le tue tecniche di vendita.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-hover border shadow-subtle">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <Mic className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold">Conversazione Vocale</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Parla naturalmente con il cliente virtuale usando il microfono.
                  Proprio come in una vera chiamata di vendita.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border shadow-subtle">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold">Analisi Psicografica</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Visualizza i tratti Big Five del cliente mentre emergono
                  durante la conversazione in tempo reale.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border shadow-subtle">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold">Clienti Diversi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  5 personalità uniche: dal cliente analitico al decisore rapido,
                  dallo scettico al prudente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border shadow-subtle">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <Target className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base font-semibold">Feedback Immediato</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Osserva come le tue parole influenzano la percezione del
                  cliente e adatta la tua strategia.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="border-t">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-center mb-16">Il percorso</h2>

            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center font-serif text-xl text-primary">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg mb-2">Inizia la sessione</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Un cliente virtuale con personalità casuale ti accoglie.
                    Presentati e inizia la conversazione come faresti normalmente.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center font-serif text-xl text-primary">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg mb-2">Osserva i tratti</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mentre parli, il pannello psicografico rivela i tratti di
                    personalità del cliente basati sul modello OCEAN.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center font-serif text-xl text-primary">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg mb-2">Adatta l&apos;approccio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Usa le informazioni per personalizzare il tuo pitch e gestire
                    le obiezioni in modo più efficace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-3xl mb-2">Pronto a migliorare?</h2>
              <p className="text-primary-foreground/80">
                Ogni sessione è un&apos;opportunità per affinare le tue tecniche.
              </p>
            </div>
            <Link href="/session">
              <Button size="lg" variant="secondary" className="gap-2 px-8">
                Avvia Sessione
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">AV Broker Trainer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simulatore basato sul modello psicografico Big Five (OCEAN)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
