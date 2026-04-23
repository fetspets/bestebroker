import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Disclaimer & Transparantiebeleid | BesteBroker.be',
  description:
    'Lees onze volledige disclaimer over affiliate links, risicowaarschuwingen en redactionele onafhankelijkheid op BesteBroker.be.',
  openGraph: {
    title: 'Disclaimer & Transparantiebeleid | BesteBroker.be',
    url: 'https://bestebroker.be/disclaimer',
    locale: 'nl_BE',
    type: 'article',
  },
  alternates: { canonical: 'https://bestebroker.be/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <div className="section-container py-10 max-w-3xl">
      <BreadcrumbNav items={[{ label: 'Disclaimer' }]} />

      <h1 className="font-display text-3xl font-bold text-primary mb-8">Disclaimer & Transparantiebeleid</h1>

      <div className="prose-custom space-y-8">

        <section>
          <h2>1. Geen financieel advies</h2>
          <p>
            De informatie op BesteBroker.be is uitsluitend <strong>informatief van aard</strong> en vormt
            in geen geval persoonlijk beleggings-, fiscaal of juridisch advies. BesteBroker.be is geen
            vergunde beleggingsadviseur en is niet geregistreerd bij de FSMA of enige andere toezichthouder
            als financieel adviseur.
          </p>
          <p>
            Beleggen brengt risico&#39;s met zich mee. Je kunt (een deel van) je inleg verliezen.
            In het verleden behaalde resultaten bieden geen garantie voor de toekomst.
            Raadpleeg altijd een onafhankelijk, erkend financieel adviseur voor persoonlijk advies.
          </p>
        </section>

        <section>
          <h2>2. Affiliate links & vergoedingen</h2>
          <p>
            BesteBroker.be werkt met <strong>affiliate partnerships</strong> met de brokers en bol.com
            die op deze site worden vermeld. Dit betekent:
          </p>
          <ul>
            <li>Als je via een link op deze site een brokeraccount opent, ontvangen wij een vergoeding van de betreffende broker.</li>
            <li>Als je via een link op deze site een boek koopt op bol.com, ontvangen wij een kleine commissie.</li>
            <li>Dit kost jou <strong>niets extra</strong> — de prijs voor jou is identiek aan wanneer je rechtstreeks naar de broker of bol.com gaat.</li>
          </ul>
          <p>
            Alle affiliate links zijn gemarkeerd met <code>rel=&quot;sponsored&quot;</code> zoals vereist door Google.
            Op pagina&#39;s met affiliate links tonen wij altijd een zichtbare disclosure boven de fold.
          </p>
        </section>

        <section>
          <h2>3. Redactionele onafhankelijkheid</h2>
          <p>
            Onze brokerbeoordelingen en vergelijkingen worden <strong>niet beïnvloed door affiliate relaties</strong>.
            Dit betekent concreet:
          </p>
          <ul>
            <li>Een broker met een affiliatelink wordt niet beter beoordeeld vanwege die link.</li>
            <li>Een broker zonder affiliatelink wordt niet slechter beoordeeld.</li>
            <li>Brokers die naar onze mening niet geschikt zijn voor de meeste Belgische beleggers (zoals Trade Republic) krijgen een lagere score, ook al hebben ze een affiliateprogramma.</li>
            <li>Onze methodologie is publiek beschikbaar op de <Link href="/methodologie" className="text-accent hover:underline">methodologie-pagina</Link>.</li>
          </ul>
        </section>

        <section>
          <h2>4. Nauwkeurigheid van informatie</h2>
          <p>
            Wij streven ernaar alle informatie over brokers, tarieven en belastingen <strong>zo actueel
            mogelijk</strong> te houden. Elke pagina met tarieven of fiscale informatie bevat een
            &quot;Laatste update&quot;-datum.
          </p>
          <p>
            Ondanks onze inspanningen kunnen tarieven, wetten en productkenmerken wijzigen zonder dat
            wij dit onmiddellijk weten. Verifieer altijd bij de broker zelf of via officiële bronnen
            voor je een financiële beslissing neemt.
          </p>
        </section>

        <section>
          <h2>5. Boekaanbevelingen — bol.com</h2>
          <p>
            Boeken die wij aanbevelen worden geselecteerd op basis van inhoudskwaliteit en relevantie
            voor Belgische beleggers. Wij ontvangen een kleine commissie via het bol.com partner programma.
            Dit beïnvloedt onze selectie niet — boeken die wij niet nuttig vinden worden niet aanbevolen,
            ongeacht of er een commissie aan verbonden is.
          </p>
        </section>

        <section>
          <h2>6. Boekhoudkundige en juridische verantwoordelijkheid</h2>
          <p>
            BesteBroker.be is aansprakelijkheid voor schade die voortvloeit uit het gebruik van
            informatie op deze site uitdrukkelijk uitgesloten, voor zover wettelijk toegestaan.
            De gebruiker is zelf verantwoordelijk voor zijn of haar beleggingsbeslissingen.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Vragen, foutmeldingen of suggesties? Stuur een e-mail naar{' '}
            <a href="mailto:info@bestebroker.be" className="text-accent hover:underline">info@bestebroker.be</a>.
            Wij passen onjuiste informatie zo snel mogelijk aan.
          </p>
        </section>

        <section>
          <h2>8. Methodologie</h2>
          <p>
            Hoe wij brokers beoordelen, welke criteria wij hanteren en hoe wij omgaan met
            veranderende tarieven: zie onze <Link href="/methodologie" className="text-accent hover:underline">methodologie-pagina</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
