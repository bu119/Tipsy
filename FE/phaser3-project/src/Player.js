makeAnims() {
  const animsFrameRate = 15

  this.anims.create({
    key: 'ash_idle_right',
    frames: this.anims.generateFrameNames('ash', {
      start: 0,
      end: 5,
    }),
    // 반복
    repeat: -1,
    // 프레임 속도
    frameRate: this.animsFrameRate * 0.6,
    })
  
  this.anims.create({
    key: 'ash_idle_up',
    frames: this.anims.generateFrameNames('ash', {
      start: 6,
      end: 11,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate * 0.6,
  })
  
  this.anims.create({
    key: 'ash_idle_left',
    frames: this.anims.generateFrameNames('ash', {
      start: 12,
      end: 17,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate * 0.6,
  })

  this.anims.create({
    key: 'ash_idle_down',
    frames: this.anims.generateFrameNames('ash', {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate * 0.6,
  })

  this.anims.create({
    key: 'ash_run_right',
    frames: this.anims.generateFrameNames('ash', {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate,
  })
  
  this.anims.create({
    key: 'ash_run_up',
    frames: this.anims.generateFrameNames('ash', {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate,
  })
  
  this.anims.create({
    key: 'ash_run_left',
    frames: this.anims.generateFrameNames('ash', {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate,
  })

  this.anims.create({
    key: 'ash_run_down',
    frames: this.anims.generateFrameNames('ash', {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: this.animsFrameRate,
  })
  
  this.anims.create({
    key: 'ash_sit_down',
    frames: this.anims.generateFrameNames('ash', {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: this.animsFrameRate,
  })

  this.anims.create({
    key: 'ash_sit_left',
    frames: this.anims.generateFrameNames('ash', {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: this.animsFrameRate,
  })

  this.anims.create({
    key: 'ash_sit_right',
    frames: this.anims.generateFrameNames('ash', {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: this.animsFrameRate,
  })

  this.anims.create({
    key: 'ash_sit_up',
    frames: this.anims.generateFrameNames('ash', {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: this.animsFrameRate,
  })
}
