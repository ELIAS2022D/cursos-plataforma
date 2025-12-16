import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Sobre Nosotros
        </h1>
        <p className="text-muted-foreground text-lg">
          Construimos formación digital enfocada en resultados reales
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold text-lg">Nuestra misión</h3>
            <p className="text-muted-foreground">
              Ayudar a personas y empresas a adquirir habilidades prácticas,
              aplicables y alineadas al mercado actual.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold text-lg">Nuestra visión</h3>
            <p className="text-muted-foreground">
              Ser una plataforma de referencia en formación digital moderna,
              clara y accesible.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
