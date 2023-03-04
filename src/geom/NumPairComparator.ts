import {TValue} from "./Types";

type Comparator = (a:TValue, b:TValue) => number;

export const compT:Comparator = (a:TValue, b:TValue):number => {
    return a.t > b.t ? 1 : (a.t < b.t ? -1 : 0);
};
