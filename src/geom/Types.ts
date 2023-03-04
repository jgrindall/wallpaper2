import {Matrix, applyToPoints as _applyToPoints, applyToPoint, fromTriangles} from "transformation-matrix";

export type NonEmptyArray<T> = [T, ...T[]]

export type Point = [number, number]

export type Segment = [Point, Point];
export type SegmentList = Segment[];

export type Polygon = NonEmptyArray<Point>

export type Rect = [Point, Point, Point, Point];

export type UnsureWhatThisIs = {
    t:number,
    index:number,
    start:boolean
}

export type RealIntersectionData = {
    p: Point;
    t0: number;
    t1: number;
};

export type RealSegment = [number, number];

export type RealSegmentList = RealSegment[]

export type IntersectionData = RealIntersectionData | null;

export type TValue = {
    t:number;
};

export type PolygonTransform = {
    poly0: Polygon;
    poly1: Polygon;
    t: Matrix;
    tinv:Matrix;
};

export const applyToPolygon = (matrix: Matrix, p:Polygon): Polygon=>{
    return p.map((pt:Point) => {
        return applyToPoint(matrix, pt)
    }) as Polygon
}

export const first = <T>(a: NonEmptyArray<T>):T => {
    return a[0]
}

export const last = <T>(a: NonEmptyArray<T>):T => {
    return a[a.length - 1]
}

export {
    Matrix,
    applyToPoint,
    fromTriangles
}
