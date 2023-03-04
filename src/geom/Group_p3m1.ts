import {getIdentity, getReflection, compose} from "./Transforms";
import {isEquilateralTriangle, orderByX, orderByY} from "./PolygonUtils";
import IValidator from "./IValidator";
import WallpaperGroup from "./WallpaperGroup";
import {Polygon, Point, Rect,  Matrix, fromTriangles} from "./Types";

const RT3 = Math.sqrt(3);

class Group_p3m1Validator implements IValidator{
    public validate(polygon: Polygon):void {
        if (!isEquilateralTriangle(polygon)) {
            throw new Error("Incorrect polygon");
        }
    }
}

export default class Group_p3m1 extends WallpaperGroup {
    constructor(polygon: Polygon){
        super(polygon);
    }
    protected getValidator():IValidator{
        return new Group_p3m1Validator();
    }
    private getBasePolygon():Polygon{
        const baseLength:number = 100;
        return [
            [0, 0],
            [0, baseLength],
            [baseLength*RT3/2, baseLength/2]
        ];
    }
    protected getBaseTransforms(): Array<Matrix>{
        const baseLength:number = 100;
        const p:Point = [baseLength*RT3/2, baseLength/2];
        const p2:Point = [baseLength*RT3/2, baseLength/2 + baseLength];
        const p3:Point = [baseLength*RT3/2, baseLength/2 + 2*baseLength];
        const id:Matrix = getIdentity();
        const t0:Matrix = getReflection(p, Math.PI/6);
        const t1:Matrix = getReflection(p, Math.PI/2);
        const t2:Matrix = getReflection(p, -Math.PI/6);
        const t3:Matrix = getReflection(p2, Math.PI/6);
        const t4:Matrix = getReflection(p2, -Math.PI/6);
        const t5:Matrix = getReflection(p3, Math.PI/6);
        const t6:Matrix = getReflection(p3, -Math.PI/6);
        return [
            id,
            t0,
            compose(t0, t1),
            t1,
            compose(t1, t0),
            t2,
            compose(t2, t3),
            compose(t2, t3, t1),
            compose(t2, t3, t4),
            t4,
            compose(t2, t4),
            compose(t2, t3, t4, t5),
            compose(t2, t3, t4, t5, t6),
            compose(t2, t3, t4, t6),

        ];

    }
    protected getBaseRect():Rect{
        const baseLength = 100;
        return [
            [0,                  0],
            [baseLength*RT3,     0],
            [baseLength*RT3,     3*baseLength],
            [0,                  3*baseLength]
        ];
    }
    protected getTransformToBase():Matrix{
        const orderedByX:Polygon = orderByX(this._polygon);
        const orderedByY:Polygon = orderByY([
            orderedByX[0],
            orderedByX[1]
        ]);
        return fromTriangles(
            [
                orderedByY[0],
                orderedByY[1],
                orderedByX[2]
            ],
            this.getBasePolygon()
        );
    }
};
