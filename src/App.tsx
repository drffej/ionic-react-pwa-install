
import { IonApp,  IonButton,  IonContent,  IonHeader,  IonPage,  IonTitle,  IonToolbar,  setupIonicReact } from '@ionic/react';
import  React from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

import { useIonicPWAInstall}  from '../'
const App: React.FC = () => {
  
  const { isSupported, isInstalled, platform, pwaInstall} = useIonicPWAInstall()!
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic PWA Demo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <h1>PWA Data</h1>
          <p>Is install prompt available? { isSupported ? 'true' : 'false'}</p> 
          <p>Is installed? {isInstalled ? 'true' : 'false'}</p>
          <p>Platform? {platform}</p>
          {(isSupported && !isInstalled) &&
          
            <IonButton onClick={pwaInstall}>Install supported</IonButton>
          }
        </IonContent>
      </IonPage>
    </IonApp>
)};

export default App;
