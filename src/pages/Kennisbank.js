import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Kennisbank = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Kennisbank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Hier komt de kennisbank.</IonContent>
    </IonPage>
  );
};

export default Kennisbank;