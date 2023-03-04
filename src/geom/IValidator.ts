import {Polygon} from "./Types";

interface IValidator {
    validate(polygon: Polygon):void;
}

export default IValidator;
