# Pleasurable User Interface

In de sprint Pleasurable UI hebben we als team een interface gebouwd voor het PreludeFonds waar gebruikers blij van worden. De focus lag op samenwerken, client-side scripting en creative coding. We hebben eerst gezorgd dat de website functioneel en betrouwbaar is, voordat we deze hebben uitgebreid met usable en pleasurable enhancements.

<img width="1893" height="861" alt="home" src="https://github.com/user-attachments/assets/4fc872f1-1949-4bdd-bdc0-7fa04417e505" />

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Licentie](#licentie)

## Beschrijving
Als medewerker van Cool Kunst en Cultuur wil ik instrumenten kunnen beheren en uitlenen, zodat ik altijd een actueel overzicht heb van alle instrumenten en activiteiten.
De Cool Preludefonds-applicatie helpt medewerkers van Cool Kunst en Cultuur om het overzicht van de uitgeleende muziekinstrumenten aan studenten te bewaren. De applicatie is ontworpen voor snel dagelijks gebruik.

**Wat kan een gebruiker doen?**

**Instrumenten vinden**

<img width="1893" height="870" alt="instrument zoeken" src="https://github.com/user-attachments/assets/eb96688c-32da-4a60-aa32-b8f7c6c25833" />

- Alle instrumenten bekijken in een overzichtelijke tabel met naam, type, serienummer, eigenaar en status
- Zoeken op naam instrument via de zoekbalk
- Filteren op type instrument
- Details per instrument zien en daarin ook de geschiedenis ervan

**Instrument uitlenen**

<img width="1892" height="852" alt="uitlenen" src="https://github.com/user-attachments/assets/28670dcd-86bf-41a3-a221-03b759faf51c" />

- Uitlenen via de detailpagina van een beschikbaar instrument
- Gegevens van de huurder, verhuurder en opmerkingen invullen
- Status verandert naar "uitgeleend"

**Instrument innemen**

<img width="1901" height="832" alt="innemen" src="https://github.com/user-attachments/assets/7002323f-3455-4388-84c9-78022a37e94e" />

- Innemen via de detailpagina van een uitgeleend instrument
- Status verandert terug naar "beschikbaar"

**Nieuw instrument toevoegen**
- Via de "instrument toevoegen" knop in het overzicht
- Formulier met verplichte velden
- Na opslaan staat het instrument gelijk bovenaan het overzicht

**Acties volgen**

<img width="1897" height="863" alt="actielog" src="https://github.com/user-attachments/assets/55913a9f-a4e2-44ad-9ab7-57149c05fcdc" />

- Via de actielog zie je een chronologisch overzicht van alle uitleningen, innames en aanpassingen
- Filteren op type actie om specifieke gebeurtenissen te zien

## Kenmerken - Progressive Enhancement
De website is opgebouwd volgens het principe van Progressive Enhancement, verdeeld in vier lagen. We beginnen met een functionele basis die altijd werkt, en bouwen daar laag voor laag enhancements bovenop.

### Functional laag
de applicatie is opgebouwd volgens progressive enhancement, dat betekent dat alles werkt zonder JS of CSS. 
 
technische opzet,
Express: als webserver met routes voor paginas.
LiquidJS: templates
directus REST API: de database

### Reliable laag

De basis huisstijl is vastgelegd in een stylesheet met CSS custom properties voor kleuren, typografie en spacing.

De kleuren zijn opgezet met twee lagen variabelen. Een palette laag met de ruwe kleurwaarden en een semantische laag die verwijst naar die palettekleuren. Dit maakt het makkelijk om de huisstijl aan te passen zonder door de hele code te hoeven zoeken.
 
Het eigen lettertype Akkurat wordt ingeladen via @font-face met font-display: swap, zodat er altijd tekst zichtbaar is, ook als het font nog niet geladen is. 

Koppen, paragrafen en links hebben een consistente basisstijl.

Formuliervelden geven visuele feedback via :valid- en :invalid-states, en er verschijnt bij correct ingevulde velden een vinkje via ::after als de browser :has() ondersteunt.

### Usable laag
In de usable laag hebben we de basisfunctionaliteit uitgebreid met geavanceerdere CSS-keuzes die aansluiten bij de huisstijl. Dankzij progressive enhancement is de website op elke browser functioneel.

### Pleasurable laag

In de formulieren heeft de submit button verschillende states. Zo kan je zien of het uitvoeren van een verandering is gelukt, of er een error is, of dat hij nog aan het laden is. Zo hoef je je niet af te vragen of het versturen van informatie wel goed is gegaan. 


### Pleasurable User Interface

Feedback en feedforward van animaties
Op onze website hebben we op verschillende plekken gebruikgemaakt van feedback en feedforward. Hiermee geven we gebruikers duidelijke signalen dat hun acties worden herkend en daadwerkelijk effect hebben binnen de interface.
 
Een formulierknop die visuele feedback geeft wanneer erop wordt geklikt en duidelijk aangeeft wanneer het formulier succesvol is verzonden.

https://github.com/user-attachments/assets/ecd2c677-b002-452f-98c3-631520fae972

Loading, success en error states

<video src="https://github.com/user-attachments/assets/586169d9-f263-46aa-8311-93e743d00e04" width="250" autoplay loop muted></video>

<video src="https://github.com/user-attachments/assets/55045f34-a811-49c4-a784-f34727199150" width="250" autoplay loop muted></video>

Button states

De knoppen hebben vier states uitgewerkt: standaard, :hover, :active, :focus-visible en :disabled. 
Animaties op de knoppen worden alleen afgespeeld als de gebruiker geen voorkeur heeft voor minder beweging, via @media (prefers-reduced-motion: no-preference).
<img width="1062" height="222" alt="image" src="https://github.com/user-attachments/assets/7326e1f4-cddc-4e9d-a10e-ec65cb72af5b" />

Micro-interacties
In de formulieren heeft de submit button verschillende states. Zo kan je zien of het uitvoeren van een verandering is gelukt, of er een error is, of dat hij nog aan het laden is. Zo hoef je je niet af te vragen of het versturen van informatie wel goed is gegaan.

## Technisch

#### Opbouw code in lagen
de applicatie is in 3 lagen gebouwd, elke laag voegt iets toe, maar geen laag is verplicht 
 
Laag 1 HTML: 
de basis, alles wat ee gebruiker nodig heft staat hier, paginas, links, formulieren. Wat een gebruiker doet, wordt geregeld door standaardbrowsergedrag; hierdoor is het niet gevoelig voor bugs/storingen.
 
laag 2 CSS: 
Kleuren, lettertypes, layout, alles wat de site er mooi uit laat zien. Zonder dit nog steeds bruikbaar.
 
laag 3 Javascript:
Knoppen, feedback op acties, vinkjes, loaders en succesmeldingen. Alles wat het gevoel geeft dat er ook echt wat gebeurt zit hier.
 
Op deze manier werkt de site voor iedereen: op een oude telefoon/ipad, met slechte wifi en zelfs met screenreaders.

#### Wat gebeurt er als CSS niet werkt
Wanneer de CSS niet werkt, is de hele website alsnog bruikbaar. Alle informatie staat dan in een rijtje onder elkaar. Het is zo wel een stuk minder mooi en overzichtelijk, maar er is niets dat hierdoor niet meer toegankelijk is. Wat je het meest mist, zijn de kleuren die de status van een instrument aangeven in het overzicht. Je kan namelijk niet meer in één keer zien waar een instrument is. 
<img width="800" height="683" alt="image" src="https://github.com/user-attachments/assets/93007c79-3bcd-4d27-8b51-750fc1b0b682" />
<img width="1875" height="854" alt="image" src="https://github.com/user-attachments/assets/3d235b4f-22db-44c1-bc97-2d09eda7334e" />

#### Wat gebeurt er als JS niet werkt
Er zijn geen verschillen in de werking van de website wanneer de JS niet werkt. Dit is omdat de code grotendeels bestaat uit HTML en CSS. Wel is het zo dat de verschillende states in de formulieren niet meer getoond worden. Je ziet dus niet of iets is gelukt of niet, of dat het nog geladen word. Maar het gebruiken van de verschillende formulieren is nog wel mogelijk. 

### Performance
Bij het ontwikkelen van de website hebben we rekening gehouden met de performance. Daarom hebben we verschillende optimalisaties en technieken toegepast om de gebruikservaring  en snelheid te verbeteren.

- De headerafbeelding krijgt `fetchpriority="high"` zodat de browser deze als eerste inlaadt
- Fonts worden via `<link rel="preload">` vooraf ingeladen zodat ze direct beschikbaar zijn
- Fonts gebruiken `font-display: swap` zodat tekst altijd zichtbaar is tijdens het laden
- Op de detailpagina krijgt de hoofdafbeelding van het instrument ook `fetchpriority="high"`
- Bij het ophalen van data via de API beperken we de velden tot alleen wat de pagina nodig heeft via de `fields` parameter, zodat er minder data over het netwerk gaat
- De CSS wordt per pagina apart ingeladen zodat alleen de benodigde styles worden meegestuurd en er geen onnodige render-blocking CSS is
  
## Installatie

Clone de repository en installeer de dependencies:

```bash
git clone https://github.com/fdnd-agency/cool-kids.git
cd cool-kids
npm install
npm start
```

De website is nu beschikbaar op `http://localhost:8000`.

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
