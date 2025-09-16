import { useEffect, useMemo } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInspections,
  selectAllInspections,
} from "../store/inspectionsSlice";
import { useHistory } from "react-router";
import { formatDate } from "../utils/date";

const Inspecties = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector(selectAllInspections);
  const status = useSelector((s) => s.inspections.status);
  const error = useSelector((s) => s.inspections.error);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  }, [items]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInspections());
    }
  }, [dispatch, status]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Inspecties</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {status === "loading" && (
          <div className="ion-padding">Laden…</div>
        )}
        {status === "failed" && (
          <div className="ion-padding">Fout: {error}</div>
        )}
        {status === "succeeded" && (
          <IonList>
            {sortedItems.map((i) => (
              <IonItem
                key={i.id}
                button
                onClick={() => history.push(`/inspecties/${i.id}`)}
              >
                <IonLabel>
                  <h2>{i.address}</h2>
                  <p>
                    Status:{" "}
                    {i.status === "toegewezen" ? (
                      <IonText color="primary">
                        <b>{i.status}</b>
                      </IonText>
                    ) : (
                      i.status || "onbekend"
                    )}{" "}
                    · Laatst gewijzigd:{" "}
                    {formatDate(i.updatedAt)}
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Inspecties;