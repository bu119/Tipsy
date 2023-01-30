import Phaser from 'phaser';
// import Chair from './items/Chair'
// import logoImg from './assets/logo.png';

import bar_wall from './assets/map/bar_walls.png';
import bar_floor from './assets/map/bar_floors.png';
import bar_wine from './assets/map/bar_wineInterior.png';
import bar_furniture from './assets/map/bar_furniture.png';
import bar_furniture_deco from './assets/map/bar_furniture_deco.png';
import bar_deco from './assets/map/bar_floor_wall_deco.png';
import bar_chair from './assets/map/bar_chairs.png';


// import face from './assets/map/face.png'
import jsonash from './assets/character/ash.json'
import imageash from './assets/character/ash.png'
import bar_food from './assets/map/bar_food.png';


import map1 from './assets/map/map1.json';

// import map2 from './assets/map/map2.json';

class LoadingScene extends Phaser.Scene {
    constructor () {
        super();
    }

    preload ()
    {
        // 캐릭터
        // this.load.image('character', face);
        this.load.atlas('characterash', imageash, jsonash)

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

        this.load.image('tilesChair', bar_chair);
        this.load.spritesheet('chairs', bar_chair, {
            frameWidth: 32,
            frameHeight: 32,
        })

    }

    // 생성하기
    create ()
    {   // (tileset name / imported image)
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16});
        const floorTileset = map.addTilesetImage("tilefloor",'tilesFloor');
        const wallTileset1 = map.addTilesetImage("tilewall",'tilesWall');
        const wallTileset2 = map.addTilesetImage("tilewine",'tilesWine');
        const furnitureTileset1 = map.addTilesetImage("tilefurniture",'tilesFurni');
        const furnitureTileset2 = map.addTilesetImage("tilefurnituredeco",'tilesFurniDeco');
        const decoTileset = map.addTilesetImage("tiledeco",'tilesDeco');
        const foodTileset = map.addTilesetImage("tilefood",'tilesFood');
        
        
        const chairTileset = map.addTilesetImage("tilechair", 'tilesChair');
        // const decoTileset = map.addTilesetImage("tilefurnituredeco",'tilesFurniDeco');
        // console.log(chairTileset)

        // 2배 확대 : setScale(2) -> setZoom 으로 대체
        // const layer1 = map.createLayer('floorLayer', floorTileset, 0, 0).setScale(2);
        const layer1 = map.createLayer('floorLayer', floorTileset, 0, 0)
        const layer2 = map.createLayer('wallLayer', [wallTileset1, wallTileset2], 0, 0)
        const layer3 = map.createLayer('decoLayer', [furnitureTileset1,furnitureTileset2,decoTileset], 0, 0)
        const layer4 = map.createLayer('tableLayer', [furnitureTileset1,furnitureTileset2], 0, 0)
        // const layer5 = map.createLayer('chairLayer', [furnitureTileset1,furnitureTileset2], 0, 0)
        const layer6 = map.createLayer('foodLayer', [furnitureTileset1, foodTileset], 0, 0)
        // const layer3 = map.createLayer('Tile Layer 3', tileset3, 0, 0);
        
        // console.log(Phaser.Tilemaps.Tilemap.getTileset());

        // ChairObject 가지고 오기
        // const chairLayer = map.getObjectLayer('chairObject', chairTileset);
        const chairLayer = map.getObjectLayer('chairObject');
        const chairs = this.physics.add.staticGroup()
        chairLayer.objects.forEach((chairObj) => {
            // const obj = chairs.create(object.x, object.y, )
            chairs.get(chairObj.x, chairObj.y, 'chairs', chairObj.gid)
        })
        console.log(chairs)
        // console.log(chairLayer.objects)

        // function addObjectFromTiled(group, object, key){
        //     const actualX = object.x + object.width * 0.5
        //     const actualY = object.y - object.height * 0.5
        //     const obj = group.get(actualX, actualY, key, object.gid)
        // }

        //// 플레이어
        // this.player = this.physics.add.sprite(100, 150, 'character')
        this.player = this.physics.add.sprite(100, 150, 'characterash')
        
        // 안돼!!!!!!
        // 플레이어 월드 바깥 이동제한
        // this.player.setCollideWorldBounds(true);
        this.player.setCollideWorldBounds(true);
        
        // 순서 중요!!!!!!!!
        // 경계 밖으로 카메라가 나가지 않도록 설정
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // 플레이어를 중앙으로 카메라 이동
        this.cameras.main.startFollow(this.player);

        
        // 카메라 설정
        // 2배 확대 (setScale(2) 대신 가능)
        this.cameras.main.setZoom(2);
        
        // 키보드 입력기
        this.cursors = this.input.keyboard.createCursorKeys();
        
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
        
    }

    // 실시간 반영
    update() {
        // 디버그용 (1초 간격으로 플레이어 좌표를 콘솔에 출력)
        // console.log(this.player.body.x, this.player.body.y);   

        this.player.setVelocityY(0);
        this.player.setVelocityX(0);

       if (this.cursors.up.isDown==true) 
       {
        this.player.setVelocityY(-160);
       }
       if (this.cursors.down.isDown==true) 
       {
        this.player.setVelocityY(160);
       }
       if (this.cursors.right.isDown==true) 
       {
        this.player.setVelocityX(160);
       }
       if (this.cursors.left.isDown==true) 
       {
        this.player.setVelocityX(-160);
       }

    }
}

export default LoadingScene;