# RealEstateCare App

Dit project is een prototype van een mobiele webapplicatie voor RealEstateCare, een dienstverlener die woningen onderhoudt, verbetert en inspecteert. Inspecteurs gebruiken de app om op locatie rapportages te maken van schade, onderhoud, installaties en modificaties. De app sluit aan op een web-API en is gebouwd als Single Page Application (SPA) met React en Ionic.

## Kenmerken

*   **Login:** Veilige login-simulatie via localStorage.
*   **Dashboard:** 
    Centraal overzicht met toegang tot:
    *   Toegewezen inspecties
    *   Uitgevoerde inspecties
    *   Kennisbank
    *   Instellingen + Profiel
*   **Inspectiebeheer:**
    *   Gedetailleerde formulieren voor schade, onderhoud, installaties en modificaties.
    *   Voeg foto's toe direct vanaf de camera of uit de fotobibliotheek.
    *   Sla een conceptrapportage tussentijds op (status: in uitvoering).
    *   Dien een voltooide rapportage in (status: ingediend).
    *   Bekijk en beheer uitgevoerde inspecties.
*   **Kennisbank:** Directe toegang tot belangrijke documenten zoals testprocedures en normbladen.
*   **Instellingen en Profiel:** Gegevens van de inspecteur en mogelijkheid om de app-instellingen aan te passen.

## Technische stack

*   **Framework:** React met Ionic voor een robuuste, mobiel-vriendelijke UI.
*   **State Management:** Redux Toolkit voor voorspelbaar en efficiënt state management.
*   **Routing:** React Router voor navigatie binnen de SPA.
*   **Componenten:** Mobiele UI-componenten van Ionic.
*   **Camera:** Native camera- en galerijfunctionaliteit via @capacitor/camera.
*   **Styling:** RealEstateCare-huisstijl zoveel mogelijk toegepast.
*   **Backend (Prototype):** JSON-server gehost op Azure voor het simuleren van de API.

## Aan de slag

### Vereisten
Zorg dat je Node.js (versie 14.0.0 of hoger) en npm geïnstalleerd hebt.

### Installatie
1.  Kloon de repository:
    ```bash
    git clone https://github.com/jouw-gebruikersnaam/rec-app.git
    ```
2.  Navigeer naar de projectmap:
    ```bash
    cd rec-app
    ```
3.  Installeer de dependencies:
    ```bash
    npm install
    ```

### Applicatie starten
Start de development server:
```bash
npm start
```

## Hosting & demo

*   **Frontend:** Het prototype is live te bekijken op Azure Static Web Apps: https://red-coast-03b9e441e.1.azurestaticapps.net of (tinyurl) https://tinyurl.com/realestatecare.
*   **Backend:** De gesimuleerde API draait op Azure App Service (rec-api.azurewebsites.net).

## Verantwoording

Bij de ontwikkeling van dit prototype is rekening gehouden met:

*   **Ontwerp & bruikbaarheid:** De applicatie is ontworpen rond de workflow van de inspecteur. Er is gebruikgemaakt van duidelijke statuslabels en consistente terminologie om de bruikbaarheid te maximaliseren (Nielsens Heuristieken).
*   **Toegankelijkheid:** Dankzij het gebruik van Ionic-componenten is een basisniveau van toegankelijkheid (WCAG 2.1 A) gewaarborgd, met ondersteuning voor ARIA-attributen en goed kleurcontrast.
*   **Beveiliging:** De login is gesimuleerd zonder wachtwoorden naar de backend te sturen. Dit prototype is voorbereid op een uitbreiding naar een veilig authenticatiesysteem zoals 2FA.
*   **Codekwaliteit:** Het project volgt de style guides en best practices van React en Ionic.

## Bekende beperkingen

*   **Offline Functionaliteit:** De app-shell wordt gecached voor offline gebruik via een service worker. Dynamische data (zoals inspecties) worden nog niet offline opgeslagen.
*   **Authenticatie:** De login is een simulatie en maakt geen gebruik van een echt authenticatiesysteem.
*   **Data persistentie:** De prototype-API ondersteunt alleen het lezen en aanpassen van data (`read`/`patch`), geen volledige CRUD-functionaliteit.
*   **UI/UX:** De gebruikersinterface kan verder worden verfijnd op basis van feedback van eindgebruikers (inspecteurs).
