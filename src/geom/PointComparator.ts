import {Point} from "./Types";

export type PointComparator = (a:Point, b:Point) => number;

export const compX:PointComparator = (a:Point, b:Point):number => {
    return a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0);
};

export const compY:PointComparator = (a:Point, b:Point):number => {
    return a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0);
};

export const getCompAngle = (centre:Point):PointComparator=>{
    const angle = (p:Point):number =>{
        return Math.atan2(p[1] - centre[1], p[0] - centre[0]);
    };
    return (a:Point, b:Point):number => {
        const angleA:number = angle(a), angleB:number = angle(b);
        return angleA < angleB ? 1 : (angleA > angleB ? -1 : 0);
    };
};
