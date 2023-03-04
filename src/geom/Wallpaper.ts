
import Group_p3m1 from "./Group_p3m1";
import WallpaperGroup from "./WallpaperGroup";
import {Polygon} from "./Types";

class Wallpaper {

    public static readonly P3M1 = "p3m1";
    public static readonly PMM = "pmm";

    public static generateGroup(type: string, polygon: Polygon): WallpaperGroup {
        if(type === Wallpaper.P3M1){
            return new Group_p3m1(polygon);
        }
        return new Group_p3m1(polygon);
    }
}

export default Wallpaper;
