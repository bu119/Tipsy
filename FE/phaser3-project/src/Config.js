import LoadingScene from "./LoadingScene";

// Phaser 환경 설정

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#93cbee',
    // zoom: 2,                 // 타일 배율 설정
    scale: {
        mode: Phaser.Scale.FIT,
        // mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    // width: 800,
    // height: 600,
    scene: [LoadingScene],      // 사용할 scene들은 해당 배열에 넣어줘야 함
    // pixelArt: true,          // 타일 선명하게
    physics:{
        default:"arcade",       // arcade라는 물리 엔진을 사용
        arcade:{
            debug: false,
        }

    }
};

export default config;