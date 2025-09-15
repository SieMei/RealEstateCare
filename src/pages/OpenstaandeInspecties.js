import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { useSelector } from "react-redux";
import { selectCompleted, selectOpen } from "../store/inspectionsSlice";
import InspectionList from "../components/InspectionList";

export default function OpenstaandeInspecties() {
  const items = useSelector(selectOpen);
  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Openstaande inspecties</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <InspectionList items={items} />
      </IonContent>
    </IonPage>
  );
}
