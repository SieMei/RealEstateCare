import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IonList, IonItem, IonLabel, IonCard, IonCardContent, IonListHeader, IonSpinner, IonText } from "@ionic/react";
import { loadInspections } from "../store/inspectionsSlice";

export default function ExecutedInspectionsList() {
  const dispatch = useDispatch();
  const inspections = useSelector((state) => state.inspections.list);
  const status = useSelector((state) => state.inspections.status);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadInspections());
    }
  }, [status, dispatch]);

  // een indicator tonen als de inspecties worden geladen
  if (status === "loading") {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  // een foutmelding tonen als het ophalen mislukt
  if (status === "failed") {
    return <IonItem lines="none"><IonText color="danger">Fout bij het laden van inspecties.</IonText></IonItem>;
  }

  return (
    <>
      <IonList inset={true}>
        <IonListHeader><IonLabel>Recent uitgevoerd</IonLabel></IonListHeader>
        {inspections.map((insp) => (
          <IonItem key={insp.id} button onClick={() => setSelected(insp)}>
            <IonLabel>
              {insp.date.toLocaleDateString("nl-NL")} – {insp.type} ({insp.address})
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      {selected && (
        <IonCard>
          <IonCardContent>
            <h3>Details inspectie</h3>
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Adres:</strong> {selected.address}</p>
            <p><strong>Locatie:</strong> {selected.location}</p>
            <p><strong>Datum:</strong> {selected.date.toLocaleDateString("nl-NL")}</p>
            <p><strong>Omschrijving:</strong> {selected.description}</p>
            {selected.urgent && <p style={{ color: "red" }}>❗Urgent</p>}
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
}