import {Polygon, Rect, applyToPolygon, Matrix, Point, first, last} from "./Types";
import * as _ from "lodash";
import {orderByX, orderByY} from "./PolygonUtils";
import {getTranslation} from "./Transforms";
import {convexPolyPolyNonZeroOverlap} from "./PolygonIntersection";

const isInt = (value:number) => {
  let x = parseFloat(value + '');
  return (x | 0) === x;
};

export const getBoundingRect = (p:Polygon):Rect => {
    const orderedByX = orderByX(p);
    const orderedByY = orderByY(p);
    const left:number = first(orderedByX)[0];
    const right:number = last(orderedByX)[0];
    const bottom:number = first(orderedByY)[1];
    const top:number = last(orderedByY)[1];
    return [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ];
};

export const getTranslationsToCoverRect = (r:Rect, p:Rect):Matrix[] => {
    const w = r[2][0] - r[1][0];
    const h = r[1][1] - r[0][1];
    const t = getTranslation(-r[0][0], -r[0][1]);
    const transformedRect:Rect = applyToPolygon(t, p) as Rect;
    const transLeft = transformedRect[0][0];
    const transRight = transformedRect[2][0];
    const transBottom = transformedRect[0][1];
    const transTop = transformedRect[1][1];
    // assume that 'r' has its bottom left corner at the origin
    const minX = Math.floor(transLeft/w);
    const maxX = isInt(transRight/w) ? (transRight/w) - 1 : Math.floor(transRight/w);
    const minY = Math.floor(transBottom/h);
    const maxY = isInt(transTop/h) ? (transTop/h) - 1 : Math.floor(transTop/h);
    const ts = [];
    for(let x = minX; x <= maxX; x++){
        for(let y = minY; y <= maxY; y++){
            ts.push(getTranslation(x*w, y*h));
        }
    }
    return ts;
};

export const getTranslationsToCoverPolygon = (r:Rect, p:Polygon):Matrix[] => {
    const ts =  getTranslationsToCoverRect(getBoundingRect(r), getBoundingRect(p));
    return ts.filter(t => {
        const translatedR:Polygon = applyToPolygon(t, r);
        return convexPolyPolyNonZeroOverlap(p, translatedR);
    });
};
