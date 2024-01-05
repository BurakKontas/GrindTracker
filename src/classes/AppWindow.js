import { OWWindow } from "@overwolf/overwolf-api-ts";
import windowCloseSVG from "../assets/img/window_close.svg";
import windowMinimizeSVG from "../assets/img/window_minimize.svg";
import windowHotkeySVG from "../assets/img/window_settings.svg";
import { kWindowNames } from "../constants/consts";
// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
  constructor(windowName) {
    this.mainWindow = new OWWindow("background");
    this.currWindow = new OWWindow(windowName);

    const closeButton = document.getElementById("closeButton");
    const minimizeButton = document.getElementById("minimizeButton");
    const hotkeyButton = document.getElementById("hotkeyButton");

    const header = document.getElementById("header");

    closeButton.innerHTML = windowCloseSVG;
    minimizeButton.innerHTML = windowMinimizeSVG;
    hotkeyButton.innerHTML = windowHotkeySVG;

    this.setDrag(header);

    const trayMenu = {
      "menu_items": [{
              "label": "Show",
              "id": "app_showhide"
          },
          {
              "label": "Exit",
              "id": "app_exit"
          },
          {
            "label": "Settings",
            "id": "app_settings"
          }
      ]
    };

    window.overwolf.os.tray.setMenu(trayMenu, () => {});

    window.overwolf.extensions.onAppLaunchTriggered.addListener(async () => {
      let hidden = window.overwolf.windows.enums.WindowStateEx.hidden;
      let status = await this.currWindow.getWindowState();
      if(status.window_state_ex === hidden) {
        this.currWindow.restore();
      }
    });

    window.overwolf.os.tray.onTrayIconDoubleClicked.addListener(() => {
      this.currWindow.restore();
    });

    window.overwolf.os.tray.onMenuItemClicked.addListener((res) => {
      console.log("onMenuItemClicked -> res", res)
      switch (res.item) {
        case "app_showhide":
          this.currWindow.restore();
          break;
        case "app_exit":
          this.mainWindow.close();
          window.overwolf.os.tray.destroy();
          break;
        case "app_settings":
          window.location.href = "overwolf://settings/games-overlay?hotkey=null";
          break;
        default:
          break;
      }
    });

    closeButton.addEventListener("click", async () => {
      if (windowName === kWindowNames.app) await this.currWindow.hide();
      else this.currWindow.close();


    });

    minimizeButton.addEventListener("click", () => {
      this.currWindow.minimize();
    });

    hotkeyButton.addEventListener("click", () => {
      window.location.href = (windowName == kWindowNames.grindTracker) ? 
      "overwolf://settings/games-overlay?hotkey=grind_tracker_showhide" :
        "overwolf://settings/games-overlay?hotkey=app_showhide";
    });
  }

  async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}
