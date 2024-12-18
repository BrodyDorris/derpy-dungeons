import Phaser from "phaser";
import {ANIMS, IMAGES} from "../constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");

        this.speed = 100;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.keys = this.scene.input.keyboard.createCursorKeys();

        //adjust hit box
        this.setSize(this.width * 0.25, this.height * 0.25);
        this.setOffset(this.width / 2 - 2, 20);

        this.anims.play(ANIMS.player.idle);
    }

    create() {}

    update() {
        if(this.keys.left.isDown) {
            this.setVelocityX(-this.speed);
            this.flipX = true;
        }else if(this.keys.right.isDown) {
            this.setVelocityX(this.speed);
            this.flipX = false;
        }else {
            this.setVelocityX(0);
        }

        if(this.keys.up.isDown) {
            this.setVelocityY(-this.speed);
        }else if(this.keys.down.isDown) {
            this.setVelocityY(this.speed);
        }else {
            this.setVelocityY(0);
        }

        if(this.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
            this.anims.play(ANIMS.player.idle, true);
        }else{
            this.anims.play(ANIMS.player.run, true);
        }
    }
}
