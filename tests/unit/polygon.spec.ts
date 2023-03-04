
import {orderBy, isEquilateralTriangle, getBoundingRect, orderByX, orderByY, getCentreOfMass, sortVerticesInOrder, wrapArray} from "@/geom/PolygonUtils";
import {compX, compY} from "@/geom/PointComparator";
import {Polygon, Point, NonEmptyArray} from "@/geom//Types";

const RT3 = Math.sqrt(3);
export type OrderByIndexFn = (prev:number[], next:number[]) => boolean;

const ind = (i:number): OrderByIndexFn => ((prev:number[], next:number[]) => prev[i] <= next[i]);

describe('test wrapArray',() => {
    const a:NonEmptyArray<number> = [5, 6, 7, 8, 9];
    const b:number[] = wrapArray(a, 2);
    expect(b[0]).toEqual(7);
    expect(b.length).toEqual(a.length);
    expect(b[4]).toEqual(6);
});

describe('test polygon',() => {

    const sqr:Polygon = [
        [100, 100],
        [200, 300],
        [400, 200],
        [300, 0]
    ];

    it('test order x', () => {
        const arr2X = orderBy(sqr, compX);
        expect(arr2X.length).toEqual(4);
        expect(arr2X[0][0]).toEqual(100);
        expect(arr2X[1][0]).toEqual(200);
        expect(arr2X[2][0]).toEqual(300);
        expect(arr2X[3][0]).toEqual(400);

    });

    it('test order y', () => {
        const arr2Y = orderBy(sqr, compY);

        expect(arr2Y.length).toEqual(4);

        expect(arr2Y[0][1]).toEqual(0);
        expect(arr2Y[1][1]).toEqual(100);
        expect(arr2Y[2][1]).toEqual(200);
        expect(arr2Y[3][1]).toEqual(300);

    });

});

describe('test isEquilateralTriangle',() => {
    it('detects correct', () => {

        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];

        expect(isEquilateralTriangle(p)).toEqual(true);

    });

    it('detects incorrect', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100]
        ];

        expect(isEquilateralTriangle(p)).toEqual(false);

    });

});

describe('test ordering', ()=>{
    const p:Polygon = [
        [0, 50],
        [100, 200],
        [50, 100]
    ];
    const ox = orderByX(p);
    const oy = orderByY(p);
    //TODO expect(ox).toBe.sorted(ind(0));
    //expect(oy).toBe.sorted(ind(1));
});

describe('test ordering equal coords', ()=>{
    const p:Polygon = [
        [0, 0],
        [0, 100],
        [0, 200],
        [0, 300],
        [100, 300],
        [200, 300],
        [300, 300],
        [300, 200],
        [300, 100],
        [300, 0],
        [200, 0],
        [100, 0]
    ];
    const ox = orderByX(p);
    const oy = orderByY(p);
    //TODO expect(ox).to.be.sorted(ind(0));
    //expect(oy).to.be.sorted(ind(1));
});

describe('test getBoundingRect',() => {
    const p:Polygon = [
        [0, 100],
        [100, 300],
        [300, 200],
        [200, 100],
        [300, 0]
    ];

    const b = getBoundingRect(p);
    expect(b[0][0]).toEqual(0);
    expect(b[0][1]).toEqual(0);

    expect(b[1][0]).toEqual(0);
    expect(b[1][1]).toEqual(300);

    expect(b[2][0]).toEqual(300);
    expect(b[2][1]).toEqual(300);

    expect(b[3][0]).toEqual(300);
    expect(b[3][1]).toEqual(0);
});


describe('test getCentreOfMass',() => {
    const p:Polygon = [
        [0, 100],
        [0, 300],
        [300, 300],
        [300, 100]
    ];
    const com = getCentreOfMass(p);
    expect(com[0]).toEqual(150);
    expect(com[1]).toEqual(200);
});

describe('test sortVerticesInOrder',() => {
    const p0:Polygon = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];
    const ordered0 = sortVerticesInOrder(p0);
    expect(ordered0[0][0]).toEqual(0);
    expect(ordered0[0][1]).toEqual(0);

    const p1:Polygon = [
        [0, 100],
        [300, 200],
        [100, 300],
        [300, 0],
        [200, 0],
    ];
    const ordered1 = sortVerticesInOrder(p1);
    expect(ordered1[0][0]).toEqual(0);
    expect(ordered1[0][1]).toEqual(100);
    expect(ordered1[1][0]).toEqual(100);
    expect(ordered1[1][1]).toEqual(300);
    expect(ordered1[2][0]).toEqual(300);
    expect(ordered1[2][1]).toEqual(200);
    expect(ordered1[3][0]).toEqual(300);
    expect(ordered1[3][1]).toEqual(0);
    expect(ordered1[4][0]).toEqual(200);
    expect(ordered1[4][1]).toEqual(0);
});
