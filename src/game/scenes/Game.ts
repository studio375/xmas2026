import { Scene, Cameras, Display, Physics } from 'phaser';
import { EventBus } from '../EventBus';
import { Character } from '@/helpers/gameData';
import { FloorAndPlatforms } from '../entities/FloorAndPlatforms';
import { PlayerController } from '../entities/PlayerController';
import { LivesManager } from '../entities/LivesManager';
import { BombManager } from '../entities/BombManager';
import { StarManager } from '../entities/StarManager';
import { CubeManager } from '../entities/CubeManager';
import { ASSET_KEYS, ASSET_PATHS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import { CollectibleManager } from '../entities/CollectibleManager';
import { UntouchableElements } from '../entities/UntouchableElements';
import { useStore } from '@/store/useStore';

export class Game extends Scene
{
    selectedPlayerObject: Character;
    camera: Cameras.Scene2D.Camera;

    score = 0;
    scoreText: Phaser.GameObjects.Text;
    gameOver = false;
    playerHitted = false;

    floorAndPlatforms: FloorAndPlatforms;
    playerController: PlayerController;
    livesManager: LivesManager;
    bombManager: BombManager;
    starManager: StarManager;
    cubeManager: CubeManager;
    collectibleManager: CollectibleManager;
    untouchableElements:UntouchableElements;
    coords:any;
    sky: Phaser.GameObjects.Graphics;
    isMainGame: boolean = useStore.getState().gameStep == 'start';


    constructor ()
    {
        super('Game'); // nome della scena
    }

    // fase prima del preload, dove al caricamento posso passare dei dati
    init(data: { selectedPlayerObject: Character })
    {
        this.selectedPlayerObject = data.selectedPlayerObject;
        this.gameOver = false;
        this.playerHitted = false;
    }

    preload ()
    {
        this.load.setPath('assets');
        const imageKeys = Object.keys(ASSET_KEYS) as (keyof typeof ASSET_KEYS)[];
        imageKeys.forEach(key => {
            if (key === 'dude') return;
            var path = ASSET_PATHS[key];
            if (!this.textures.exists(ASSET_KEYS[key]) && path && !path.includes('overlay-elements')) 
                this.load.image(ASSET_KEYS[key], path);
        });
        var spriteImg = (this.isMainGame)?'sprite':'babbo';
        var frameWidth = (this.selectedPlayerObject.frameWidth)?this.selectedPlayerObject.frameWidth:98;
        var frameHeight = (this.selectedPlayerObject.frameHeight)?this.selectedPlayerObject.frameHeight:190;
        if(!this.isMainGame){
            frameWidth = 197;
            frameHeight = 190;
        }
        this.load.spritesheet(
            ASSET_KEYS.dude,
            `/characters/${this.selectedPlayerObject.name}/${(this.selectedPlayerObject.name).toLowerCase()}-${spriteImg}.png`,
            {
                frameWidth,
                frameHeight
            }
        );
    }

    create ()
    {
        var start = this.sys.scale.height - this.textures.get(ASSET_KEYS.base).getSourceImage().height;
        this.registry.set('floor-start', start);

        this.camera = this.cameras.main;

        // bg
        // this.add.image(0, 0, ASSET_KEYS.sky).setScale(15, 10);
        


        //elementi di sfondo
        // this.untouchableElements = new UntouchableElements(this);
        // this.untouchableElements.create();

        // pavimento e piattaforme
        this.floorAndPlatforms = new FloorAndPlatforms(this);
        this.floorAndPlatforms.create();
        const worldWidth = this.floorAndPlatforms.getTotalWidth(this.floorAndPlatforms.floor);
        this.physics.world.setBounds(0, -this.sys.scale.height, worldWidth, this.sys.scale.height * 2);
        this.registry.set('world-width', worldWidth);

        //elementi di sfondo
        this.untouchableElements = new UntouchableElements(this);
        this.untouchableElements.create();
        
        // omino
        this.playerController = new PlayerController(this, this.selectedPlayerObject, this.game);
        this.playerController.create();

        // camera
        if(this.isMainGame){
            this.camera.setBounds(0, -this.sys.scale.height, worldWidth, this.sys.scale.height*2, true);
            this.camera.startFollow(this.playerController.sprite, true, 1, 0.05);
        }

        // stelle
        this.starManager = new StarManager(
            this,
            () => {
                this.bombManager.registerCollection();
                if(this.starManager.score == 3){
                    this.livesManager.livesCounter+=1;
                    EventBus.emit('update-lives', this.livesManager.livesCounter)
                    this.starManager.score = 0;
                }
            },
        );
        this.starManager.create();

        //collezionabili
        this.collectibleManager = new CollectibleManager(
            this,
            () => {
                this.game.pause();
                this.playerController.sprite.anims.play('turn');
                EventBus.emit('show-clue', this);
            },
            () => {this.bombManager.registerCollection();}
        );
        this.collectibleManager.create();

        // lives
        this.livesManager = new LivesManager(this);

        // bombe
        if(this.isMainGame){
            const difficulty = useStore.getState().difficulty;
            this.bombManager = new BombManager(this, this.playerController.sprite, GAME_CONFIG.bombEveryX[difficulty]);
            this.bombManager.create();
        }

        // cubo
        if(this.isMainGame){
            this.cubeManager = new CubeManager(this, this.collectibleManager);
            this.cubeManager.create();
        }

        // colliders
        if(this.isMainGame){ //elementi per cui prevedere un collider solo quando siamo nel gioco principale
            this.physics.add.collider(this.bombManager.bombs, this.floorAndPlatforms.platforms); // bomba - piattaforma
            this.physics.add.collider(this.bombManager.bombs, this.floorAndPlatforms.floor); // bomba - pavimento
            this.physics.add.collider(this.bombManager.bombs, this.cubeManager.cubes); // bomba - cubo
            this.physics.add.collider(
                this.cubeManager.cubes,
                this.playerController.sprite,
                (a, b) => this.cubeManager.hit(a, b, this.playerController.sprite),
                undefined,
                this
            ); // cubo - player
            this.physics.add.collider(this.starManager.stars, this.floorAndPlatforms.platforms); // stella - piattaforma
            this.physics.add.collider(this.starManager.stars, this.floorAndPlatforms.floor); // stella - pavimento
            this.physics.add.collider(this.starManager.stars, this.cubeManager.cubes); // stella - cubo
            this.physics.add.collider(this.collectibleManager.collectibles, this.floorAndPlatforms.platforms);
            this.physics.add.collider(this.collectibleManager.collectibles, this.floorAndPlatforms.floor);
            this.physics.add.collider(this.collectibleManager.collectibles, this.cubeManager.cubes);
        }
        this.physics.add.collider(this.playerController.sprite, this.floorAndPlatforms.platforms); // player - piattaforma
        this.physics.add.collider(this.floorAndPlatforms.floor, this.playerController.sprite); // player - pavimenti
        

        // overlaps
        if(this.isMainGame){
            this.physics.add.overlap(
                this.playerController.sprite,
                this.bombManager.bombs,
                () => this.hitBomb(),
                undefined,
                this
            ); // bomba - player
            this.physics.add.overlap(
                this.playerController.sprite,
                this.starManager.stars,
                (_player, star) => {
                    if (!this.gameOver && star instanceof Physics.Arcade.Sprite) this.starManager.collect(star);
                },
                undefined,
                this
            ); // stella - player
            this.physics.add.overlap(
                this.playerController.sprite,
                this.collectibleManager.collectibles,
                (_player, collectible) => {
                    if (!this.gameOver && collectible instanceof Physics.Arcade.Sprite) this.collectibleManager.collect(collectible);
                },
                undefined,
                this
            ); // collezionabile - player
        }
        


        //HELPER
        // const { height } = this.scale;

        // // Griglia da 100px (usa 50 o 10 per più precisione)
        // this.add.grid(worldWidth / 2, height / 2, worldWidth, height, 100, 100, 0x000000, 0, 0xffffff, 0.2)
        // .setDepth(1000);

        // this.coords = this.add.text(10, 10, '', { fontSize: '16px', color: '#0f0', backgroundColor: '#000' })
        // .setScrollFactor(0)
        // .setDepth(1001);
    
        // this.input.on('pointermove', (p) => {
        // this.coords.setText(`x: ${Math.round(p.worldX)}  y: ${Math.round(p.worldY)}`);
        // });
        //END HELPER

        this.dynamicBg();
        EventBus.emit('current-scene-ready', this);
    }

    update()
    {
        if (!this.gameOver) this.playerController.update();;
    }

    hitBomb()
    {
        if (this.playerHitted || this.gameOver) return;

        const player = this.playerController.sprite;
        player.setTint(0xff0000);
        this.playerHitted = true;

        const isGameOver = this.livesManager.loseLife();
        if (isGameOver)
        {
            this.gameOverFunc();
            return;
        }else if(this.livesManager.recoveredLives < GAME_CONFIG.maxRecoverableLives){
            for (let index = 1; index <= 3; index++) {
                var x = this.playerController.sprite.x+(300*index);
                if(x >= this.floorAndPlatforms.getTotalWidth(this.floorAndPlatforms.floor)){
                    x = this.playerController.sprite.x-(300*index);
                }
                this.starManager.spawnStarAt(x, (Math.random() - 0.4)*this.sys.scale.height);
            }
            this.livesManager.recoveredLives++;
            EventBus.emit('recovered-life', this.livesManager.recoveredLives);
        }

        this.time.delayedCall(GAME_CONFIG.hitInvulnerabilityMs, () => {
            player.clearTint();
            this.playerHitted = false;
        });
    }

    gameOverFunc()
    {
        this.physics.pause();
        this.playerController.sprite.setVelocity(0, 0);
        this.playerController.sprite.setTint(0xff0000);
        this.playerController.sprite.anims.play('turn');
        this.gameOver = true;
        EventBus.emit('game-over');
    }

    dynamicBg(){
        // sfondo dietro a tutto
        this.sky = this.add.graphics().setDepth(-1000).setScrollFactor(0);

        const day = { top: Display.Color.ValueToColor(0x4aa8ff), bottom: Display.Color.ValueToColor(0xbfe6ff) };
        const night = { top: Display.Color.ValueToColor(0x050a24), bottom: Display.Color.ValueToColor(0x1b2a5a) };

        const mix = (a: Display.Color, b: Display.Color, t: number) => {
            const c = Display.Color.Interpolate.ColorWithColor(
            a,
            b,
            100,
            t * 100
            );
            return Display.Color.GetColor(c.r, c.g, c.b);
        };

        // 0 = giorno, 1 = notte; va avanti e indietro all'infinito
        const state = {val:0};
        let lastTop = -1;
        let lastBottom = -1;
        const draw = () => {
            const t = state.val;
            const top = mix(day.top, night.top, t);
            const bottom = mix(day.bottom, night.bottom, t);

            if (top === lastTop && bottom === lastBottom) return;
            lastTop = top;
            lastBottom = bottom;
            this.sky.clear();
            this.sky.fillGradientStyle(top, top, bottom, bottom, 1);
            this.sky.fillRect(0, 0, this.scale.width, this.scale.height);
        };
        draw();
        this.tweens.add({
            targets: state,
            val: 1,
            duration: 25000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            onUpdate: draw,
        });
    }
}
