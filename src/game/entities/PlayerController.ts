import Phaser from 'phaser';
import { Character } from '@/helpers/gameData';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';


export class PlayerController
{
    sprite: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(private scene: Phaser.Scene, private character: Character) {}

    create()
    {
        this.sprite = this.scene.physics.add.sprite(0, 350, ASSET_KEYS.dude);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setScale(this.character.name === 'Rams' ? 0.5 : 1.5);
        this.sprite?.body?.setGravityY(GAME_CONFIG.playerGravityY);
        this.sprite.body?.updateFromGameObject();

        this.createAnimations();

        this.cursors = this.scene.input.keyboard!.createCursorKeys();
    }

    private createAnimations()
    {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(ASSET_KEYS.dude, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: ASSET_KEYS.dude, frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(ASSET_KEYS.dude, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update()
    {
        if (this.cursors.left.isDown)
        {
            this.sprite.setVelocityX(-GAME_CONFIG.playerSpeed);
            this.sprite.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.setVelocityX(GAME_CONFIG.playerSpeed);
            this.sprite.anims.play('right', true);
        }
        else
        {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('turn');
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.sprite.body?.touching.down)
        {
            this.sprite.setVelocityY(GAME_CONFIG.jumpVelocity);
        }
    }
}
