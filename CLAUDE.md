# bestebroker.be — overdracht voor Claude

Lees dit eerst. Stand op **12/11/2026**. Werk deze file bij als iets wezenlijk verandert (partner goedgekeurd, sponsoring, afspraak).

## Wat is dit
Bestaande Belgische vergelijkingssite voor brokers (sinds ±april 2026), enkel Nederlands (géén Franstalige versie). Next.js 14 op Vercel, repo fetspets/bestebroker, standaardbranch **`master`**. Verkeer uit Google, vooral op "X vs Y"-pagina's (bv. /vergelijking/bolero-vs-saxo: 2.252 vertoningen, 48 klikken, positie 4,9 in 28 dagen tot 11/11). Inkomsten: nog €0.
Eigenaar: Stef (Vlaams; antwoord in het Nederlands, direct en eerlijk). Naar buiten toe treedt hij op als **BesteBroker.be** (info@bestebroker.be), nooit met zijn eigen naam.

## Afspraken met de eigenaar (strikt)
- Sitewijzigingen op een branch + **pull request naar `master`**; pushen of samenvoegen naar `master` = live, enkel na zijn **"samenvoegen"** of **"zet live"**.
- Mails naar buiten enkel na zijn **"verstuur"**, afzender BesteBroker.be <info@bestebroker.be>. **Nooit voorstellen om te bellen** (LYNX is daarom geschrapt).
- Nooit zelf wachtwoorden invullen, inloggen, accounts maken of voorwaarden aanvaarden; programma's aanvragen enkel na zijn "ja".
- **Financieel:** geen beleggingsadvies; elke kost, taks of regel met bron en nagekeken-datum; partnerlinks duidelijk als "betaalde samenwerking"; nooit "niet gesponsord". Geen CFD/forex/crypto-trading promoten.
- **FSMA-vraag** (moet de site zich inschrijven als bemiddelaar?): bewust uitgesteld door de eigenaar (aanvraag A-20261109-de-makelaar-1 = "NEE, voorlopig"). Opnieuw bekijken bij de eerste brokercommissie of als een partner ernaar vraagt.
- SEO-titels en metabeschrijvingen voor **klikken (CTR)**: nieuwsgierig maken, het antwoord niet weggeven.

## Code
- Alle brokerdata in `src/data/brokers.ts` (één bron van waarheid). Partnerlink = `affiliateUrl` + `affiliateActive: true` (toont het label).
- Klikken lopen via `/go/<broker-id>?bron=<plaats>` (Vercel-logs).
- Check vóór elke PR: `npm install && npm run build`, en gsm-weergave op 390 px.
- bol.com-boekenlinks: tag in de omgevingsvariabele `BOL_AFFILIATE_TAG` (code 1518885). Die code mag **nooit** op een andere site.

## Partners (stand 12/11/2026)
| Partner | Netwerk | Stand |
|---|---|---|
| **Saxo (Belgium)** | Impact, "Saxo-Belgium.brand" | aanvraag sinds 22/10; marketing manager Saxo België vroeg Impact op 9/11 om goed te keuren. **€70 per klant.** Bij goedkeuring de Impact-trackinglink zelf als `affiliateUrl` zetten. |
| Saxo (plan B) | financeAds, "Saxo Bank International" | €40 per lead, België toegelaten; aanvragen als Impact tegen ±16/11 niet goedkeurt |
| MeDirect | Awin 8356 | actief sinds 22/10, €24 per rekening ("Sparen"). **Netwerkconversie 0,02%, €0,01 per klik**: geen echte inkomstenbron; niet voortrekken op de site. |
| Mexem | Adtraction | kanaal goedgekeurd 9/11, maar programma staat op NL; ticket 152218908 vraagt openzetten voor BE |
| Keytrade, Lightyear, Revolut | — | gemaild 3/11, geen antwoord |
| Freedom24 | Daisycon 16833 | €20 per rekening, BE toegelaten; geparkeerd tot vergunning en reputatie nagekeken zijn |
| Bolero | — | geen programma; kandidaat voor sponsoring |
| LYNX, DEGIRO, Scalable | — | geschrapt |

## Sponsoring (gepland)
Op **2/12/2026** (geplande herinnering in het overzichtsgesprek): mediakit met de Search Console-cijfers van november en mailconcepten aan Bolero, Keytrade en eventueel Saxo voor een vaste maandelijkse sponsoring (zoals HelloFresh bij bestemaaltijdbox.be). Gesponsorde plaatsingen worden als "advertentie" gemarkeerd; de vergelijking blijft onafhankelijk.

## De Makelaar
Een geplande agent ("Money League – De Makelaar") werkt 4× per week aan deze site via branches `makelaar/<onderwerp>` en pull requests; zijn administratie staat in kempenlabs/money-league onder agents/de-makelaar/ (werk/partners.md is de volledige partnertabel). Laatste PR #31 (TOB-uitleg) is samengevoegd op 12/11.
