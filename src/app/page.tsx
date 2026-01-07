import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  Brain,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Training Interattivo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Diventa un Broker
            <span className="text-primary"> Più Efficace</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Pratica le tue abilità di vendita con clienti virtuali alimentati
            da IA. Ogni cliente ha una personalità unica: impara a riconoscere
            i tratti psicologici e adatta il tuo approccio in tempo reale.
          </p>
          <Link href="/session">
            <Button size="lg" className="gap-2">
              Inizia il Training
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Conversazione Vocale</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Parla naturalmente con il cliente virtuale usando il microfono.
                Come in una vera chiamata.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Analisi Psicografica</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualizza i tratti Big Five del cliente mentre emergono
                durante la conversazione.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Clienti Diversi</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                5 personalità uniche: dal cliente analitico al decisore rapido,
                dallo scettico al prudente.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Feedback Immediato</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Osserva come le tue parole influenzano la percezione del
                cliente e adatta la strategia.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Come Funziona</CardTitle>
            <CardDescription>
              Un ciclo di apprendimento semplice ed efficace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Inizia la Sessione</h3>
                <p className="text-sm text-muted-foreground">
                  Un cliente virtuale con personalità casuale ti accoglie.
                  Presentati e inizia la conversazione.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Osserva i Tratti</h3>
                <p className="text-sm text-muted-foreground">
                  Mentre parli, il pannello psicografico rivela i tratti di
                  personalità del cliente.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Adatta l&apos;Approccio</h3>
                <p className="text-sm text-muted-foreground">
                  Usa le informazioni per personalizzare il tuo pitch e gestire
                  le obiezioni efficacemente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Pronto a migliorare?</h2>
          <p className="text-muted-foreground mb-6">
            Ogni sessione è un&apos;opportunità per affinare le tue tecniche di
            vendita.
          </p>
          <Link href="/session">
            <Button size="lg" variant="default" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Avvia Sessione di Training
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AV Broker Trainer - Simulatore di Training per Broker Assicurativi</p>
          <p className="mt-2">
            Powered by GPT-4o | Modello psicografico Big Five (OCEAN)
          </p>
        </div>
      </footer>
    </main>
  );
}
