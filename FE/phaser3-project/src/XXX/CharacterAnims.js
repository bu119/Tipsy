
// module ".js"
export default function createCharacterAnims(characterKey, imageName) {

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
      repeat: 0,
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