import { ISettings } from "../domain/models/settings";
import { SettingsController } from "./settings-controller";
import { ObserverType } from "../enums/observer-type-enum";
import { MAX_TEMPERATURE, MIN_TEMPERATURE } from "../constants";
import { ITemperature } from "../domain/models/temperature";
import { BaseController } from "./base-controller";

export class TemperatureController extends BaseController implements ITemperature {
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

            this.changeValue(this._temperature, this.getType());
            this.sendEmail(this._temperature, this.getType());
            this.saveStatistic(this._temperature, this.getType());
        }
    }

    getType(): number {
        return TemperatureController._type;
    }
}