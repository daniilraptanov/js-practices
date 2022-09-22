import { SettingsController } from "./controllers/settings-controller";
import { TemperatureController } from "./controllers/temperature-controller";
import { ISettings } from "./domain/models/settings";
import { ITemperature } from "./domain/models/temperature";

class SmartHouse {
    private static _settings: ISettings;
    private static _temperatureController: ITemperature;

    constructor() {
        SmartHouse._settings = new SettingsController();
        SmartHouse._temperatureController = new TemperatureController();
    }

    connectDevices() {
        SmartHouse._settings.attach(SmartHouse._temperatureController);
    }

    disconnectDevices() {
        SmartHouse._settings.detach(SmartHouse._temperatureController);
    }

    getTemperatureBySensor() {
        const newTemperature = Math.floor(Math.random() * (10 + 1));
        SmartHouse._settings.setTemperature(newTemperature);
    }
}

const smartHouse = new SmartHouse();

smartHouse.connectDevices();
smartHouse.getTemperatureBySensor();
smartHouse.disconnectDevices();
