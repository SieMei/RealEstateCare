
import { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKnowledge,
  selectKnowledgeItems,
  selectKnowledgeStatus,
  selectKnowledgeError,
} from "../store/knowledgeSlice";

const Kennisbank = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectKnowledgeItems);
  const status = useSelector(selectKnowledgeStatus);
  const error = useSelector(selectKnowledgeError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchKnowledge());
    }
  }, [dispatch, status]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Kennisbank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {status === "loading" && <div className="ion-text-center">Laden…</div>}
        {status === "failed" && (
          <IonItem color="danger">
            <IonLabel>Fout: {error}</IonLabel>
          </IonItem>
        )}
        {status === "succeeded" && (
          <IonList>
            {items.map((k) => (
              <IonItem key={k.id} href={k.url} target="_blank">
                <IonLabel>
                  <h2>{k.title}</h2>
                  <p>{k.type?.toUpperCase() || "LINK"}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Kennisbank;