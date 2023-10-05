// taken and adapted from https://github.com/zoltangy/react-pwa-install
import { IonModal, IonButton, IonIcon, IonContent, IonHeader, IonItem, IonLabel, IonTitle, IonToolbar, IonList } from "@ionic/react"
import React from 'react';
import { platforms } from "../Platforms"
import { HomeIcon, FireFoxA2HSIcon, MenuIcon, OperaA2HSIcon } from "./Icons";
import { shareOutline, browsersOutline } from "ionicons/icons";
import './InstallDialog.css'

type InstallDialogProps = {
    title? : string
    isOpen: boolean
    onClose : () => void
    platform: string
}

export const InstallDialog : React.FC<InstallDialogProps> = (
  props : InstallDialogProps
  ) => {
  return (
    <IonModal isOpen={props.isOpen} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

        {props.platform === platforms.IDEVICE && (
          <DialogActionWithInstructions
            action1={
              <>Tap the share <IonIcon className="icon" icon={shareOutline} item-left></IonIcon> button</>
            }
            action2={<>then find and tap 'Add to Home screen      <HomeIcon />'</>}
            onClose={props.onClose}
            platform={props.platform}
          />
        )}
        {props.platform === platforms.MACSAFARI && (
          <DialogActionWithInstructions
            action1={
              <>Tap the share <IonIcon className="icon" icon={shareOutline} item-left color="black"></IonIcon> button</>
            }
            action2={<>then find and tap '<IonIcon className="icon" icon={browsersOutline} color="black" item-left></IonIcon> Add to Dock'</>}
            onClose={props.onClose}
            platform={props.platform}
          />
        )}
        {props.platform === platforms.FIREFOX && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap this icon on the address bar:
                <FireFoxA2HSIcon />
              </>
            }
            action2={<>then tap '+Add to Home screen'</>}
            onClose={props.onClose}
            platform={props.platform}
          />
        )}
        {props.platform === platforms.FIREFOX_NEW && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap the menu IonButton:
                <MenuIcon />
              </>
            }
            action2={<>then tap 'Install'</>}
            onClose={props.onClose}
            platform={props.platform}
          />
        )}
        {props.platform === platforms.OPERA && (
          <DialogActionWithInstructions
            action1={
              <>
                Tap the menu IonButton:
                <MenuIcon />
              </>
            }
            action2={
              <>
                then tap &nbsp;'
                <OperaA2HSIcon />
                Home screen'
              </>
            }
            onClose={props.onClose}
            platform={props.platform}
          />
        )}
        {props.platform === platforms.OTHER && (
        <IonList>
          <IonItem key="instructions" lines="none">
            <IonLabel class="ion-text-wrap" >
            Unfortunately the install feature is not supported by your browser.
            </IonLabel>
          </IonItem >
          <IonItem key="buttons" lines="none">
            <IonButton slot="end" size="default" onClick={props.onClose}>Ok</IonButton> 
          </IonItem>
        </IonList>
        )}        
      </IonContent>
    </IonModal>
  )

}



type DialogActionWithInstructionsProps = {
  action1 : React.JSX.Element
  action2 : React.JSX.Element
  onClose : () => void
  platform : string
}


function DialogActionWithInstructions(props : DialogActionWithInstructionsProps ) {
  return (
    <IonList>
      <IonItem key="instruction" lines="none">
        <IonLabel class="ion-text-wrap">
        This site can be installed as an application that will run in its own window.
        { props.platform === platforms.MACSAFARI && <> <br />(If you have MacOS Sonoma installed).</> }
        </IonLabel>
      </IonItem>
      <IonItem key="instructions" lines="none">
        <IonLabel class="ion-text-wrap">
        To install this app:
          <ul>
            <li>
              {props.action1}
            </li>
            <li>{props.action2}</li>
          </ul>
        </IonLabel>
      </IonItem >
      <IonItem key="buttons" lines="none">
        <IonButton slot="end" size="default" onClick={props.onClose}>Ok</IonButton> 
      </IonItem>
    </IonList>
  );
}


