import {isIdentity, getRotationAboutOrigin, getRotation, getTranslation, getIdentity, getReflection,
    getReflectionOrigin, areEqual, getScale, determinant, getMatrix, compose, getProduct, conjugate} from "@/geom/Transforms";
import {Point, Matrix, applyToPoint} from "@/geom/Types";

const EPS = 0.000001;

describe('Test basic transform utilities',() => {

    it('translations', () => {
        expect(isIdentity(getTranslation(0, 0))).toEqual(true);
        const pt:Point = [0, 0];
        const trans = getTranslation(100, 100);
        const pt2 = applyToPoint(trans, pt);
        expect(pt2[0]).toEqual(100);
        expect(pt2[1]).toEqual(100);
    });
    it('rotations', () => {
        expect(isIdentity(getRotationAboutOrigin(0))).toEqual(true);
        expect(isIdentity(getRotation([0, 0], 0))).toEqual(true);
        const rot180 = getRotationAboutOrigin(Math.PI);
        const rot90 = getRotationAboutOrigin(Math.PI/2);
        const pt:Point = [100, 0];
        const pt2:Point = applyToPoint(rot180, pt);
        const pt3:Point = applyToPoint(rot90, pt);
        expect(pt2[0]).toBeCloseTo(-100, EPS);
        expect(pt2[1]).toBeCloseTo(0, EPS);
        expect(pt3[0]).toBeCloseTo(0, EPS);
        expect(pt3[1]).toBeCloseTo(100, EPS);
    });
    it('reflections', () => {
        const t1:Matrix = getReflectionOrigin(0);
        const t2:Matrix = getReflection([0, 0], 0);
        const pt:Point = [50, 50];
        const pt2 = applyToPoint(t1, pt);
        expect(pt2[0]).toBeCloseTo(50, EPS);
        expect(pt2[1]).toBeCloseTo(-50, EPS);
        const pt3 = applyToPoint(t2, pt);
        expect(pt3[0]).toBeCloseTo(50, EPS);
        expect(pt3[1]).toBeCloseTo(-50, EPS);
        expect(isIdentity(compose(t1, t1))).toEqual(true);
        expect(isIdentity(compose(t2, t2))).toEqual(true);

        const t3:Matrix = getReflectionOrigin(Math.PI/2);
        const pt4 = applyToPoint(t3, pt);
        expect(pt4[0]).toBeCloseTo(-50, EPS);
        expect(pt4[1]).toBeCloseTo(50, EPS);
    });

    it('scale', () => {
        const t1:Matrix = getScale(1);
        expect(isIdentity(t1)).toEqual(true);
        const t2:Matrix = getScale(2);
        const p:Point = [0, 0];
        const q:Point = [50, 50];
        const p2:Point = applyToPoint(t2, p);
        const q2:Point = applyToPoint(t2, q);
        expect(p2[0]).toBeCloseTo(0, EPS);
        expect(p2[1]).toBeCloseTo(0, EPS);
        expect(q2[0]).toBeCloseTo(100, EPS);
        expect(q2[1]).toBeCloseTo(100, EPS);
    });
    it('identity', () => {
        expect(isIdentity(getIdentity())).toEqual(true);
        expect(isIdentity(getMatrix(1, 0, 0, 1, 0, 0))).toEqual(true);
        expect(determinant(getIdentity())).toEqual(1);
    });

});




describe('Test determinant',() => {

    it('determinant', () => {
        expect(determinant(getIdentity())).toEqual(1);
        expect(determinant(getTranslation(100, 100))).toEqual(1);
        expect(determinant(getRotationAboutOrigin(Math.PI))).toEqual(1);
        expect(determinant(getReflection([0, 0], Math.PI))).toEqual(-1);
    });

    it('composition', () => {
        const t1 = getTranslation(100, 0);
        const t2 = getTranslation(-100, 0);
        const id = getIdentity();
        const t1t2 = compose(t1, t2);
        const idt1t2 = compose(id, t1, t2);
        const t1idt2 = compose(t1, id, t2);
        const t1t2id = compose(t1, t2, id);

        expect(isIdentity(t1t2)).toEqual(true);
        expect(isIdentity(idt1t2)).toEqual(true);
        expect(isIdentity(t1idt2)).toEqual(true);
        expect(isIdentity(t1t2id)).toEqual(true);
    });

    it('composition - rotations', () => {
        const r45 = getRotationAboutOrigin(Math.PI/4);
        const r8 = compose(r45, r45, r45, r45, r45, r45, r45, r45);
        expect(isIdentity(r8)).toEqual(true);
    });

    it('composition - order is correct1', () => {
        const rot = getRotationAboutOrigin(Math.PI/2);
        const ref = getReflectionOrigin(0);

        const rot_ref = compose(rot, ref);
        const ref_rot = compose(ref, rot);

        const p:Point = [100, 100];
        const p2 = applyToPoint(rot_ref, p);
        const p3 = applyToPoint(ref_rot, p);

        expect(p2[0]).toEqual(-100);
        expect(p2[1]).toEqual(-100);
        expect(p3[0]).toEqual(100);
        expect(p3[1]).toEqual(100);

    });

    it('composition - order is correct2', () => {
        const scale = getScale(5);
        const tr = getTranslation(100, 100);

        const scale_tr = compose(scale, tr);
        const tr_scale = compose(tr, scale);

        const p:Point = [-100, -100];
        const p2 = applyToPoint(scale_tr, p);
        const p3 = applyToPoint(tr_scale, p);

        expect(p2[0]).toEqual(-400);
        expect(p2[1]).toEqual(-400);
        expect(p3[0]).toEqual(0);
        expect(p3[1]).toEqual(0);

    });

    it('products', ()=>{
        const scale = getScale(2);
        const id = getIdentity();
        const rot = getRotationAboutOrigin(Math.PI/2);
        const ref = getReflectionOrigin(Math.PI/2);
        const ts:Matrix[] = getProduct([scale, rot], [id, ref]);
        expect(ts.length).toEqual(4);

        expect(areEqual(ts[0], scale)).toEqual(true);
        expect(areEqual(ts[2], rot)).toEqual(true);

        const p:Point = [100, 100];
        const ts1p = applyToPoint(ts[1], p);
        const ts3p = applyToPoint(ts[3], p);

        expect(ts1p[0]).toBeCloseTo(-200, EPS);
        expect(ts1p[1]).toBeCloseTo(200, EPS);
        expect(ts3p[0]).toBeCloseTo(100, EPS);
        expect(ts3p[1]).toBeCloseTo(100, EPS);
    });

});



