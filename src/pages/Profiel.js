import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Profiel = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profiel & Instellingen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Hier komen de profiel- en instellingenopties.</IonContent>
    </IonPage>
  );
};

export default Profiel;