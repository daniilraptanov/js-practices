import { ObserverType } from "../../enums/observer-type-enum";
import { IObserver } from "../observer";

export interface ISettings {
    temperature: number;
    light: number;

    setTemperature(value: number): void;
    setLight(value: number): void;

    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(observerType: ObserverType): void;
};
