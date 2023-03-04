import {getLengthSqr, dot, getDistanceSqr} from "@/geom/Vector";
import {Point} from "@/geom/Types";

describe('Test vector',() => {
    it('length', () =>{
        const p1:Point = [400, 300];
        const p2:Point = [700, 700];
        expect(getLengthSqr(p1)).toEqual(500*500);
        expect(getDistanceSqr(p1, p2)).toEqual(500*500);
    });
    it('dot', () => {
        const p1:Point = [400, 300];
        const p2:Point = [700, 700];
        expect(dot(p1, p2)).toEqual(490000);
    });

    it('mapSegmentToYAxis', () => {
        const p0:Point = [400, 300];
        const p1:Point = [700, 700];
        expect(dot(p0, p1)).toEqual(490000);
    });

});
