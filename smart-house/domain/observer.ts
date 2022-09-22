import { ISettings } from "./models/settings";

export interface IObserver {
    getType(): number;
    update(subject: ISettings): void;
};
