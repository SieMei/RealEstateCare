
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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

import useLocalStorage from "./hooks/useLocalStorage";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Inspecties from "./pages/Inspecties";
import InspectieDetail from "./pages/InspectieDetail";
import UitgevoerdeInspecties from "./pages/UitgevoerdeInspecties";
import Kennisbank from "./pages/Kennisbank";
import Profiel from "./pages/Profiel";
import Instellingen from "./pages/Instellingen";
import Login from "./pages/Login";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

function AppTabs({ dark, setDark }) {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path="/" to="/dashboard" exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/inspecties" component={Inspecties} exact />
        <PrivateRoute path="/inspecties/:id" component={InspectieDetail} exact />
        <PrivateRoute path="/inspecties/uitgevoerd" component={UitgevoerdeInspecties} exact />
        <PrivateRoute path="/kennisbank" component={Kennisbank} exact />
        <PrivateRoute path="/profiel" component={Profiel} exact />
        <PrivateRoute path="/instellingen" component={Instellingen} exact />
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
  );
}

export default function App() {
  const [dark, setDark] = useLocalStorage("prefersDark", false);

  // donker thema toepassen
  useEffect(() => {
    document.body.classList.toggle("dark", !!dark);
  }, [dark]);
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" render={() => <AppTabs dark={dark} setDark={setDark} />} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
}