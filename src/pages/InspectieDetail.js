
import { useEffect, useMemo, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchInspectionById,
  selectInspectionById,
  STATUS,
} from "../store/inspectionsSlice";
import IncidentForm from "../components/IncidentForm";
import { patchInspection } from "../services/api";

function fmtDate(d) {
  if (!d) return "-";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString("nl-NL");
}

export default function InspectieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const inspection = useSelector((s) => selectInspectionById(s, id));
  const loadStatus = useSelector((s) => s.inspections?.status ?? "idle");

  // concept (draft) bijhouden in lokale state
  const [draft, setDraft] = useState(inspection?.draft || null);
  const [toast, setToast] = useState({ open: false, msg: "", color: "success" });

  useEffect(() => {
    if (!inspection) {
      dispatch(fetchInspectionById(id));
    } else {
      // draft initialiseren (indien nodig)
      setDraft((prev) => (prev ?? inspection.draft ?? null));
    }
  }, [dispatch, id, inspection]);

  const items = useMemo(() => inspection?.incidents || [], [inspection]);

  // formulier blokkeren bij afgeronde/ingediende/gearchiveerde rapportages
  const lockedStatuses = [STATUS.INGEDIEND, STATUS.AFGEROND, STATUS.GEARCHIVEERD];
  const isLocked = !!inspection && lockedStatuses.includes(inspection.status);

  async function handleSave() {
    if (!draft) return;

    const newItem = {
      id: `INC-${Math.random().toString(36).slice(2, 8)}`,
      photos: Array.isArray(draft?.photos) ? draft.photos : [],
      extraFields: Array.isArray(draft?.extraFields) ? draft.extraFields : [],
      ...draft,
    };

    try {
      const next = [...items, newItem];

      // opslaan naar server
      const payload = {
        incidents: next,
        draft: null,
        updatedAt: new Date().toISOString(),
      };
      if (inspection?.status === STATUS.TOEGEWEZEN) {
        payload.status = STATUS.IN_UITVOERING;
      }

      await patchInspection(id, payload);
      await dispatch(fetchInspectionById(id));
      setDraft(null);
      setToast({ open: true, msg: "Het formulier is opgeslagen.", color: "success" });
    } catch (e) {
      setToast({
        open: true,
        msg: "Er kon niet naar de server geschreven worden. Uw wijzigingen zijn lokaal bewaard.",
        color: "warning",
      });
    }
  }

  async function handleSubmitInspection() {
    try {
      const payload = {
        status: STATUS.INGEDIEND,
        updatedAt: new Date().toISOString(),
      };
      await patchInspection(id, payload);
      // opnieuw ophalen om locked status te activeren
      await dispatch(fetchInspectionById(id));
      setToast({ open: true, msg: "Inspectie succesvol ingediend.", color: "success" });
    } catch (e) {
      setToast({ open: true, msg: "Indienen van inspectie is mislukt.", color: "danger" });
    }
  }


  if (!inspection) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/inspecties" />
            </IonButtons>
            <IonTitle>Inspectie</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {loadStatus === "loading" ? "Laden…" : "Gegevens worden opgehaald" }
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/inspecties" />
          </IonButtons>
          <IonTitle>{inspection.address}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Gegevens */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Gegevens</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div><b>Status:</b> {inspection.status || "-"}</div>
            <div><b>Doel van inspectie:</b> {(inspection.purpose || []).join(", ") || "-"}</div>
            <div><b>Laatst gewijzigd:</b> {fmtDate(inspection.updatedAt)}</div>

            {isLocked && (
              <IonText color="medium">
                <p style={{ marginTop: 8 }}>
                  ✳️ Deze rapportage is <b>{inspection.status}</b> en kan niet meer bewerkt worden.
                </p>
              </IonText>
            )}

            {!isLocked && inspection?.draft && (
              <IonText color="medium">
                <p style={{ marginTop: 8 }}>
                  Er is een opgeslagen concept aanwezig. U kunt verdergaan waar u gebleven was.
                </p>
              </IonText>
            )}

          </IonCardContent>
        </IonCard>

        {/* nieuwe inspectie */}  
        {!isLocked && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Nieuwe inspectie</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <>
                  <IncidentForm initial={inspection.draft || {}} onChange={setDraft} />
  
                  {/* visuele scheiding voor Opslaan-knop */}
                  <div
                    style={{
                      height: "2px",
                      background: "var(--ion-color-step-200, #cccccc)",
                      margin: "16px 0",
                    }}
                    aria-hidden="true"
                  />
  
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12, flexWrap: "wrap" }}>
                    <IonButton fill="outline" onClick={() => setDraft(null)}>
                      Annuleren
                    </IonButton>
                    <IonButton onClick={handleSave} disabled={!draft}>
                      Opslaan
                    </IonButton>
                  </div>
                </>
            </IonCardContent>
          </IonCard>
        )}

        {/* inspectie indienen */}
        {!isLocked && (
          <IonCard>

            <IonCardContent>
              <IonButton
                expand="block"
                onClick={handleSubmitInspection}
                disabled={!!draft || items.length === 0}
              >
                Inspectie Indienen
              </IonButton>
              {(!!draft || items.length === 0) && <IonText color="medium"><p style={{ fontSize: '0.8em', textAlign: 'center', marginTop: '4px' }}>Rond  het openstaande formulier af en voeg minimaal één inspectie-item toe.</p></IonText>}
            </IonCardContent>
          </IonCard>
        )}

        {/* eerdere inspecties */}
        <h3 style={{ marginTop: 16 }}>Eerdere inspecties</h3>
        <IonList inset>
          {items.length === 0 && (
            <IonItem>
              <IonLabel>Er zijn nog geen eerdere inspecties vastgelegd.</IonLabel>
            </IonItem>
          )}

          {items.map((it) => (
            <IonItem key={it.id}>
              <IonLabel>
                <div><b>Soort:</b> {it.type}</div>
                <div><b>Locatie:</b> {it.location || "-"}</div>
                <div><b>Datum:</b> {fmtDate(it.date)}</div>

                {it.urgent ? (
                  <div style={{ color: "var(--ion-color-danger)" }}>
                    <b>Acute actie vereist</b>
                  </div>
                ) : null}

                {Array.isArray(it.extraFields) && it.extraFields.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <b>Aanvullende details:</b>
                    <ul style={{ margin: "6px 0 0 18px" }}>
                      {it.extraFields.map((kv, i) => (
                        <li key={i}>
                          <span style={{ fontWeight: 500 }}>{kv.key}:</span> {kv.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(it.photos) && it.photos.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <b>Foto’s:</b>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(96px,1fr))",
                        gap: 8,
                        marginTop: 6,
                      }}
                    >
                      {it.photos.map((url, idx) => (
                        <a key={idx} href={url} target="_blank" rel="noreferrer">
                          <img
                            src={url}
                            alt={`foto-${idx}`}
                            style={{
                              width: "100%",
                              height: 96,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonToast
        isOpen={toast.open}
        message={toast.msg}
        color={toast.color}
        duration={2400}
        onDidDismiss={() => setToast({ ...toast, open: false })}
      />
    </IonPage>
  );
}