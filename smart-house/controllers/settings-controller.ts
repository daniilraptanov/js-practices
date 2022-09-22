import { ISettings } from "../domain/models/settings";
import { IObserver } from "../domain/observer";
import { ObserverType } from "../enums/observer-type-enum";

export class SettingsController implements ISettings {
    private observers: IObserver[] = [];

    temperature: number;
    light: number;

    attach(observer: IObserver): void {
       const isExist = this.observers.includes(observer);
       if (isExist) {
          throw new Error("Settings: Observer has been attached already.");
       }

       this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
           throw new Error("Settings: Nonexistent observer.");
        }

        this.observers.splice(observerIndex, 1);
    }

    notify(observerType: ObserverType): void {
        const currentObserver = this.observers.find(observer => observer.getType() === observerType);
        currentObserver?.update(this);
    }

    setTemperature(value: number): void {
        this.temperature = value;
        this.notify(ObserverType.TEMPERATURE);
    }

    setLight(value: number): void {
        this.light = value;
        this.notify(ObserverType.LIGHT);
    }
}