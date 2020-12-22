import { GameObjects, Scene } from 'phaser'
import {
  SCENE_CARD,
  IMG_BABY_JESUS, IMG_BACKGROUND,
  IMG_JOSEPH, IMG_MARY, IMG_GABRIEL, IMG_GABRIEL_BW, IMG_MERRY_CHRISTMAS, IMG_BONFIRE, ANIMS_BONFIRE, AUDIO_AWAY_IN_A_MANGER, Globals
} from '../constants'
import { GameService } from '../game.service'
import { ScreenMapper } from './scene-mapper'

export class CardScene extends Scene {

  private gabrielBW: GameObjects.Image
  private gameSvc: GameService

  constructor() {
    super(SCENE_CARD)
    // lookup GameService
    this.gameSvc = Globals.injector.get(GameService)
    console.info('>>> in scene: ', this.gameSvc.message)
  }

  // load resources
  preload() {
    // load background
    this.load.image(IMG_BACKGROUND, 'assets/background.png')
    this.load.image(IMG_BABY_JESUS, 'assets/baby_jesus.png')
    this.load.image(IMG_JOSEPH, 'assets/joseph.png')
    this.load.image(IMG_MARY, 'assets/mary.png')
    this.load.image(IMG_GABRIEL, 'assets/angel_gabriel.png')
    this.load.image(IMG_GABRIEL_BW, 'assets/angel_gabriel_bw.png')
    this.load.image(IMG_MERRY_CHRISTMAS, 'assets/merry_christmas.png')

    this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png',
        { frameWidth: 230, frameHeight: 312 })

    this.load.audio(AUDIO_AWAY_IN_A_MANGER, [
      'assets/audio/away_in_a_manger.mp3',
      'assets/audio/away_in_a_manger.ogg'
    ])
  }

  // create game objects
  create() {
    const mapper = new ScreenMapper({
      scene: this,
      columns: 11, rows: 11
    })

    let img = mapper.placeImageAt(5, 5, IMG_BACKGROUND,
      { scaleToWidth: .75 })

    //mapper.drawGrids()

    img = mapper.placeImageAt(4, 7, IMG_MARY, { scaleX: .4, scaleY: .4 })
    img.x += 20
    img = mapper.placeImageAt(6, 6, IMG_JOSEPH, { scaleX: .6, scaleY: .6 })
    img.x -= 30
    mapper.placeImageAt(5, 8, IMG_BABY_JESUS, { scaleToWidth: .1 })

    this.anims.create({
      key: ANIMS_BONFIRE,
      frames: this.anims.generateFrameNumbers(IMG_BONFIRE, { start: 0 }),
      frameRate: 10,
      repeat: -1
    })

    let sprite = mapper.placeSpriteAt(8, 8, IMG_BONFIRE, { scaleToWidth: .15 })
    sprite.play(ANIMS_BONFIRE)

    img = mapper.placeImageAt(2, 2, IMG_GABRIEL, { scaleToWidth: .2 })
    img.rotation = Phaser.Math.DegToRad(20)
    this.gabrielBW = mapper.placeImageAt(2, 2, IMG_GABRIEL_BW, { scaleToWidth: .2 })
    this.gabrielBW.rotation = Phaser.Math.DegToRad(20)
    this.gabrielBW.setInteractive()
    this.gabrielBW.on('pointerover', () => {
      this.add.tween({
        targets: this.gabrielBW,
        duration: 500,
        // attributes
        alpha: 0,
        rotation: Phaser.Math.DegToRad(0)
      })
    })
    this.gabrielBW.on('pointerout', () => {
      this.add.tween({
        targets: this.gabrielBW,
        duration: 500,
        // attributes
        alpha: 1,
        rotation: Phaser.Math.DegToRad(20)
      })
    })

    img = mapper.placeImageAt(9, 1, IMG_MERRY_CHRISTMAS, { scaleToWidth: .3 })
    img.x -= 30

    let text = mapper.placeTextAt(0, 9, this.gameSvc.message)
    text.x -= 20

    const music = this.sound.add(AUDIO_AWAY_IN_A_MANGER,
      { volume: .4, loop: true })
    //music.play()
  }

  // game loop
  update() {

  }

}
