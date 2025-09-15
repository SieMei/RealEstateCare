
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import UitgevoerdeInspectiesLijst from "../components/UitgevoerdeInspectiesLijst";

const UitgevoerdeInspecties = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Uitgevoerde Rapportages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UitgevoerdeInspectiesLijst />
      </IonContent>
    </IonPage>
  );
};

export default UitgevoerdeInspecties;