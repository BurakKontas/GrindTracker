import {
  OWWindow,
  OWGameListener,
  OWGames,
  OWHotkeys,
} from "@overwolf/overwolf-api-ts";
import { kHotkeys, kWindowNames, kGameClassIds } from "../../constants/consts";
import { EventBus } from "../../classes/EventBus";

const HOTKEY_NAMES = {
  appToggle: "app_showhide",
  grindTrackerToggle: "grind_tracker_showhide",
  timerToggle: "timer_showhide",
};
const WINDOW_STATES = {
  NORMAL: "normal",
  MINIMIZED: "minimized",
  MAXIMIZED: "maximized",
  CLOSED: "closed",
};

class BackgroundController {
  static _instance;
  static _running;
  _windows = {};
  _gameListener;

  constructor() {
    this._gameListener = new OWGameListener({
      onGameStarted: this.toggleWindows.bind(this),
      onGameEnded: this.toggleWindows.bind(this),
    });

    window.overwolf?.extensions.onAppLaunchTriggered.addListener((e) =>
      this.onAppLaunchTriggered(e)
    );

    this.setToggleHotkeyBehavior();

    this.init();
  }

  static instance() {
    if (!BackgroundController._instance) {
      console.log("Making background controller instance");
      BackgroundController._instance = new BackgroundController();
    }
    return BackgroundController._instance;
  }

  async init() {
    this._windows = {
      [kWindowNames.app]: new OWWindow(kWindowNames.app),
      [kWindowNames.grindTracker]: new OWWindow(kWindowNames.grindTracker),
      [kWindowNames.timer]: new OWWindow(kWindowNames.timer),
      [kWindowNames.desktop]: new OWWindow(kWindowNames.desktop),
    };

    //Should be available using overwolf.windows.getMainWindow()
    console.log("Calling event bus from background controller");
    window.EventBus = EventBus.instance();
  }

  async run() {
    this._gameListener.start();
    this._windows[kWindowNames.desktop].restore();
    
    let running = await this.isGameRunning()
    let supported = await this.isSupportedGameRunning()
    let condition = running && supported

    if(condition) {
      this._windows[kWindowNames.app].restore();
    }
  }

  showGrindTracker() {
    const grindTrackerWindow = this._windows[kWindowNames.grindTracker];
    grindTrackerWindow.restore();
  }

  async onAppLaunchTriggered(e) {
    console.log("In background controller onAppLaunchTriggered", e);

    if (!e || e.origin.includes("gamelaunchevent")) {
      return;
    }

    if (await this.isGameRunning() && await this.isSupportedGameRunning()) {
    console.log("Game is running and supported");
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.app].restore();
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.app].close();
    }
  }

  toggleWindows(info) {
    if (!info || !this.isSupportedGameRunning(info)) {
      return;
    }
    console.log("Toggling windows", info)
    if (info.isRunning && this.isSupportedGame(info)) {
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.app].restore();
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.app].close();
    }
  }


  async setToggleHotkeyBehavior() {
    const toggleHotkeyWindow = async (hotkeyResult) => {
      console.log("Hotkey pressed ", hotkeyResult);

      let windowName;
      if (hotkeyResult.name === kHotkeys.appToggle)
        windowName = kWindowNames.app;
      else if (hotkeyResult.name === kHotkeys.grindTrackerToggle)
        windowName = kWindowNames.grindTracker;

      const window = this._windows[windowName];
      const windowState = await window.getWindowState();

      if (
        windowState.window_state === WINDOW_STATES.NORMAL ||
        windowState.window_state === WINDOW_STATES.MAXIMIZED
      ) {
        window.minimize();
      } else if (
        windowState.window_state === WINDOW_STATES.MINIMIZED ||
        windowState.window_state === WINDOW_STATES.CLOSED
      ) {
        window.restore();
      }
    };
    console.log("Listening to hotkeys");

    OWHotkeys.onHotkeyDown(HOTKEY_NAMES.appToggle, toggleHotkeyWindow);

    OWHotkeys.onHotkeyDown(
      HOTKEY_NAMES.grindTrackerToggle,
      toggleHotkeyWindow
    );

    OWHotkeys.onHotkeyDown(HOTKEY_NAMES.timerToggle, toggleHotkeyWindow);
  }

  async isSupportedGameRunning() {
    const info = await OWGames.getRunningGameInfo();
    return info && info.isRunning && this.isSupportedGame(info);
  }

  isSupportedGame(info) {
    return kGameClassIds.includes(info.classId);
  }

  async isGameRunning() {
    const info = await OWGames.getRunningGameInfo();
    return info && info.isRunning;
  }
}

BackgroundController.instance().run();
