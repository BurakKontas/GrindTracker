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

    try {
      const header = document.getElementById("header");
      this.setDrag(header);
    } catch (e) {
      console.error("Error setting up window drag", e);
    }

    try {
        const closeButton = document.getElementById("closeButton");
        closeButton.innerHTML = windowCloseSVG;

        closeButton.addEventListener("click", async () => {
        if (windowName === kWindowNames.desktop) await this.currWindow.hide();
        else this.currWindow.close();
        });
    } catch (e) {
        console.error("Error setting up window controls", e);
    }

    try {
        const minimizeButton = document.getElementById("minimizeButton");
        minimizeButton.innerHTML = windowMinimizeSVG;
        
        minimizeButton.addEventListener("click", () => {
            this.currWindow.minimize();
        });
    } catch (e) {
        console.error("Error setting up window controls", e);
    }



    try {
        const hotkeyButton = document.getElementById("hotkeyButton");
        hotkeyButton.innerHTML = windowHotkeySVG;

        hotkeyButton.addEventListener("click", () => {
            window.location.href = (windowName == kWindowNames.grindTracker) ? 
            "overwolf://settings/games-overlay?hotkey=grind_tracker_showhide" :
            "overwolf://settings/games-overlay?hotkey=app_showhide";
        });
    } catch (e) {
        console.error("Error setting up window controls", e);
    }

    const trayMenu = {
      "menu_items": [
        {
            "label": "Show",
            "id": "app_showhide"
        },
        {
          "label": "Shortcuts",
          "id": "app_settings"
        },
        {
            "label": "Exit",
            "id": "app_exit"
        },
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
}

  async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}
