import { ISettings } from "../domain/models/settings";
import { SettingsController } from "./settings-controller";
import { ObserverType } from "../enums/observer-type-enum";
import { MAX_LIGHT, MIN_LIGHT } from "../constants";
import { ILight } from "../domain/models/light";
import { BaseController } from "./base-controller";

export class LightController extends BaseController implements ILight {
    private static _type: number = ObserverType.LIGHT;
    private _light: number;
    
    update(settings: ISettings): void {
        this._light = settings.light;
        
        if (settings.light > MAX_LIGHT) {
            this._light = MAX_LIGHT;
        }

        if (settings.light < MIN_LIGHT) {
            this._light = MIN_LIGHT;
        }

        if (settings instanceof SettingsController) {
            this.changeValue(this._light, this.getType());
            this.sendEmail(this._light, this.getType());
            this.saveStatistic(this._light, this.getType());
        }
    }

    getType(): number {
        return LightController._type;
    }
}
