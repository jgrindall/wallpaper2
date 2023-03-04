import * as _ from "lodash";
import {compose as tmcompose, fromObject, inverse} from "transformation-matrix";
import {Polygon, Point, Matrix, applyToPoint} from "./Types";

const _eq = (a:number, b:number):boolean=>{
    const EPSILON:number = 0.00000001;
    return Math.abs(a - b) < EPSILON;
};

export const compose = (...matrices: Matrix[]):Matrix=>{
    return tmcompose(matrices.reverse());
};

export const composeAllWith = (matrices: Matrix[], t:Matrix):Matrix[]=>{
    return matrices.map(m=>compose(m, t));
};

export const conjugate = (a:Matrix, b:Matrix):Matrix=>{
    return compose(
        a,
        b,
        inverse(a)
    );
};

export const conjugates = (a:Matrix, bs:Matrix[]):Matrix[]=>{
    return bs.map(b => conjugate(a, b));
};

export const getTranslation = (x:number, y:number): Matrix => {
    return fromObject({
        a:1,
        b:0,
        c:0,
        d:1,
        e:x,
        f:y
    });
};

export const getTranslations = (dx:number, dy:number, min:number, max:number):Matrix[] => {
    return _.range(min, max).map(i => {
        return getTranslation(i*dx, i*dy);
    });
};

export const getScaleXY = (s:number, t:number):Matrix =>{
    return fromObject({
        a:s,
        b:0,
        c:0,
        d:t,
        e:0,
        f:0
    });
};

export const getScaleX = (s:number):Matrix =>{
    return getScaleXY(s, 1);
};

export const getScaleY = (s:number):Matrix =>{
    return getScaleXY(1, s);
};

export const getScale = (s:number):Matrix =>{
    return getScaleXY(s, s);
};

export const getRotationAboutOrigin = (angleRad:number):Matrix =>{
    const c = Math.cos(angleRad);
    const s = Math.sin(angleRad);
    return fromObject({
        a:c,
        b:s,
        c:-s,
        d:c,
        e:0,
        f:0
    });
};

export const getRotation = (pt:Point, angleRad:number):Matrix => {
    return conjugate(
        getTranslation(-pt[0], -pt[1]),
        getRotationAboutOrigin(angleRad)
    );
};

export const getReflectionOrigin = (angleRad:number)=>{
    const cosTheta = Math.cos(angleRad), sinTheta = Math.sin(angleRad);
    const cos2Theta = cosTheta*cosTheta - sinTheta*sinTheta;
    const sin2Theta = 2*sinTheta*cosTheta;
    return fromObject({
        a:cos2Theta,
        b:sin2Theta,
        c:sin2Theta,
        d:-cos2Theta,
        e:0,
        f:0
    });
};

export const getReflection = (pt:Point, angleRad:number)=>{
    return conjugate(
        getTranslation(-pt[0], -pt[1]),
        getReflectionOrigin(angleRad)
    );
};

export const getIdentity = ():Matrix=>{
    return fromObject({
        a:1,
        b:0,
        c:0,
        d:1,
        e:0,
        f:0
    });
};

export const areEqual = (t1:Matrix, t2:Matrix):boolean => {
    return _eq(t1.a, t2.a) && _eq(t1.b, t2.b) && _eq(t1.c, t2.c) && _eq(t1.d, t2.d) && _eq(t1.e, t2.e) && _eq(t1.f, t2.f);
};

export const isIdentity = (m:Matrix)=>{
    return areEqual(m, getIdentity());
};

export const transformPoly = (poly:Polygon, t:Matrix) : Polygon=>{
    return poly.map(p=>{
        return applyToPoint(t, p);
    }) as Polygon;
};

export const getProduct = (a1:Matrix[], a2:Matrix[]):Matrix[] => {
    const p:Matrix[] = [];
    a1.forEach(t1=>{
        a2.forEach(t2=>{
            p.push(compose(t1, t2));
        });
    });
    return p;
};

export const getMatrix = (a:number, b:number, c:number, d:number, e:number, f:number):Matrix=>{
    return fromObject({
        a,b,c,d,e,f
    });
};

export const determinant = (m:Matrix):number=>{
    return (m.a*m.d - m.b*m.c);
};
