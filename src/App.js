import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, search, book, personCircle } from "ionicons/icons";
import Dashboard from "./pages/Dashboard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/dashboard" component={Dashboard} />

          {/* tijdelijke routes voor de andere tabs, aanpassen als de tabs gevuld zijn! */}
          <Route exact path="/inspecties" component={Dashboard} />
          <Route exact path="/kennisbank" component={Dashboard} />
          <Route exact path="/profiel" component={Dashboard} />

          <Redirect exact from="/" to="/dashboard" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={home} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="inspecties" href="/inspecties">
            <IonIcon icon={search} />
            <IonLabel>Inspecties</IonLabel>
          </IonTabButton>
          <IonTabButton tab="kennisbank" href="/kennisbank">
            <IonIcon icon={book} />
            <IonLabel>Kennisbank</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profiel" href="/profiel">
            <IonIcon icon={personCircle} />
            <IonLabel>Profiel</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
