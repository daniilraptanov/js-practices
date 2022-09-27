import { IObserver } from "../domain/observer";
import { ObserverType } from "../enums/observer-type-enum";
import { DeviceService } from "../services/device-service";

export class BaseController {
    protected changeValue(value: any, type: ObserverType): void {
        switch (type) {
            case ObserverType.TEMPERATURE:
                DeviceService.changeTemperature(value);
                console.log("Temperature was changed", value);
                break;
            case ObserverType.LIGHT:
                DeviceService.changeLight(value);
                console.log("Light was changed", value);
                break;
            default:
                break;
        }
    }

    protected sendEmail(value: any, type: ObserverType): void {
        // send email about changing temperature;
        console.log("Email was sended", value, "type - ", type);
    }

    protected saveStatistic(value: any, type: ObserverType): void {
        // save new temperature value in database;
        console.log("Statistic was updated", value, "type - ", type);
    }
}