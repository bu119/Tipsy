import Phaser from 'phaser';

import bar_wall from './assets/map/bar_walls.png';
import bar_floor from './assets/map/bar_floors.png';
import bar_wine from './assets/map/bar_wineInterior.png';
import bar_furniture from './assets/map/bar_furniture.png';
import bar_furniture_deco from './assets/map/bar_furniture_deco.png';
import bar_deco from './assets/map/bar_floor_wall_deco.png';
import bar_food from './assets/map/bar_food.png';

// import face from './assets/map/face.png'
import jsonash from './assets/character/ash.json'
import imageash from './assets/character/ash.png'
import jsonlucy from './assets/character/lucy.json'
import imagelucy from './assets/character/lucy.png'

import map1 from './assets/map/map1.json';

// import map2 from './assets/map/map2.json';

class LoadingScene extends Phaser.Scene {
    constructor () {
        super();
    }

    preload ()
    {
        // 캐릭터 (이름: ash)
        // this.load.image('character', face);
        this.load.atlas('ash', imageash, jsonash)
        this.load.atlas('lucy', imagelucy, jsonlucy)

        this.load.image('tilesFloor', bar_floor);
        this.load.image('tilesWall', bar_wall);
        this.load.image('tilesWine', bar_wine);
        this.load.image('tilesFurni', bar_furniture);
        this.load.image('tilesFurniDeco', bar_furniture_deco);
        this.load.image('tilesDeco', bar_deco);
        this.load.image('tilesFood', bar_food);
        this.load.tilemapTiledJSON('map', map1)
        // this.load.tilemapTiledJSON('map', map2)
        // this.load.image('logo', logoImg);
    }
    
