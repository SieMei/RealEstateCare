
import { useEffect, useMemo, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonToast, IonText, IonCard, IonCardContent
} from "@ionic/react";
import { login } from "../services/auth";
const DEFAULT_USER = {
  name: "Marieke de Boer",
  email: "marieke.deboer@rec.nl",
  role: "Inspecteur Vastgoed",
};

function gen2FACode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const Login = ({ history }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [toast, setToast] = useState({ open: false, msg: "", color: "success", dur: 2500 });
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function show(msg, color = "success", dur = 2500) {
    setToast({ open: true, msg, color, dur });
  }

  const maskedEmail = useMemo(() => {
    if (!email) return "";
    const [u, d] = email.split("@");
    if (!d) return email;
    const uu = u.length <= 2 ? u : u.slice(0, 2) + "****";
    return `${uu}@${d}`;
  }, [email]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return show("Vul een geldig e-mailadres in.", "warning", 3500);
    }
    if (!password) {
      return show("Vul een wachtwoord in.", "warning", 3500);
    }
    // simuleer succesvolle wachtwoordverificatie, ga naar 2FA
    const c = gen2FACode();
    setServerCode(c);
    setCooldown(30);
    setStep(2);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    const c = gen2FACode();
    setServerCode(c);
    setCooldown(30);
    show("Een nieuwe code is gegenereerd.", "success", 2000);
  };

  const handlePaste = async () => {
    try {
      const txt = await navigator.clipboard.readText();
      setUserCode((txt || "").replace(/\D/g, "").slice(0, 6));
    } catch {
    }
  };

  const handle2FASubmit = (e) => {
    e.preventDefault();
    if (!userCode || userCode !== serverCode) {
      return show("Onjuiste code.", "danger", 3000);
    }

    login({ email, user: DEFAULT_USER });
    show("Ingelogd.", "success", 1200);
    setTimeout(() => history.replace("/dashboard"), 200);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Inloggen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {step === 1 && (
          <form onSubmit={handlePasswordSubmit} noValidate>
            <IonItem>
              <IonLabel position="stacked">E-mailadres</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="jij@rec.nl"
                onIonInput={(e) => setEmail(e.detail.value ?? "")}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Wachtwoord</IonLabel>
              <IonInput
                type="password"
                value={password}
                placeholder="Wachtwoord"
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
                required
              />
            </IonItem>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <IonButton type="submit">Volgende</IonButton>
            </div>
            <IonText color="medium">
              <p style={{ marginTop: 12 }}>
                Dit is een <b>login-simulatie</b>. U kunt een willekeurig e-mailadres invullen en elk wachtwoord wordt geaccepteerd. De voltooide app werkt uiteraard met een werkende login.
              </p>
            </IonText>
          </form>
        )}

        {step === 2 && (
          <>
            <IonCard>
              <IonCardContent style={{ textAlign: "center" }}>
                <div style={{ opacity: 0.7, marginBottom: 6 }}>
                  Code verzonden naar <b>{maskedEmail}</b>
                </div>
                <div style={{ fontSize: 28, letterSpacing: 4, fontWeight: 700 }}>
                  {serverCode.split("").join(" ")}
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
                  <IonButton size="small" fill="outline" onClick={handleResend} disabled={cooldown > 0}>
                    {cooldown > 0 ? `Opnieuw sturen (${cooldown})` : "Opnieuw sturen"}
                  </IonButton>
                  <IonButton size="small" fill="outline" onClick={handlePaste}>
                    Plak code
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            <form onSubmit={handle2FASubmit} noValidate>
              <IonItem>
                <IonLabel position="stacked">Bevestig code</IonLabel>
                <IonInput
                  inputmode="numeric"
                  value={userCode}
                  placeholder="6-cijferige code"
                  onIonInput={e => {
                    const val = e.detail.value ?? "";
                    setUserCode(val.replace(/\D/g, "").slice(0, 6));
                  }}
                  required
                />
              </IonItem>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <IonButton fill="outline" onClick={() => setStep(1)}>Terug</IonButton>
                <IonButton type="submit" disabled={userCode.length !== 6}>Inloggen</IonButton>
              </div>
            </form>
          </>
        )}

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          color={toast.color}
          duration={toast.dur}
          onDidDismiss={() => setToast(t => ({ ...t, open: false }))}
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;