
import {getTranslationsToCoverRect, getTranslationsToCoverPolygon} from "@/geom/PolygonCovering";
import {isIdentity, areEqual, getTranslation} from "@/geom/Transforms";
import {Polygon, Rect} from "@/geom/Types";

describe('test getTranslationsToCoverRect',() => {
    const r0:Rect = [
        [1.5, 1.5],
        [1.5, 3.5],
        [3.3, 3.5],
        [3.3, 1.5]
    ];
    const p0:Rect = [
        [1.5, 1.5],
        [1.5, 3.5],
        [3.3, 3.5],
        [3.3, 1.5]
    ];
    const ts0 = getTranslationsToCoverRect(r0, p0);
    expect(ts0.length).toEqual(1);
    expect(isIdentity(ts0[0])).toEqual(true);
    const r1:Rect = [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1]
    ];
    const p1:Rect = [
        [3, 3],
        [3, 6],
        [6, 6],
        [6, 3]
    ];
    const ts1 = getTranslationsToCoverRect(r1, p1);
    expect(ts1.length).toEqual(9);

    expect(areEqual(ts1[0], getTranslation(2, 2))).toEqual(true);
    expect(areEqual(ts1[8], getTranslation(4, 4))).toEqual(true);



    const r2:Rect = [
        [1, 1],
        [1, 3],
        [3, 3],
        [3, 1]
    ];
    const p2:Rect = [
        [4, 4],
        [4, 8],
        [8, 8],
        [8, 4]
    ];
    const ts2 = getTranslationsToCoverRect(r2, p2);
    expect(ts2.length).toEqual(9);

    expect(areEqual(ts2[0], getTranslation(2, 2))).toEqual(true);
    expect(areEqual(ts2[8], getTranslation(6, 6))).toEqual(true);

    const r3:Rect = [
        [1, 1],
        [1, 3],
        [1.8, 3],
        [1.8, 1]
    ];
    const p3:Rect = [
        [4.5, 2.5],
        [4.5, 5.5],
        [9.5, 5.5],
        [9.5, 2.5]
    ];
    const ts3 = getTranslationsToCoverRect(r3, p3);
    expect(ts3.length).toEqual(21);

});

describe('test getTranslationsToCoverPolygon',() => {
    const p0:Polygon = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const r0:Rect = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const ts0 = getTranslationsToCoverPolygon(r0, p0);
    expect(ts0.length).toEqual(1);
    expect(isIdentity(ts0[0])).toEqual(true);

    const p1:Polygon = [
        [1.4, 2.5],
        [2.5, 3.6],
        [3.6, 2.5],
        [2.5, 1.4]
    ];
    const r1:Rect = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const ts1 = getTranslationsToCoverPolygon(r1, p1);
    expect(ts1.length).toEqual(9);
    expect(areEqual(ts1[0], getTranslation(1, 1))).toEqual(true);

    const p2:Polygon = [
        [1.5, 2.5],
        [2.5, 3.5],
        [3.5, 2.5],
        [2.5, 1.5]
    ];
    const r2:Rect = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const ts2 = getTranslationsToCoverPolygon(r2, p2);
    expect(ts2.length).toEqual(5);
    expect(areEqual(ts2[0], getTranslation(1, 2))).toEqual(true);


    const p3:Polygon = [
        [1.6, 2.5],
        [2.5, 3.4],
        [3.4, 2.5],
        [2.5, 1.6]
    ];
    const r3:Rect = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0]
    ];
    const ts3 = getTranslationsToCoverPolygon(r3, p3);
    expect(ts3.length).toEqual(5);

    const p4:Polygon = [
        [0, 3],
        [3, 5],
        [4, 3],
        [2, 1]
    ];
    const r4:Rect = [
        [3.5, 0],
        [3.5, 2],
        [4, 2],
        [4, 0]
    ];
    const ts4 = getTranslationsToCoverPolygon(r4, p4);
    expect(ts4.length).toEqual(16);
});
