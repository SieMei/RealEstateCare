import { useEffect } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  fetchInspections,
  selectAllInspections,
} from "../store/inspectionsSlice";
import { formatDate } from "../utils/date";

export default function UitgevoerdeInspectiesLijst() {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector(selectAllInspections) || [];
  const status = useSelector((s) => s.inspections?.status ?? "idle");
  const error = useSelector((s) => s.inspections?.error ?? null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInspections());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <IonItem lines="none">
        <IonText color="danger">
          Fout bij het laden van inspecties{error ? `: ${error}` : "."}
        </IonText>
      </IonItem>
    );
  }

    const executed = items.filter((i) => ["ingediend", "afgerond"].includes(i.status)).sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));


  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>Recent uitgevoerd</IonLabel>
      </IonListHeader>

      {executed.length === 0 && (
        <IonItem>
          <IonLabel>Geen uitgevoerde rapportages</IonLabel>
        </IonItem>
      )}

      {executed.map((insp) => {
        const when = formatDate(insp.updatedAt || insp.createdAt, 'date');
        return (
          <IonItem
            key={insp.id}
            button
            onClick={() => history.push(`/inspecties/${insp.id}`)}
          >
            <IonLabel>
              {when} – {insp.address} ({insp.status || "onbekend"})
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
}