describe('Test composition',() => {

    it('composition', () => {
        const t1 = getTranslation(100, 0);
        const t2 = getTranslation(-100, 0);
        const id = getIdentity();
        const t1t2 = compose(t1, t2);
        const idt1t2 = compose(id, t1, t2);
        const t1idt2 = compose(t1, id, t2);
        const t1t2id = compose(t1, t2, id);

        expect(isIdentity(t1t2)).toEqual(true);
        expect(isIdentity(idt1t2)).toEqual(true);
        expect(isIdentity(t1idt2)).toEqual(true);
        expect(isIdentity(t1t2id)).toEqual(true);
    });

    it('composition - rotations', () => {
        const r45 = getRotationAboutOrigin(Math.PI/4);
        const r8 = compose(r45, r45, r45, r45, r45, r45, r45, r45);
        expect(isIdentity(r8)).toEqual(true);
    });

    it('composition - order is correct1', () => {
        const rot = getRotationAboutOrigin(Math.PI/2);
        const ref = getReflectionOrigin(0);

        const rot_ref = compose(rot, ref);
        const ref_rot = compose(ref, rot);

        const p:Point = [100, 100];
        const p2 = applyToPoint(rot_ref, p);
        const p3 = applyToPoint(ref_rot, p);

        expect(p2[0]).toEqual(-100);
        expect(p2[1]).toEqual(-100);
        expect(p3[0]).toEqual(100);
        expect(p3[1]).toEqual(100);

    });

    it('composition - order is correct2', () => {
        const scale = getScale(5);
        const tr = getTranslation(100, 100);

        const scale_tr = compose(scale, tr);
        const tr_scale = compose(tr, scale);

        const p:Point = [-100, -100];
        const p2 = applyToPoint(scale_tr, p);
        const p3 = applyToPoint(tr_scale, p);

        expect(p2[0]).toEqual(-400);
        expect(p2[1]).toEqual(-400);
        expect(p3[0]).toEqual(0);
        expect(p3[1]).toEqual(0);

    });

});



describe('products',() => {


    it('products', ()=>{
        const scale = getScale(2);
        const id = getIdentity();
        const rot = getRotationAboutOrigin(Math.PI/2);
        const ref = getReflectionOrigin(Math.PI/2);
        const ts:Matrix[] = getProduct([scale, rot], [id, ref]);
        expect(ts.length).toEqual(4);

        expect(areEqual(ts[0], scale)).toEqual(true);
        expect(areEqual(ts[2], rot)).toEqual(true);

        const p:Point = [100, 100];
        const ts1p = applyToPoint(ts[1], p);
        const ts3p = applyToPoint(ts[3], p);

        expect(ts1p[0]).toBeCloseTo(-200, EPS);
        expect(ts1p[1]).toBeCloseTo(200, EPS);
        expect(ts3p[0]).toBeCloseTo(100, EPS);
        expect(ts3p[1]).toBeCloseTo(100, EPS);
    });

});

describe('conjugates',() => {

    const getScaleAboutPoint = (p:Point, s:number):Matrix=>{
        const translate = getTranslation(-p[0], -p[0]);
        return conjugate(translate, getScale(s));
    };

    it('conjugate', ()=>{
        const scaleAbout100100 = getScaleAboutPoint([100, 100], 2);
        const p0:Point = [100, 100];
        const p1:Point = [200, 200];
        const q0 = applyToPoint(scaleAbout100100, p0);
        const q1 = applyToPoint(scaleAbout100100, p1);
        expect(q0[0]).toEqual(p0[0]);
        expect(q0[1]).toEqual(p0[1]);
        expect(q1[0]).toEqual(300);
        expect(q1[1]).toEqual(300);
    });


});
