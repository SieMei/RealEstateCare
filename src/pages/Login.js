
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

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [serverCode, setServerCode] = useState("");
  const [code, setCode] = useState("");
  const [toast, setToast] = useState({ open: false, msg: "", color: "success", dur: 2500 });
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
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

  const handleSend = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return show("Vul een geldig e-mailadres in.", "warning", 3500);
    }
    const c = genCode();
    setServerCode(c);
    setSent(true);
    setCooldown(30);
    show(`Je 2FA-code is: ${c}`, "medium", 10000);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    const c = genCode();
    setServerCode(c);
    setCooldown(30);
    show(`Nieuwe 2FA-code: ${c}`, "medium", 10000);
  };

  const handlePaste = async () => {
    try {
      const txt = await navigator.clipboard.readText();
      setCode((txt || "").replace(/\D/g, "").slice(0, 6));
    } catch {
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!code || code !== serverCode) {
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
        {!sent ? (
          <form onSubmit={handleSend} noValidate>
            <IonItem>
              <IonLabel position="stacked">E-mail</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="jij@rec.nl"
                onIonChange={(e) => setEmail(e.detail.value)}
                required
              />
            </IonItem>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <IonButton type="submit">Stuur code</IonButton>
            </div>
            <IonText color="medium">
              <p style={{ marginTop: 12 }}>
                Dit is een <b>2FA-simulatie</b>. De code verschijnt als melding én hieronder in het scherm.
              </p>
            </IonText>
          </form>
        ) : (
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

            <form onSubmit={handleLogin} noValidate>
              <IonItem>
                <IonLabel position="stacked">Bevestig code</IonLabel>
                <IonInput
                  inputmode="numeric"
                  maxlength={6}
                  value={code}
                  placeholder="6-cijferige code"
                  onIonChange={(e) => setCode((e.detail.value || "").replace(/\D/g, "").slice(0, 6))}
                  required
                />
              </IonItem>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <IonButton fill="outline" onClick={() => setSent(false)}>Andere e-mail</IonButton>
                <IonButton type="submit" disabled={code.length !== 6}>Inloggen</IonButton>
              </div>
            </form>
          </>
        )}

        <IonToast
          isOpen={toast.open}
          message={toast.msg}
          color={toast.color}
          duration={toast.dur}
          onDidDismiss={() => setToast({ ...toast, open: false })}
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;