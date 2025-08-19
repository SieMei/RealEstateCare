import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonButtons,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  archiveOutline,
  bookOutline,
  clipboardOutline,
  settingsOutline,
} from "ionicons/icons";
import React from "react";
import logo from "../rec-logo.png";
import ExecutedInspectionsList from "../components/ExecutedInspectionsList"; // Importeren van de opgeschoonde component
import "./Dashboard.css";

const Dashboard = () => {
  // fictief aantal toegewezen rapportages
  const assignedReportsCount = 3;
  // fictieve naam voor de inspecteur. Later kan dit uit de API of login-sessie komen.
  const inspectorName = "Marieke de Boer";

  // bepaal de begroeting op basis van het tijdstip
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Goedemorgen";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Goedemiddag";
    }
    return "Goedenavond";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="main-toolbar">
          <IonButtons slot="start">
            <IonImg
              src={logo}
              className="header-logo header-logo-inverted"
              alt="Real Estate Care logo"
            />
          </IonButtons>
          <IonTitle className="ion-text-center">Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{getGreeting()}, {inspectorName}!</IonCardSubtitle>
            <IonCardTitle>Uw rapportages</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            U heeft <strong>{assignedReportsCount}</strong> nieuwe inspectie(s)
            toegewezen gekregen.
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonListHeader>
            <IonLabel>Acties</IonLabel>
          </IonListHeader>

          <IonItem button routerLink="/inspecties" detail={true}>
            <IonIcon slot="start" icon={clipboardOutline} color="primary" />
            <IonLabel>Toegewezen rapportages</IonLabel>
            {assignedReportsCount > 0 && (
              <IonBadge slot="end" color="danger">
                {assignedReportsCount}
              </IonBadge>
            )}
          </IonItem>

          <IonItem button routerLink="/inspecties" detail={true}>
            <IonIcon slot="start" icon={archiveOutline} />
            <IonLabel>Uitgevoerde rapportages</IonLabel>
          </IonItem>

          <IonItem button routerLink="/kennisbank" detail={true}>
            <IonIcon slot="start" icon={bookOutline} />
            <IonLabel>Kennisbank</IonLabel>
          </IonItem>

          <IonItem button routerLink="/profiel" detail={true}>
            <IonIcon slot="start" icon={settingsOutline} />
            <IonLabel>Instellingen</IonLabel>
          </IonItem>
        </IonList>

        <ExecutedInspectionsList />

      </IonContent>
    </IonPage>
  );
};


export default Dashboard;