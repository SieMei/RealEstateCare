
import { IonButton } from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default function PhotoCapture({ onAdd, label = "Maak foto", quality = 60, width = 1280 }) {
  async function takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality,
        resultType: CameraResultType.DataUrl, // data:image/jpeg;base64,...
        source: CameraSource.Camera,          // Camera; gebruik .Prompt voor keuze Camera/Galerij
        width,
        allowEditing: false,
      });
      if (image?.dataUrl && onAdd) onAdd(image.dataUrl);
    } catch (e) {
      // user cancel of permissie geweigerd -> geen fout tonen
    }
  }

  async function pickFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // fotobibliotheek
        width,
        allowEditing: false,
      });
      if (image?.dataUrl && onAdd) onAdd(image.dataUrl);
    } catch (e) { // eslint-disable-line no-empty
      // User cancelled the action or denied permissions, so we do nothing.
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <IonButton onClick={takePhoto}>{label}</IonButton>
      <IonButton fill="outline" onClick={pickFromGallery}>Kies uit galerij</IonButton>
    </div>
  );
}