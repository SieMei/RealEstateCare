
import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { settingsOutline } from "ionicons/icons";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultUser = {
  name: "Marieke de Boer",
  email: "marieke.deboer@rec.nl",
  role: "Inspecteur Vastgoed",
};

function initials(name) {
  if (!name) return "I";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "I";
}

const Profiel = () => {
  const history = useHistory();
  const [user] = useLocalStorage("user", defaultUser); 
  
  function handleLogout() {
    try {
      localStorage.removeItem("auth"); // login-simulatie token
    } catch {}
    history.replace("/login");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Profiel</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Mijn gegevens</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <IonAvatar
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--ion-color-primary)",
                  color: "var(--ion-color-primary-contrast)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                }}
              >
                <span>{initials(user.name)}</span>
              </IonAvatar>
              <div>
                <div style={{ fontWeight: 600 }}>{user.name}</div>
                <div style={{ opacity: 0.75 }}>{user.role}</div>
                <div style={{ opacity: 0.75 }}>{user.email}</div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Acties</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem button routerLink="/instellingen" detail={true}>
              <IonLabel>Instellingen</IonLabel>
              <IonIcon slot="end" icon={settingsOutline} />
            </IonItem>


            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <IonButton color="danger" onClick={handleLogout}>
                Uitloggen
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profiel;