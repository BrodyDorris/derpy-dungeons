import Phaser from "phaser";
import { SCENES, IMAGES } from "../constants";
import { Player } from "../game-objects/player";
import { debugCollisions } from "../utility";
import { Skeleton } from "../game-objects/monsters/skeleton";

export class Level01 extends Phaser.Scene {
    constructor() {
        super({key: SCENES.level01});
    }

    preload() {
        this.load.tilemapTiledJSON("level-01", "/tilemaps/level-01.json");
    }

    create() {
        const map = this.make.tilemap({
            key: "level-01",
            tilewidth: 16,
            tileHeight: 16,
        });

        const floorLayer = map.createLayer(map.addTilesetImage( "floors",IMAGES.floor));

        const wallLayer = map.createLayer(map.addTilesetImage( "low-walls",IMAGES.walls));

        wallLayer.setCollisionByProperty({collides: true});
        debugCollisions(this, wallLayer);

        this.monsters = this.add.group();

        let monsterObjects = map.createFromObjects("spawns", [
            {
            name: skeleton,
            key:IMAGES.sprites,
            classType: Skeleton
            }
        ]);

        for (let mo of monsterObjects) {
            this.monsters.add.apply(mo);
        }

        const decorLayer = map.createLayer(map.addTilesetImage( "high-walls",IMAGES.decor));

        this.player = new Player(this, 50, 450);

        this.physics.add.collider(this.player, wallLayer);

        //this.cameras.main.setOrigin(50,50);
        this.cameras.main.zoom = 10;
        this.cameras.main.startFollow(this.player);
    }  

    update() {
        this.player.update();
    }
}
