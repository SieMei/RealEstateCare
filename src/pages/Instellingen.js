
import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonButtons,
  IonToast,
  IonBackButton,
} from "@ionic/react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultUser = {
  name: "Marieke de Boer",
  email: "m.deboer@rec.nl",
  role: "Inspecteur vastgoed",
};

const Instellingen = () => {
  const [dark, setDark] = useLocalStorage("darkMode", false);
  const [user] = useLocalStorage("user", defaultUser);

  // voorkeuren
  const [notifications, setNotifications] = useLocalStorage("prefersNotifications", true);
  const [locale, setLocale] = useLocalStorage("locale", "nl");

  // wachtwoord (demo!)
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [toast, setToast] = useState({ open: false, msg: "", color: "success" });

  function showToast(msg, color = "success") {
    setToast({ open: true, msg, color });
  }

  function handlePwChange(e) {
    e.preventDefault();
    if (!oldPw || !newPw || !newPw2) return showToast("Vul alle velden in.", "warning");
    if (newPw !== newPw2) return showToast("Nieuw wachtwoord komt niet overeen.", "warning");
    // demo: geen echte backend call
    setOldPw("");
    setNewPw("");
    setNewPw2("");
    showToast("Wachtwoord gewijzigd.");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profiel" />
          </IonButtons>
          <IonTitle>Instellingen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Account */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Account</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><b>Naam:</b> {user.name}</p>
            <p><b>E-mail:</b> {user.email}</p>
            <p><b>Rol:</b> {user.role}</p>
          </IonCardContent>
        </IonCard>

        <IonList inset>
          <IonItem>
            <IonLabel>Donker thema</IonLabel>
            <IonToggle
              checked={!!dark}
              onIonChange={(e) => setDark(e.detail.checked)}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Meldingen</IonLabel>
            <IonToggle
              checked={!!notifications}
              onIonChange={(e) => setNotifications(e.detail.checked)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Taal</IonLabel>
            <IonSelect
              value={locale}
              onIonChange={(e) => setLocale(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="nl">Nederlands</IonSelectOption>
              <IonSelectOption value="en">English</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        {/* wachtwoord wijzigen (demo) */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Wachtwoord wijzigen</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handlePwChange}>
              <IonItem>
                <IonLabel position="stacked">Huidig wachtwoord</IonLabel>
                <IonInput
                  type="password"
                  value={oldPw}
                  onIonChange={(e) => setOldPw(e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nieuw wachtwoord</IonLabel>
                <IonInput
                  type="password"
                  value={newPw}
                  onIonChange={(e) => setNewPw(e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Herhaal nieuw wachtwoord</IonLabel>
                <IonInput
                  type="password"
                  value={newPw2}
                  onIonChange={(e) => setNewPw2(e.detail.value)}
                />
              </IonItem>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                <IonButton type="submit">Opslaan</IonButton>
              </div>
            </form>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          color={toast.color}
          duration={1800}
          onDidDismiss={() => setToast({ ...toast, open: false })}
        />
      </IonContent>
    </IonPage>
  );
};

export default Instellingen;
