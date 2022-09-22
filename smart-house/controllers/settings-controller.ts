import { ISettings } from "../domain/models/settings";
import { IObserver } from "../domain/observer";
import { ObserverType } from "../enums/observer-type-enum";

export class SettingsController implements ISettings {
    private _observers: IObserver[] = [];

    private _temperature: number;
    private _light: number;

    get temperature(): number {
        return this._temperature;
    }

    get light(): number {
        return this._light;
    }

    attach(observer: IObserver): void {
       const isExist = this._observers.includes(observer);
       if (isExist) {
          throw new Error("Settings: Observer has been attached already.");
       }

       this._observers.push(observer);
    }

    detach(observer: IObserver): void {
        const observerIndex = this._observers.indexOf(observer);
        if (observerIndex === -1) {
           throw new Error("Settings: Nonexistent observer.");
        }

        this._observers.splice(observerIndex, 1);
    }

    notify(observerType: ObserverType): void {
        const currentObserver = this._observers.find(observer => observer.getType() === observerType);
        currentObserver?.update(this);
    }

    setTemperature(value: number): void {
        this._temperature = value;
        this.notify(ObserverType.TEMPERATURE);
    }

    setLight(value: number): void {
        this._light = value;
        this.notify(ObserverType.LIGHT);
    }
}