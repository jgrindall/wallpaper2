
import {Point, RealSegmentList, Segment, SegmentList} from "@/geom/Types";
import {pointIsOnSegmentExtended, segmentsAreColinear, getTForPointOnSegment} from "@/geom/Segment";
import {groupColinear, unionColinear, unionAxis} from "@/geom/SegmentUnion";
import * as _ from "lodash";



describe('segments',() => {
    it('should detect point on segment', () => {
        const p0:Point = [0, 0];
        const p1:Point = [1, 0];
        const p2:Point = [4, 0];
        expect(pointIsOnSegmentExtended([p0, p1], p2)).toEqual(true);

    });

    it('should detect point not on segment', () => {
        const p0:Point = [0, 0];
        const p1:Point = [1, 0];
        const p2:Point = [4, 1];
        expect(pointIsOnSegmentExtended([p0, p1], p2)).toEqual(false);
    });

    it('should detect colinear segments', () => {
        const p0:Point = [0, 0];
        const p1:Point = [1, 0];
        const p2:Point = [4, 0];
        const p3:Point = [5, 0];
        expect(segmentsAreColinear([p0, p1], [p2, p3])).toEqual(true);
    });

    it('should detect noncolinear segments', () => {
        const p0:Point = [0, 0];
        const p1:Point = [1, 0];
        const p2:Point = [4, 0];
        const p3:Point = [5, 0.5];
        expect(segmentsAreColinear([p0, p1], [p2, p3])).toEqual(false);
    });

    it('should detect t segments', () => {
        const p0:Point = [0, 0];
        const p1:Point = [1, 0];
        expect(getTForPointOnSegment([p0, p1], [0, 0])).toEqual(0);
        expect(getTForPointOnSegment([p0, p1], [1, 0])).toEqual(1);
        expect(getTForPointOnSegment([p0, p1], [4, 0])).toEqual(4);
    });

});


describe('union',() => {
    it('should group', () => {
        const p0:Point = [0, 0];
        const p1:Point = [2, 0];
        const p2:Point = [1, 0];
        const p3:Point = [3, 0];
        const p4:Point = [0, 0];
        const p5:Point = [0, 2];
        const p6:Point = [0, 3];
        const p7:Point = [0, 4];

        const gps = groupColinear([
            [p0, p1], [p2, p3], [p4, p5], [p6, p7]
        ]);
        expect(gps.length).toEqual(2);

    });

    it('should union axis basics', () => {
        const union0 = unionAxis([
            [1, 2], [2, 3], [1, 4], [3, 0]
        ]);
        expect(union0.length).toEqual(1);
        expect(union0[0][0]).toEqual(0);
        expect(union0[0][1]).toEqual(4);

        const union1 = unionAxis([
            [0, 1], [1, 2]
        ]);

        expect(union1.length).toEqual(1);
        expect(union1[0][0]).toEqual(0);
        expect(union1[0][1]).toEqual(2);

        const union2 = unionAxis([
            [0, 10], [10, 0]
        ]);
        expect(union2.length).toEqual(1);
        expect(union2[0][0]).toEqual(0);
        expect(union2[0][1]).toEqual(10);

    });

    it('should union axis - disjoint segments', () => {

        const union0 = unionAxis([
            [0, 1], [2, 3]
        ]);
        expect(union0.length).toEqual(2);
        expect(union0[0][0]).toEqual(0);
        expect(union0[0][1]).toEqual(1);
        expect(union0[1][0]).toEqual(2);
        expect(union0[1][1]).toEqual(3);

    });

    it('should union axis - random segments', () => {

        const random:RealSegmentList = [  [0, 10] ];
        for(let i = 0; i < 50; i++){
            const shuffled = _.shuffle(_.range(0, 10));
            random.push([shuffled[0], shuffled[1]]);
        }
        const union3 = unionAxis(random);
        expect(union3.length).toEqual(1);
        expect(union3[0][0]).toEqual(0);
        expect(union3[0][1]).toEqual(10);

    });

    it('should union axis - random disjoint segments', () => {
        const random2:RealSegmentList = [  [0, 10] , [20, 30]];
        for(let i = 0; i < 50; i++){
            const shuffled = _.shuffle(_.range(0, 10));
            random2.push([shuffled[0], shuffled[1]]);
        }
        for(let i = 0; i < 50; i++){
            const shuffled = _.shuffle(_.range(20, 30));
            random2.push([shuffled[0], shuffled[1]]);
        }
        const union4 = unionAxis(random2);
        expect(union4.length).toEqual(2);
        expect(union4[0][0]).toEqual(0);
        expect(union4[0][1]).toEqual(10);
        expect(union4[1][0]).toEqual(20);
        expect(union4[1][1]).toEqual(30);

    });

    it('should union segments', () => {
        const seg0:Segment = [[0, 0], [1, 1]];
        const seg1:Segment = [[2, 2], [1, 1]];
        const seg2:Segment = [[1, 1], [2, 2]];
        const union:SegmentList = unionColinear([seg0, seg1, seg2]);
        expect(union.length).toEqual(1);
        const seg = union[0];
        expect(seg[0][0]).toEqual(0);
        expect(seg[0][1]).toEqual(0);
        expect(seg[1][0]).toEqual(2);
        expect(seg[1][1]).toEqual(2);
    });

});
