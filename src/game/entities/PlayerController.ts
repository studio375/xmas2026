import Phaser, {Input} from 'phaser';
import { Character } from '@/helpers/gameData';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import { useStore } from '@/store/useStore';


export class PlayerController
{
    sprite: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    keyW: Phaser.Input.Keyboard.Key;
    isMainGame = useStore.getState().gameStep == 'start';
    lastSceneAction: 'sneaky' | 'stopped' | 'startRun' = 'sneaky';

    constructor(private scene: Phaser.Scene, private character: Character) {}

    create()
    {
        var startJumpHeight = (this.isMainGame)?100:0;
        var startX = (this.isMainGame)?0:-200;
        this.sprite = this.scene.physics.add.sprite(startX, this.scene.registry.get('floor-start')-startJumpHeight, ASSET_KEYS.dude).setOrigin(0, 1);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setScale(0.5);
        this.sprite.setGravityY(GAME_CONFIG.playerGravityY);
        this.sprite.body?.updateFromGameObject();

        this.createAnimations();

        const keyboard = this.scene.input.keyboard;
        if (!keyboard) throw new Error('La tastiera deve essere abilitata per controllare il personaggio.');
        this.cursors = keyboard.createCursorKeys();
        this.keyA = keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.keyS = keyboard.addKey(Input.Keyboard.KeyCodes.S);
        this.keyD = keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.keyW = keyboard.addKey(Input.Keyboard.KeyCodes.W);


        if(!this.isMainGame){
            setTimeout(() => {
                this.lastSceneAction = 'stopped';
                setTimeout(() => {
                    this.lastSceneAction = 'startRun';
                }, 1000);
            }, 2000);
        }
    }

    private createAnimations()
    {
        if (this.scene.anims.exists('left')) return;
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

        if (this.scene.textures.get(ASSET_KEYS.dude).has('9')) {
            this.scene.anims.create({
                key: 'down',
                frames: [{ key: ASSET_KEYS.dude, frame: 9 }],
                frameRate: 20,
            });
        }
    }

    update()
    {
        var horizontalSpeed = GAME_CONFIG.playerSpeed;
        if(!this.isMainGame) horizontalSpeed += 100;
        if(this.isMainGame){
            if (this.cursors.left.isDown || this.keyA.isDown)
            {
                this.sprite.setVelocityX(-horizontalSpeed);
                this.sprite.anims.play('left', true);
            }
            else if (this.cursors.right.isDown || this.keyD.isDown)
            {
                this.sprite.setVelocityX(horizontalSpeed);
                this.sprite.anims.play('right', true);
            }
            else if ((this.cursors.down.isDown || this.keyS.isDown) && this.sprite.body && !this.sprite.body.blocked.down) {
                this.sprite.setVelocityX(0);
                this.sprite.setVelocityY(500);
                this.sprite.anims.play('down', true);
            }
            else
            {
                this.sprite.setVelocityX(0);
                if (this.sprite.anims.currentAnim?.key !== 'turn') this.sprite.anims.play('turn');
            }

            if ((this.cursors.up.isDown || this.cursors.space.isDown || this.keyW.isDown) && this.sprite.body?.blocked.down)
            {
                this.sprite.setVelocityY(GAME_CONFIG.jumpVelocity);
            }
        }else{
            if(this.lastSceneAction === 'sneaky'){
                this.sprite.setVelocityX(horizontalSpeed/4);
                this.sprite.anims.play('right', true);
            }
            if(this.lastSceneAction === 'stopped'){
                this.sprite.setVelocityX(0);
                this.sprite.anims.play('turn');
            }
            if(this.lastSceneAction === 'startRun'  ){
                this.sprite.setVelocityX(horizontalSpeed);
                this.sprite.anims.play('right', true);
            }
        }
        
    }
}
