import {Point, Segment, Matrix, applyToPoint, SegmentList} from "./Types";
import {crossNorm, fromAToB, dot, getLengthSqr} from "./Vector";
import * as _ from "lodash";

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

const between = (a:number, b:number, x:number):boolean=>{
    return x >= a && x <= b;
};

const between01 = (x:number):boolean => between(0, 1, x);

export const getTForPointOnSegment = (seg: Segment, p:Point): number =>{
    const a:Point = fromAToB(seg[0], seg[1]);
    const b:Point = fromAToB(seg[0], p);
    return dot(a, b)/getLengthSqr(a);
};

export const getPointForTOnSegment = (seg: Segment, t:number): Point =>{
    const dx:number = seg[1][0] - seg[0][0];
    const dy:number = seg[1][1] - seg[0][1];
    return [seg[0][0] + t * dx, seg[0][1] + t * dy];
};

export const pointIsOnSegmentExtended = (seg: Segment, p:Point): boolean =>{
    return _eq(crossNorm(
        fromAToB(seg[0], seg[1]),
        fromAToB(seg[0], p)
    ), 0);
};

export const pointIsOnSegment = (seg: Segment, p:Point):boolean => {
    if(pointIsOnSegmentExtended(seg, p)){
        return between01(getTForPointOnSegment(seg, p));
    }
    return false
};

export const segmentsAreColinear = (seg0: Segment, seg1:Segment): boolean =>{
    return pointIsOnSegmentExtended(seg0, seg1[0]) && pointIsOnSegmentExtended(seg0, seg1[1]);
};

export const transformSegment = (t:Matrix, s:Segment):Segment =>{
    const p0:Point = applyToPoint(t, s[0]);
    const p1:Point = applyToPoint(t, s[1]);
    return [p0, p1];
};

export const transformSegmentList = (t:Matrix, segs:SegmentList):SegmentList =>{
    return segs.map(seg => transformSegment(t, seg));
};