    // 생성하기
    create ()
    {
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16});
        const floorTileset = map.addTilesetImage("tilefloor",'tilesFloor');
        const wallTileset1 = map.addTilesetImage("tilewall",'tilesWall');
        const wallTileset2 = map.addTilesetImage("tilewine",'tilesWine');
        const furnitureTileset1 = map.addTilesetImage("tilefurniture",'tilesFurni');
        const furnitureTileset2 = map.addTilesetImage("tilefurnituredeco",'tilesFurniDeco');
        const decoTileset = map.addTilesetImage("tiledeco",'tilesDeco');
        const foodTileset = map.addTilesetImage("tilefood",'tilesFood');
        // const decoTileset = map.addTilesetImage("tilefurnituredeco",'tilesFurniDeco');
        
        // 2배 확대 : setScale(2) -> setZoom 으로 대체
        // const layer1 = map.createLayer('floorLayer', floorTileset, 0, 0).setScale(2);
        const layer1 = map.createLayer('floorLayer', floorTileset, 0, 0)
        const layer2 = map.createLayer('wallLayer', [wallTileset1, wallTileset2], 0, 0)
        const layer3 = map.createLayer('decoLayer', [furnitureTileset1,furnitureTileset2,decoTileset], 0, 0)
        const layer4 = map.createLayer('tableLayer', [furnitureTileset1,furnitureTileset2], 0, 0)
        const layer5 = map.createLayer('chairLayer', [furnitureTileset1,furnitureTileset2], 0, 0)
        const layer6 = map.createLayer('foodLayer', [furnitureTileset1, foodTileset], 0, 0)
        // const layer3 = map.createLayer('Tile Layer 3', tileset3, 0, 0);
        
        //// 플레이어
        // this.player = this.physics.add.sprite(100, 150, 'character')
        // JSON 적용
        const characterKey = 'lucy'
        const imageName = 'Lucy'
        // const characterKey = 'ash'
        // const imageName = 'Ash'
        this.player = this.physics.add.sprite(100, 150, characterKey).setScale(0.8)
        
        // 키보드 입력기
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        // this.wasdKeys = this.input.keyboard.addKeys({
        //     up: Phaser.Input.Keyboard.KeyCodes.W,
        //     down: Phaser.Input.Keyboard.KeyCodes.S,
        //     left: Phaser.Input.Keyboard.KeyCodes.A,
        //     right: Phaser.Input.Keyboard.KeyCodes.D,
        //   });
        
        // 순서 중요!!!!!!!!
        // 경계 밖으로 카메라가 나가지 않도록 설정
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // 플레이어를 중앙으로 카메라 이동
        this.cameras.main.startFollow(this.player);
        // 안돼!!!!!!
        // 플레이어 월드 바깥 이동제한
        // this.player.setCollideWorldBounds(true);
        this.player.setCollideWorldBounds(true);
        
        // 카메라 설정
        // 2배 확대 (setScale(2) 대신 가능)
        this.cameras.main.setZoom(2);
        
        //// 타일에 충돌(Collision) 적용 (collides 적용)
        layer2.setCollisionByProperty({ collides: true });
        layer3.setCollisionByProperty({ collides: true });
        layer4.setCollisionByProperty({ collides: true });
        
        // 타일에 충돌(Collision) 적용 (타일 번호 값)
        // 벽
        // layer2.setCollisionBetween(803, 1797);
        // 책상
        // layer3.setCollisionBetween(4195, 4228);
        
        // 플레이어에 충돌 적용
        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.player, layer3);
        this.physics.add.collider(this.player, layer4);
        
        // 애니메이션 적용
        // 사용할수있는 모든 프레임 이름 추출
        const frameNames= this.textures.get(`${characterKey}`).getFrameNames();
        console.log(frameNames)
        // 애니메이션 함수 적용
        this.createAnims(characterKey,imageName)
        
        // 애니메이션 움직임 함수로 만듬
        // this.anims.create({
        //     // key: 'ash_idle_right',
        //     key: `${characterKey}_idle_right`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //     prefix: `${imageName}_idle_anim_`,
        //     suffix: '.png',
        //       start: 1,
        //       end: 6,
        //     }),
        //     // 반복
        //     repeat: -1,
        //     // 프레임 속도
        //     frameRate: 6
        //     })
          
        //   this.anims.create({
        //     key: `${characterKey}_idle_up`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_idle_anim_`,
        //         suffix: '.png',
        //         start: 7,
        //         end: 12,
        //     }),
        //     repeat: -1,
        //     frameRate: 6
        //   })
          
        //   this.anims.create({
        //     key: `${characterKey}_idle_left`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_idle_anim_`,
        //         suffix: '.png',
        //         start: 13,
        //         end: 18,
        //     }),
        //     repeat: -1,
        //     frameRate: 6
        //   })
        
        //   this.anims.create({
        //     key: `${characterKey}_idle_down`,
        //     frames: this.anims.generateFrameNames(characterKey, {

        //         prefix: `${imageName}_idle_anim_`,
        //         suffix: '.png',
        //         start: 19,
        //         end: 24,
        //     }),
        //     repeat: -1,
        //     frameRate: 6
        //   })
   
        // this.anims.create({
        //     key: `${characterKey}_run_right`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_run_`,
        //         suffix: '.png',
        //         start: 1,
        //         end: 6,
        //     }),
        //     // 반복
        //     repeat: -1,
        //     // 프레임 속도
        //     frameRate: 10,
        // })
        
        // this.anims.create({
        //     key: `${characterKey}_run_up`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_run_`,
        //         suffix: '.png',
        //         start: 7,
        //         end: 12,
        //     }),
        //     repeat: -1,
        //     frameRate: 10,
        // })
        
        // this.anims.create({
        //     key: `${characterKey}_run_left`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_run_`,
        //         suffix: '.png',
        //         start: 13,
        //         end: 18,
        //     }),
        //     repeat: -1,
        //     frameRate: 10,
        // })
        
        // this.anims.create({
        //     key: `${characterKey}_run_down`,
        //     frames: this.anims.generateFrameNames(characterKey, {
        //         prefix: `${imageName}_run_`,
        //         suffix: '.png',
        //         start: 19,
        //         end: 24,
        //     }),
        //     repeat: -1,
        //     frameRate: 10,
        // })

        // this.anims.create({
        //     key: `${characterKey}_sit_down`,
        //     frames: { key: characterKey, frame:`${imageName}_sit_down.png`},
        //     repeat: 0,
        //     frameRate: 10,
        // })
        
        // this.anims.create({
        //     key: `${characterKey}_sit_left`,
        //     frames: { key: characterKey, frame:`${imageName}_sit_left.png`},
        //     repeat: 0,
        //     frameRate: 10,
        // })
    
        // this.anims.create({
        //     key: `${characterKey}_sit_right`,
        //     frames: { key: characterKey, frame:`${imageName}_sit_right.png`},
        //     repeat: 0,
        //     frameRate: 10,
        // })
    
        // this.anims.create({
        //     key: `${characterKey}_sit_up`,
        //     frames: { key: characterKey, frame:`${imageName}_sit_up.png`},
        //     repeat: 0,
        //     frameRate: 10,
        // })
       
    }
    
    // 실시간 반영
    update() {
        const characterKey = 'lucy'
        const imageName = 'Lucy'
        // 디버그용 (1초 간격으로 플레이어 좌표를 콘솔에 출력)
        // console.log(this.player.body.x, this.player.body.y); 
        
        // 이전 속도(x,y) 저장
        const prevVelocity = this.player.body.velocity.clone();
        // 이전 프레임의 속도를 0으로 설정
        this.player.setVelocity(0);
        // this.player.setVelocityY(0);
        // this.player.setVelocityX(0);
        
        // 플레이어 이동
        if (this.cursors.up.isDown==true) {
            this.player.setVelocityY(-160);
            // this.player.anims.play('ash_run_up', true);
        }
        if (this.cursors.down.isDown==true) {
            this.player.setVelocityY(160);
            // this.player.anims.play('ash_run_down', true);
        }
        if (this.cursors.right.isDown==true) {
            this.player.setVelocityX(160);
            // this.player.anims.play('ash_run_right', true);
        }
        if (this.cursors.left.isDown==true) {
            this.player.setVelocityX(-160);
            // this.player.anims.play('ash_run_left', true);
        }

        // 애니메이션 적용 (좌우 이동 우선시)
        if (this.cursors.left.isDown) {
            this.player.anims.play(`${characterKey}_run_left`, true);
        } else if (this.cursors.right.isDown) {
            this.player.anims.play(`${characterKey}_run_right`, true);
        } else if (this.cursors.up.isDown) {
            this.player.anims.play(`${characterKey}_run_up`, true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play(`${characterKey}_run_down`, true);
        } else {
            // this.player.anims.stop();
            // console.log(prevVelocity)

            // 이동하다 멈추면, 사용할 프레임 선택 & idle상태로 전환
            if (prevVelocity.x < 0) {this.player.anims.play(`${characterKey}_idle_left`, true)}
            else if (prevVelocity.x > 0) {this.player.anims.play(`${characterKey}_idle_right`, true)}
            else if (prevVelocity.y < 0) {this.player.anims.play(`${characterKey}_idle_up`, true)}
            else if (prevVelocity.y > 0) {this.player.anims.play(`${characterKey}_idle_down`, true)}
        }

        if (this.keyE.isDown) {
            console.log(prevVelocity)
            console.log('E')
            if (this.player.anims.play(`${characterKey}_idle_left`)) {
                console.log('왼')
                this.player.anims.play(`${characterKey}_sit_left`, true)
                // this.player.setTexture(characterKey, `${imageName}_sit_left.png`)
            // }
            // if (this.player.anims.play(`${characterKey}_idle_right`, true)) {this.player.setTexture(characterKey, `${imageName}_sit_right.png`)}
            // if (this.player.anims.play(`${characterKey}_idle_up`, true)) {this.player.setTexture(characterKey, `${imageName}_sit_up.png`)}
            // if (this.player.anims.play(`${characterKey}_idle_down`, true)) {this.player.setTexture(characterKey, `${imageName}_sit_down.png`)}
            }
        }
    }

    //////////////////////// FUNCTIONS ////////////////////////

    // 애니메이션 움직임 함수 생성
    createAnims(characterKey,imageName) {
        this.anims.create({
            // key: 'ash_idle_right',
            key: `${characterKey}_idle_right`,
            frames: this.anims.generateFrameNames(characterKey, {
            prefix: `${imageName}_idle_anim_`,
            suffix: '.png',
              start: 1,
              end: 6,
            }),
            // 반복
            repeat: -1,
            // 프레임 속도
            frameRate: 6
            })
          
          this.anims.create({
            key: `${characterKey}_idle_up`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_idle_anim_`,
                suffix: '.png',
                start: 7,
                end: 12,
            }),
            repeat: -1,
            frameRate: 6
          })
          
          this.anims.create({
            key: `${characterKey}_idle_left`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_idle_anim_`,
                suffix: '.png',
                start: 13,
                end: 18,
            }),
            repeat: -1,
            frameRate: 6
          })
        
          this.anims.create({
            key: `${characterKey}_idle_down`,
            frames: this.anims.generateFrameNames(characterKey, {

                prefix: `${imageName}_idle_anim_`,
                suffix: '.png',
                start: 19,
                end: 24,
            }),
            repeat: -1,
            frameRate: 6
          })
   
        this.anims.create({
            key: `${characterKey}_run_right`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_run_`,
                suffix: '.png',
                start: 1,
                end: 6,
            }),
            // 반복
            repeat: -1,
            // 프레임 속도
            frameRate: 10,
        })
        
        this.anims.create({
            key: `${characterKey}_run_up`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_run_`,
                suffix: '.png',
                start: 7,
                end: 12,
            }),
            repeat: -1,
            frameRate: 10,
        })
        
        this.anims.create({
            key: `${characterKey}_run_left`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_run_`,
                suffix: '.png',
                start: 13,
                end: 18,
            }),
            repeat: -1,
            frameRate: 10,
        })
        
        this.anims.create({
            key: `${characterKey}_run_down`,
            frames: this.anims.generateFrameNames(characterKey, {
                prefix: `${imageName}_run_`,
                suffix: '.png',
                start: 19,
                end: 24,
            }),
            repeat: -1,
            frameRate: 10,
        })

        this.anims.create({
            key: `${characterKey}_sit_down`,
            frames: { key: characterKey, frame:`${imageName}_sit_down.png`},
            repeat: -1,
            frameRate: 10,
        })
        
        this.anims.create({
            key: `${characterKey}_sit_left`,
            frames: { key: characterKey, frame:`${imageName}_sit_left.png`},
            repeat: 0,
            frameRate: 10,
        })
    
        this.anims.create({
            key: `${characterKey}_sit_right`,
            frames: { key: characterKey, frame:`${imageName}_sit_right.png`},
            repeat: 0,
            frameRate: 10,
        })
    
        this.anims.create({
            key: `${characterKey}_sit_up`,
            frames: { key: characterKey, frame:`${imageName}_sit_up.png`},
            repeat: 0,
            frameRate: 10,
        })
    }   
}

export default LoadingScene;