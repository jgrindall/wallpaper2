
import Wallpaper from "@/geom/Wallpaper";
import WallpaperGroup from "@/geom/WallpaperGroup";
import {Polygon, PolygonTransform, Rect} from "@/geom/Types";

const RT3 = Math.sqrt(3);

describe('groups',() => {
    it('should fail with incorrect input', () => {
        const p:Polygon = [ [0, 0] ];
        expect(()=>{
            Wallpaper.generateGroup("a", p);
        }).toThrow('Incorrect input');
        expect(()=>{
            Wallpaper.generateGroup(Wallpaper.P3M1, p);
        }).toThrow('Incorrect polygon');
        expect(()=>{
            const p:Polygon = [
                [0, 0],
                [100, 0],
                [50, 50]
            ];
            Wallpaper.generateGroup(Wallpaper.P3M1, p);
        }).toThrow('Incorrect polygon');
    });

    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).toBeInstanceOf(WallpaperGroup);
    });

    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).toBeInstanceOf(WallpaperGroup);
    });
});

describe('p3m1 should cover',() => {
    it('should return a group', () => {
        const p:Polygon = [
            [0, 0],
            [100, 0],
            [50, 100*RT3/2]
        ];
        const g = Wallpaper.generateGroup(Wallpaper.P3M1, p);
        expect(g).toBeInstanceOf(WallpaperGroup);
        const screen:Rect = [
            [0, 0],
            [0, 300],
            [100*RT3, 300],
            [100*RT3, 0]
        ];
        const a:PolygonTransform[] = g.coverRectangle(screen);
        expect(a.length).toEqual(23);
    });
});
