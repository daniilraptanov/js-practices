import { ISettings } from "../domain/models/settings";
import { SettingsController } from "./settings-controller";
import { ObserverType } from "../enums/observer-type-enum";
import { MAX_TEMPERATURE, MIN_TEMPERATURE } from "../constants";
import { ITemperature } from "../domain/models/temperature";
import { DeviceService } from "../services/device-service";

export class TemperatureController implements ITemperature {
    private static _type: number = ObserverType.TEMPERATURE;
    private _temperature: number;
    
    update(settings: ISettings): void {
        if (settings.temperature > MAX_TEMPERATURE) {
            throw new Error(`This temperature is higher than the ${MAX_TEMPERATURE}`);
        }

        if (settings.temperature < MIN_TEMPERATURE) {
            throw new Error(`This temperature is lower than the ${MIN_TEMPERATURE}`);
        }

        if (settings instanceof SettingsController) {
            this._temperature = settings.temperature;

            this.changeTemperature();
            this.sendEmail();
            this.saveStatistic();
        }
    }

    getType(): number {
        return TemperatureController._type;
    }

    private changeTemperature(): void {
        const newTemperature = this._temperature;

        DeviceService.changeTemperature(newTemperature);
        console.log("Temperature was changed", newTemperature);
    }

    private sendEmail(): void {
        const newTemperature = this._temperature;
        // send email about changing temperature;
        console.log("Email was sended", newTemperature);
    }

    private saveStatistic(): void {
        const newTemperature = this._temperature;
        // save new temperature value in database;
        console.log("Statistic was updated", newTemperature);
    }
}