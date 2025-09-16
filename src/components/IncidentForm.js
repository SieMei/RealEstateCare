
import { useEffect, useMemo, useState } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton, // Keep IonButton
  IonText,
} from "@ionic/react";
import PhotoCapture from "./PhotoCapture";

const DAMAGE_KIND = ["moedwillig", "slijtage", "geweld", "normaal gebruik", "calamiteit", "anders"];
const MAINTENANCE_KIND = ["schilderwerk", "houtrot", "elektra", "leidingwerk", "beglazing", "dakbedekking", "anders"];
const COST_ESTIMATE = ["0-500", "500-1500", "1500+"];
const SYSTEM_TYPE = ["koeling", "verwarming", "luchtverversing", "elektra", "beveiliging"];
const EXECUTED_BY = ["huurder", "aannemer", "onbekend"];
const ACTIONS = ["accepteren", "laten keuren", "laten verwijderen", "laten aanpassen en keuren"];

// Labels en waarden voor het 'type' veld
const TYPE_OPTIONS = [
  { value: "damage", label: "Schade" },
  { value: "maintenance", label: "Onderhoud" },
  { value: "system", label: "Installatie" },
  { value: "modification", label: "Modificatie" },
];

// helper om datum te formatteren voor <input type="date" />
function toDateInputValue(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return "";
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function IncidentForm({ initial = {}, onChange }) {
  // Form state
  const [form, setForm] = useState(() => ({
    type: initial.type || "damage",
    location: initial.location || "",
    date: initial.date || toDateInputValue(new Date()),
    urgent: !!initial.urgent,
    description: initial.description || "",

    // schade
    damageKind: initial.damageKind || "",

    // onderhoud
    maintenanceKind: initial.maintenanceKind || "",
    costEstimate: initial.costEstimate || "",

    // systeem
    systemType: initial.systemType || "",
    reportedIssues: initial.reportedIssues || "",
    testProcedureUrl: initial.testProcedureUrl || "",
    approved: !!initial.approved,
    notes: initial.notes || "",

    // modificatie
    executedBy: initial.executedBy || "",
    modDescription: initial.modDescription || "",
    action: initial.action || "", 
    existingDocsUrl: initial.existingDocsUrl || "",

    // vrije aanvullende details
    extraFields: Array.isArray(initial.extraFields) ? initial.extraFields : [],

    // foto's
    photos: Array.isArray(initial.photos) ? initial.photos : [],
  }));

  // ingeklapte extra-velden sectie
  const [showExtras, setShowExtras] = useState(false);

  // callback bij wijziging form state
  useEffect(() => {
    if (onChange) onChange(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const onChangeField = (key) => (e) => {
    const val = e?.detail?.value ?? (typeof e === "string" ? e : e?.target?.value ?? e);
    setForm((f) => ({ ...f, [key]: val }));
  };
  const onToggleField = (key) => (e) => {
    const val = !!e?.detail?.checked;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const isDamage = form.type === "damage";
  const isMaintenance = form.type === "maintenance";
  const isSystem = form.type === "system";
  const isModification = form.type === "modification";

  const todayStr = useMemo(() => toDateInputValue(new Date()), []);

  // helpers voor extra velden
  function addExtraField() {
    setForm((f) => ({
      ...f,
      extraFields: [...(f.extraFields || []), { key: "", value: "" }],
    }));
  }
  function updateExtraField(idx, part, value) {
    setForm((f) => {
      const next = [...(f.extraFields || [])];
      next[idx] = { ...next[idx], [part]: value };
      return { ...f, extraFields: next };
    });
  }
  function removeExtraField(idx) {
    setForm((f) => ({
      ...f,
      extraFields: (f.extraFields || []).filter((_, i) => i !== idx),
    }));
  }

  // foto's toevoegen / verwijderen
  function addPhoto(dataUrl) {
    setForm((f) => ({ ...f, photos: [...(f.photos || []), dataUrl] }));
  }

  function removePhoto(idx) {
    setForm((f) => ({ ...f, photos: (f.photos || []).filter((_, i) => i !== idx) }));
  }


  return (
    <>
      <IonList lines="full">
        <IonItem>
          <IonLabel position="stacked">Soort inspectie</IonLabel>
          <IonSelect
            value={form.type}
            placeholder="Kies soort"
            onIonChange={onChangeField("type")}
          >
            {TYPE_OPTIONS.map((opt) => (
              <IonSelectOption key={opt.value} value={opt.value}>
                {opt.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* algemene velden */}
        <IonItem>
          <IonLabel position="stacked">Locatie</IonLabel>
          <IonInput
            value={form.location}
            placeholder="Bijv. keuken, dak, meterkast"
            onIonChange={onChangeField("location")}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Datum</IonLabel>
          <IonInput
            type="date"
            min="2020-01-01"
            max={todayStr}
            value={toDateInputValue(form.date)}
            onIonChange={onChangeField("date")}
          />
        </IonItem>

        <IonItem>
          <IonLabel>Acute actie vereist</IonLabel>
          <IonToggle checked={!!form.urgent} onIonChange={onToggleField("urgent")} />
        </IonItem>

        {/* schade-specifiek */}
        {isDamage && (
          <>
            <IonItem>
              <IonLabel position="stacked">Soort schade</IonLabel>
              <IonSelect
                value={form.damageKind}
                placeholder="Kies soort schade"
                onIonChange={onChangeField("damageKind")}
              >
                {DAMAGE_KIND.map((k) => (
                  <IonSelectOption key={k} value={k}>
                    {k}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Omschrijving</IonLabel>
              <IonTextarea
                autoGrow
                value={form.description}
                placeholder="Korte omschrijving van de schade"
                onIonChange={onChangeField("description")}
              />
            </IonItem>
          </>
        )}

        {/* onderhoud-specifiek */}
        {isMaintenance && (
          <>
            <IonItem>
              <IonLabel position="stacked">Onderhoudstype</IonLabel>
              <IonSelect
                value={form.maintenanceKind}
                placeholder="Kies onderhoudstype"
                onIonChange={onChangeField("maintenanceKind")}
              >
                {MAINTENANCE_KIND.map((k) => (
                  <IonSelectOption key={k} value={k}>
                    {k}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Kostenindicatie</IonLabel>
              <IonSelect
                value={form.costEstimate}
                placeholder="Kies kostenindicatie"
                onIonChange={onChangeField("costEstimate")}
              >
                {COST_ESTIMATE.map((c) => (
                  <IonSelectOption key={c} value={c}>
                    {c}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </>
        )}

        {/* installatie-specifiek */}
        {isSystem && (
          <>
            <IonItem>
              <IonLabel position="stacked">Type installatie</IonLabel>
              <IonSelect
                value={form.systemType}
                placeholder="Kies installatietype"
                onIonChange={onChangeField("systemType")}
              >
                {SYSTEM_TYPE.map((t) => (
                  <IonSelectOption key={t} value={t}>
                    {t}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Gemelde issues</IonLabel>
              <IonTextarea
                autoGrow
                value={form.reportedIssues}
                placeholder="Wat is opgevallen / gemeld?"
                onIonChange={onChangeField("reportedIssues")}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Testprocedure (URL)</IonLabel>
              <IonInput
                type="url"
                value={form.testProcedureUrl}
                placeholder="/kb/testprocedure-verwarming.pdf"
                onIonChange={onChangeField("testProcedureUrl")}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Installatie goedgekeurd</IonLabel>
              <IonToggle checked={!!form.approved} onIonChange={onToggleField("approved")} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Notities</IonLabel>
              <IonTextarea
                autoGrow
                value={form.notes}
                placeholder="Aanvullende opmerkingen"
                onIonChange={onChangeField("notes")}
              />
            </IonItem>
          </>
        )}

        {/* modificatie-specifiek */}
        {isModification && (
          <>
            <IonItem>
              <IonLabel position="stacked">Uitgevoerd door</IonLabel>
              <IonSelect
                value={form.executedBy}
                placeholder="Kies uitvoerder"
                onIonChange={onChangeField("executedBy")}
              >
                {EXECUTED_BY.map((v) => (
                  <IonSelectOption key={v} value={v}>
                    {v}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Omschrijving modificatie</IonLabel>
              <IonTextarea
                autoGrow
                value={form.modDescription}
                placeholder="Wat is er aangepast?"
                onIonChange={onChangeField("modDescription")}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Actie</IonLabel>
              <IonSelect
                value={form.action}
                placeholder="Kies vervolgactie"
                onIonChange={onChangeField("action")}
              >
                {ACTIONS.map((a) => (
                  <IonSelectOption key={a} value={a}>
                    {a}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Bestaande documentatie (URL)</IonLabel>
              <IonInput
                type="url"
                value={form.existingDocsUrl}
                placeholder="/kb/modificaties-bestaand.pdf"
                onIonChange={onChangeField("existingDocsUrl")}
              />
            </IonItem>
          </>
        )}

        {/* aanvullende details (optioneel) */}
        <IonItem lines="none">
          <IonLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span><b>Aanvullende details (optioneel)</b></span>
              <IonButton size="small" fill="outline" onClick={() => setShowExtras((v) => !v)}>
                {showExtras ? "Verberg" : "Toon"}
              </IonButton>
              <IonText color="medium" style={{ fontSize: 12 }}>
                <em>Gebruik dit voor gegevens die niet in de velden hierboven passen.</em>
              </IonText>
            </div>
          </IonLabel>
        </IonItem>

        {showExtras && (
          <div style={{ padding: "0 16px 12px" }}>
            {(form.extraFields || []).length === 0 && (
              <IonText color="medium">
                <p style={{ marginTop: 8, marginBottom: 8 }}>Nog geen aanvullende details toegevoegd.</p>
              </IonText>
            )}

            {(form.extraFields || []).map((kv, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr auto",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <IonInput
                  value={kv.key}
                  placeholder="Label (bijv. dossiernummer)"
                  onIonChange={(e) => updateExtraField(idx, "key", e.detail.value)}
                />
                <IonInput
                  value={kv.value}
                  placeholder="Waarde (bijv. 2025-00123)"
                  onIonChange={(e) => updateExtraField(idx, "value", e.detail.value)}
                />
                <IonButton color="danger" onClick={() => removeExtraField(idx)}>
                  Verwijder
                </IonButton>
              </div>
            ))}

            <IonButton onClick={addExtraField}>Detail toevoegen</IonButton>
          </div>
        )}

        {/* foto's */}
        <IonItem lines="none">
          <IonLabel>Foto’s</IonLabel>
        </IonItem>
        {Array.isArray(form.photos) && form.photos.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(96px,1fr))",
              gap: 8,
              padding: "0 16px 8px",
            }}
          >
            {form.photos.map((url, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt={`foto-${i}`}
                  style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 8 }}
                />
                <IonButton
                  size="small"
                  color="danger"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                  onClick={() => removePhoto(i)}
                >
                  Verwijder
                </IonButton>
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "0 16px 12px" }}>
          <PhotoCapture onAdd={addPhoto} />
        </div>
        
      </IonList>
    </>
  );
}