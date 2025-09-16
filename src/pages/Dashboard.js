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
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../rec-logo.png";
import {
  fetchInspections,
  selectAllInspections,
} from "../store/inspectionsSlice";
import UitgevoerdeInspectiesLijst from "../components/UitgevoerdeInspectiesLijst";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const allInspections = useSelector(selectAllInspections);
  const inspectionsStatus = useSelector((s) => s.inspections.status);

  useEffect(() => {
    if (inspectionsStatus === "idle") {
      dispatch(fetchInspections());
    }
  }, [dispatch, inspectionsStatus]);

  const assignedReportsCount = useMemo(() => allInspections.filter((i) => i.status === "toegewezen").length, [allInspections]);

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
              alt="RealEstateCare logo"
            />
          </IonButtons>
          <IonTitle className="ion-text-center dashboard-title">Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="ion-padding">
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

          <IonItem button routerLink="/inspecties/uitgevoerd" detail={true}>
            <IonIcon slot="start" icon={archiveOutline} />
            <IonLabel>Uitgevoerde rapportages</IonLabel>
          </IonItem>

          <IonItem button routerLink="/kennisbank" detail={true}>
            <IonIcon slot="start" icon={bookOutline} />
            <IonLabel>Kennisbank</IonLabel>
          </IonItem>

          <IonItem button routerLink="/instellingen" detail={true}>
            <IonIcon slot="start" icon={settingsOutline} />
            <IonLabel>Instellingen</IonLabel>
          </IonItem>
        </IonList>

        <UitgevoerdeInspectiesLijst />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;