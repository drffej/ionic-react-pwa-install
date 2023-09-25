# ionic-react-pwa-install

[![npm package][npm-badge]][npm]
![npm][npm-downloads]

Install handler for Ionic React [PWA] applications.

Installing a PWA applications (i.e. [add to home screen]) are handled differently by the different browser applications and devices being used.  Currently Chrome, Edge and Samsung browsers support this natively and this can be captured and handled via the [beforeinstallpromptevent].  On iOS devices, Firefox Mobile or Opera mobile the application has to be install manually via the browser menu options.   This can make it very hard to develop a consistent experience for users a PWA application using different browsers and applications.

A number PWA helper packages have been developed to alleviate this situation and this one is intended to support Ionic PWA application installations.

## What this package does

This package provides a simple way to add a installer for Ionic PWA applications.   It provides:
- information if this applications naively support PWA installation and a interface to call the installer
- information if manual installation is available and a interface to display instructions on how to do this

## Demo

To view the demo visit - https ....

## Installation

To use the package, this assumes you will be using Ionic as the UI

```shell
$ npm i --save ionic-react-pwa-install 
```

## Usage

1. Import `IonicPWAInstallProvider` and `useIonicPWAInstall`
2. Wrap your App with the `IonicPWAInstallProvider`.
3. `useIonicPWAInstall` returns the following interface:
```javascript
type IonicPWAInstallInterface = {
  isSupported: boolean;  // returns true if platform specific installer is supported
  isInstalled: boolean;  // returns true if application is running as an app windows
  platform : string  // returns platform type one of 'native', 'other', 'firefox', 'idevice', 'opera'
  pwaInstall : () => Promise<boolean> | null   // call the platform specific installer
  pwaManualInstall : () => void // show the manual installation
}
```

3. Use the `supported` and `isInstalled` ( from `useReactPWAInstall`) functions to determine whether to show the appropriate Install button (or banner,popup,etc...)
4. Call `pwaInstall` or `pwaManualInstall`  depending on the value of `supported` and `isInstalled` .


```javascript
import { useIonicPWAInstall, IonicPWAInstallProvider}  from 'ionic-react-pwa-install'
const App: React.FC = () => {
  
  const { isSupported, isInstalled, platform, pwaInstall, pwaManualInstall} = useIonicPWAInstall()!

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
          {!isSupported &&
            <IonButton onClick={pwaManualInstall}>Manual Install</IonButton>
          }
        </IonContent>
      </IonPage>
    </IonApp>
)};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
   <IonicPWAInstallProvider>
      <App />
   </IonicPWAInstallProvider>
  </React.StrictMode>
);
```

## Interface Details

- `IonicPWAInstallProvider`: Context provider, required. 
- `useIonicPWAInstall`: React hook that provides `pwaInstall`, `iSupported`, `isInstalled`, `platform` and `pwaManualInstall`
- `isSupported`: Helper to decide if the install button should be shown to the user. Returns true in 2 cases:
  - the [beforeinstallpromptevent] event is supported, and it has fired
  - manual installation is supported
- `isInstalled`: Helper to decide if the install button should be shown to the user. Returns true if the user is currently visiting the site from the installed 'standalone' app.
- `platform` : Help to decide what platform is being used
- `pwaInstall`: Will open the installation dialog according to the user's platform. This function returns a promise. The promise is returns False if the user cancels the native installation process. The promise returns True when the native installation was successful.
- `pwaManualInstall`: Will open instructions to show to how to manually install the PWA application

The following logic can be used to help decide what dialog box to call

`isSupported` | `isInstalled` | `platform` | Action
:-------------|:--------------|:-----------|:------
`TRUE`        | `FALSE`       | `native`   | Native installation available via `pwaInstall`.
`TRUE`        | `TRUE`        | `native`    | Site running as standalone app, no action.
`FALSE`       | `FALSE`       | `firefox` or `idevice` or `opera` | Manual installation available, display instructions via `pwaNativeInstall`. 

# Further Reading

For more information see [this guide] about how to promote PWA installation from an Ionic PWA.  See [pwa is installable] on the criteria to get the installation prompt.


# Acknowledgements

A lot of the package ideas and some of the code is based on the `react-pwa-install` package.   See [https://github.com/zoltangy/react-pwa-install](https://github.com/zoltangy/react-pwa-install) for details.

The main differences are:
- Uses Typescript and Vite as the bundler
- Use Ionic UI instead of material UI
- Exposes the platform type


[npm-badge]: https://img.shields.io/npm/v/ionic-react-pwa-install
[npm-downloads]: https://img.shields.io/npm/dt/ionic-react-pwa-install
[npm]: https://www.npmjs.com/package/ionic-react-pwa-install
[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[add to home screen]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
[beforeinstallpromptevent]: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
[this guide]: https://web.dev/promote-install/
[pwa is installable]: https://web.dev/install-criteria/
