import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Inspecties = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Inspecties</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Hier komt de lijst met inspecties.</IonContent>
    </IonPage>
  );
};

export default Inspecties;