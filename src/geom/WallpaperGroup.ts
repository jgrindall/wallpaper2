import * as _ from "lodash";
import IValidator from "./IValidator";
import {Polygon, PolygonTransform, Matrix, Rect, applyToPolygon} from "./Types";
import {inverse} from "transformation-matrix";
import {getProduct, conjugates} from "./Transforms";
import {getTranslationsToCoverPolygon} from "./PolygonCovering";
import {convexPolyPolyNonZeroOverlap, anyPolygonContainsPoint} from "./PolygonIntersection";
import {getCentreOfMass} from "./PolygonUtils";

class WallpaperGroup {
    protected _polygon: Polygon;
    protected _validator:IValidator;

    constructor(polygon:Polygon){
        this._polygon = polygon;
        this._validator = this.getValidator();
        this._validator.validate(polygon);
    }
    protected getBaseTransforms(): Matrix[]{
        throw new Error("Method not implemented.");
    }
    protected getValidator():IValidator{
        throw new Error("Method not implemented.");
    }
    protected getTransformToBase():Matrix{
        throw new Error("Method not implemented.");
    }
    protected getBaseRect():Rect{
        throw new Error("Method not implemented.");
    }
    public coverRectangle(rect:Rect):PolygonTransform[]{
        const toBase:Matrix = this.getTransformToBase();
        const transformedRect:Polygon = applyToPolygon(toBase, rect);
        const baseRect:Rect = this.getBaseRect();
        const cover:Matrix[] = getTranslationsToCoverPolygon(baseRect, transformedRect);
        const ts = getProduct(
            this.getBaseTransforms(),
            cover
        );
        const conjugated = conjugates(toBase, ts);
        const data:PolygonTransform[] = [];
        const polys:Polygon[] = [];
        conjugated.forEach(t=>{
            const transformedPoly = applyToPolygon(t, this._polygon);
            if(convexPolyPolyNonZeroOverlap(rect, transformedPoly)){
                if(!anyPolygonContainsPoint(polys, getCentreOfMass(transformedPoly))){
                    data.push({
                        t: t,
                        poly0:this._polygon,
                        poly1:transformedPoly,
                        tinv:inverse(t)
                    });
                    polys.push(transformedPoly);
                }
            }
        });
        return data;
    }
}

export default WallpaperGroup;
