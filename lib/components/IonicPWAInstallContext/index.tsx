// taken and adapted from https://github.com/zoltangy/react-pwa-install
import React from 'react'
import { getPlatform } from "../Platforms";
import {InstallDialog} from "../PWAManualInstallDialog/InstallDialog";

function isInstalled() {
  const isStandalone =
      "standalone" in window.navigator && window.navigator.standalone;
  if (isStandalone === true || window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  }
  return false;
}

type IonicPWAInstallInterface = {
  isSupported: boolean;
  isInstalled: boolean;
  platform : string
  pwaInstall : () => Promise<boolean> | null
  pwaManualInstall : () => void
}

const IonicPWAInstallContext = React.createContext<IonicPWAInstallInterface|undefined>(undefined);

const platform = getPlatform();

type Props = {
  children: React.ReactNode;
};

export const IonicPWAInstallProvider : React.FC<Props> = ({children}) => {

  const [dialogState,setDialogState] = React.useState(false)

  function handleClose() {
    setDialogState(false);
  }

  const pwaManualInstall = () => {
    setDialogState(true)
  }

  const initialInstallState = {
    isSupported : false,
    isInstalled : isInstalled(),
    pwaInstall : () => null,
    pwaManualInstall: pwaManualInstall,
    platform: platform
  }

  const [pwaState, setPWAState] = React.useState<IonicPWAInstallInterface>(initialInstallState)
  
  React.useEffect(() => {

    // if native install event fired, then allow native installer
    const handleBeforeInstallPromptEvent  = (event : Event) => {
      // prevent prompt from showing, so we can call it later
      event.preventDefault();

      const pwaInstallNative  =  async () : Promise<boolean>  => {
        // use native installer  

        // @ts-ignore: prompt does exist
        const installResponse = await event.prompt();
        if (installResponse === 'accepted'){
          setPWAState({
            ...pwaState,
            isInstalled : isInstalled()
          })
          return true;
        }
        return false;
      }

      setPWAState({
        isSupported: true,
        isInstalled : isInstalled(),
        pwaInstall: pwaInstallNative,
        pwaManualInstall: pwaManualInstall,
        platform: platform
      })
    }

    // handle installation event - check if we are standalone
    const handleAppInstalledEvent = () => {
      setTimeout(()=> setPWAState({
        ...pwaState,
        isInstalled : isInstalled()
      }), 200)
    }

    // handle standalone 
    const handleMatchMedia = () => {
      setPWAState({
        ...pwaState,
        isInstalled : isInstalled()
      })
    }

    // setup PWA installed prompt listener i.e. native install possible 
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPromptEvent);

    // set PWA I have installed listener
    window.addEventListener("appinstalled", handleAppInstalledEvent)

    // add listener for when opened on task bar - chrome and edge
    window.matchMedia("(display-mode: standalone)").addEventListener("change",handleMatchMedia)

    return () => {
      // clean up event listeners
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent)
      window.removeEventListener('appinstalled', handleAppInstalledEvent)
      window.matchMedia("(display-mode: standalone)").removeEventListener("change",handleMatchMedia)
    }
  },[platform])

  return(
    <>
      <InstallDialog
        isOpen={dialogState}
        onClose={handleClose}
        platform={platform}
        title="Install App?"
      />
      <IonicPWAInstallContext.Provider value={pwaState}>{children}</IonicPWAInstallContext.Provider >
    </>
  )
}

export const useIonicPWAInstall = () => React.useContext(IonicPWAInstallContext);
