import { SettingsController } from "./controllers/settings-controller";
import { TemperatureController } from "./controllers/temperature-controller";
import { LightController } from "./controllers/light-controller";
import { ISettings } from "./domain/models/settings";
import { ITemperature } from "./domain/models/temperature";
import { ILight } from "./domain/models/light";

class SmartHouse {
    private static _settings: ISettings;
    private static _temperatureController: ITemperature;
    private static _lightController: ILight;

    constructor() {
        SmartHouse._settings = new SettingsController();
        SmartHouse._temperatureController = new TemperatureController();
        SmartHouse._lightController = new LightController();
    }

    connectDevices() {
        SmartHouse._settings.attach(SmartHouse._temperatureController);
        SmartHouse._settings.attach(SmartHouse._lightController);
    }

    disconnectDevices() {
        SmartHouse._settings.detach(SmartHouse._temperatureController);
        SmartHouse._settings.detach(SmartHouse._lightController);
    }

    getTemperatureBySensor() {
        const newTemperature = Math.floor(Math.random() * (10 + 1)); // get data from sensor;
        SmartHouse._settings.setTemperature(newTemperature);
    }

    getLightBySensor() {
        const newLight = Math.floor(Math.random() * (10 + 1)); // get data from sensor;
        SmartHouse._settings.setLight(newLight);
    }
}

const smartHouse = new SmartHouse();

smartHouse.connectDevices();
smartHouse.getTemperatureBySensor();
smartHouse.getLightBySensor();
smartHouse.disconnectDevices();
