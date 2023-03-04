import {Point} from "./Types";

export const getLengthSqr = (p: Point): number =>{
    return p[0]*p[0] + p[1]*p[1];
};

export const getDistanceSqr = (p: Point, q: Point): number=>{
    const dx = p[0] - q[0];
    const dy = p[1] - q[1];
    return dx*dx + dy*dy;
};

export const dot = (p: Point, q: Point): number=>{
    return p[0]*q[0] + p[1]*q[1];
};

export const fromAToB = (a:Point, b:Point):Point=>{
    return pMinusQ(b, a);
};

export const pMinusQ = (p:Point, q:Point):Point=>{
    return [p[0] - q[0], p[1] - q[1]];
};

export const crossNorm = (a:Point, b:Point):number => {
    return a[0] * b[1] - a[1] * b[0];
}
