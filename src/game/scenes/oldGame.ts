import { Cameras, Math, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Character } from '@/helpers/gameData';

export class Game extends Scene
{
    platforms:any;
    selectedPlayerObject:Character;
    player:any;
    cursors:any;
    stars:any;
    score:number = 0;
    scoreText:any;
    bombs:any;
    gameOver:boolean = false;
    camera:Cameras.Scene2D.Camera;
    floor:any;
    cubes:any;
    livesCounter:number=3;
    livesImages:[]=[];
    playerHitted:boolean = false;
    constructor ()
    {
        super('Game'); //nome della scena
    }

    //fase prima del preload, dove al caricamento posso passare dei dati
    init(data: { selectedPlayerObject: any })
    {
        this.selectedPlayerObject = data.selectedPlayerObject;
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('sky', 'sky.png');
        //this.load.image('ground', '/platforms/platform_01.png');
        this.load.image('ground', '/platforms/platform_01.png');
        this.load.image('base', '/platforms/terreno_03.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'palla.png');
        this.load.image('game-over', 'game-over.png');
        this.load.image('cube', 'cube.png');
        this.load.image('empty-cube', '/cubes/cubo_nudo.png');
        this.load.spritesheet('dude', 
            this.selectedPlayerObject.spriteImg.replace('/assets', ''),
            { frameWidth: this.selectedPlayerObject.name == 'Rams'?256:32, frameHeight: this.selectedPlayerObject.name == 'Rams'?256:48 }
        );
        this.load.image('heart', 'heart.png');
        this.load.image('empty-heart', 'empty-heart.png');
    }

    create ()
    {   
        this.camera=this.cameras.main;

        //bg
        var bg = this.add.image(0, 0, 'sky').setScale(9, 10);

        
        //pavimento
        const floorWidth = this.textures.get('base').get().width; 
        this.floor = this.physics.add.staticGroup({
            key: 'base',
            repeat: 5,
            setXY: { x: 0, y: (this.sys.scale.height - this.textures.get('base').getSourceImage().height), stepX:floorWidth},
            setScale: {x:1,y:1},
            setOrigin: {x:0, y:0}
        });
        
        // var plat1 = this.platforms.create(0, this.sys.scale.height+10, 'base').setOrigin(0,0.5).refreshBody();
        // var plat2 = this.platforms.create(plat1.displayWidth, this.sys.scale.height+10, 'base').setOrigin(0,0.5).refreshBody();
        
        
        
        //piattaforme
        this.platforms = this.physics.add.staticGroup();
        var startX = window.innerWidth / 2;
        //this.platforms.create(0, 0, 'base').setScale(0.1);
        
        this.platforms.create(startX+600, 400, 'ground').setScale(1).refreshBody();
        this.platforms.create(startX+50, 350, 'ground').setScale(1).refreshBody();
        // this.platforms.create(plat1.x+plat1.displayWidth, 350, 'ground').setOrigin(0,0.5).refreshBody();
        // this.platforms.create(plat2.x+300, this.camera.worldView.height / 2 + 150, 'ground').setOrigin(0,0.5).refreshBody();
        

        this.physics.world.setBounds(0,0, this.getTotalGroupWidth(this.floor.children), this.sys.scale.height*2);
        
        
        //omino
        this.definePlayer();
        
        
        //camera
        this.camera.setBounds(0,0, this.getTotalGroupWidth(this.floor.children), this.sys.scale.height, true);
        this.camera.startFollow(this.player, true, 1, 0);



        //stelle
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 300, y: 0, stepX: 70 },
            setScale: {x: 0.7, y:0.7}
        });

        this.stars.children.forEach((child:any) => {
            child.setBounceY(Math.FloatBetween(0.1, 0.3));
        });
        

        //score
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' }).setOrigin(0,0).setScrollFactor(0);

        //lives 
        for (let index = 1; index < 4; index++) {
            var isEmpty = (this.livesCounter < index);
            var texture = isEmpty?'empty-heart':'heart';
            var scale = isEmpty?0.05:0.1;
            var heartWidth = this.textures.get(texture).get().width * scale;
            var y = 16;
            var x = (this.sys.scale.width - 16) - ((3-index) * (heartWidth + 5));
            var heart = this.add.image(x,y,texture).setOrigin(1,0).setScrollFactor(0).setScale(scale);
            this.livesImages.push(heart);
        }

        //bombe
        this.bombs = this.physics.add.group();
        this.addBomb();

        //cubo
        this.cubes = this.physics.add.staticGroup();
        this.cubes.create(150, 390, 'cube').setScale(0.08).refreshBody();
        
        //events
        EventBus.emit('current-scene-ready', this);
        EventBus.emit('hit-a-bomb', this.player)


        //colliders
        this.physics.add.collider(this.bombs, this.platforms); //bomba - piattaforma
        this.physics.add.collider(this.bombs, this.floor); //bomba - pavimento
        this.physics.add.collider(this.bombs, this.cubes); // bomba - cubo
        this.physics.add.collider(this.cubes, this.player, this.hitCube, undefined, this); // cubo - player
        this.physics.add.collider(this.stars, this.platforms); // stella - piattaforma
        this.physics.add.collider(this.stars, this.floor); // stella - pavimento
        this.physics.add.collider(this.stars, this.cubes); // stella - cubo
        this.physics.add.collider(this.player, this.platforms); // player - piattaforma
        this.physics.add.collider(this.floor, this.player); // player - pavimenti
        

        //overlaps
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, undefined, this); //bomba - player
        this.physics.add.overlap(this.stars, this.player, this.collectStars, undefined, this); // stella - player

    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-300);
        
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(300);
        
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
        
            this.player.anims.play('turn');
        }
        
        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.touching.down)
        {
            this.player.setVelocityY(-600);
        }
    }

    collectStars(player:any, star:any){
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
        
        if(this.score%12==0){
            this.game.pause();
            this.player.anims.play('turn');
            EventBus.emit('show-clue', this);
        }
        
        if (this.stars.countActive(true) === 0)
        {
            var i = 0;
            this.stars.children.forEach((child:any) => {
                child.enableBody(true, (300+(i++*70) + player.x), 0, true, true);
            });

            this.addBomb();
        }
    }

    //inserisco due parametri generici perchè non sempre phaser ordina i parametri in base all'ordine della collision
    hitCube(a:any, b:any){
        const player = a === this.player ? a : b;
        const cube = a === this.player ? b : a;
        
        const playerBody = player.body as Phaser.Physics.Arcade.Body;
        const cubeBody = cube.body as Phaser.Physics.Arcade.StaticBody;
        const overlapX = globalThis.Math.min(playerBody.right, cubeBody.right) - globalThis.Math.max(playerBody.left, cubeBody.left);
        const overlapY = globalThis.Math.min(playerBody.bottom, cubeBody.bottom) - globalThis.Math.max(playerBody.top, cubeBody.top);
        
        //controllo che la collisione avvenga verticalmente e che il player sia sotto il cubo
        if (overlapY < overlapX && playerBody.center.y > cubeBody.center.y && cube.texture.key !== 'empty-cube') {
            var y = cubeBody.top;
            var x = cubeBody.left;
            cube.setTexture('empty-cube');
            this.stars.create((x+cubeBody.halfWidth),(y-cubeBody.height-50),'star').setScale(0.7);
        } 
    }

    hitBomb(player:any, bomb:any){
        if(!this.playerHitted){
            player.setTint(0xff0000);
            this.playerHitted = true;
            this.livesCounter-=1;
            this.updateLives();
            if(this.livesCounter==0){
                this.gameOverFunc();
                return;
            }
            setTimeout(() => {
                player.clearTint();
                this.playerHitted = false;
            }, 2000);
        }
    }

    gameOverFunc(){
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
        this.add.image(window.innerWidth / 2,window.innerHeight/2,'game-over').setScale(0.3).setScrollFactor(0);
    }

    definePlayer(){
        this.player = this.physics.add.sprite(0, 350, 'dude');
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(this.selectedPlayerObject.name == 'Rams'?0.4:1.5);
        this.player.body.setGravityY(600);
        this.player.body.updateFromGameObject();
        this.anims.create({
            key: 'left', //nome animazione
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //i frame dello sprite che mi servono in questa animazione
            frameRate: 10, //quanti frame per secondo
            repeat: -1 //quante volte ripetere (-1 = in loop)
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.cursors = this.input?.keyboard?.createCursorKeys();
    }

    getTotalGroupWidth(group:any){
        var total = 0;
        group.forEach((elem:any) => {
            total+=elem.displayWidth;
        })
        return total;
    }

    addBomb(){
        var bomb = this.bombs.create((this.player.x+this.cameras.main.worldView.width/2), 16, 'bomb').setScale(0.1);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(-200, 90);
    }

    updateLives() {
        this.livesImages.forEach((heart:any, index) => {
            const lifeNumber = index + 1;
            if(lifeNumber <= this.livesCounter){
                heart.setTexture('heart').setScale(0.1);
            }else{
                heart.setTexture('empty-heart').setScale(0.05);
            }
        });
    }
}