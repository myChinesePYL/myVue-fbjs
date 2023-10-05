import { fabric } from "fabric"

export default class main {
  public canvas: HTMLCanvasElement = document.createElement('canvas')
  public cvs: fabric.Canvas = new fabric.Canvas(this.canvas, {
    backgroundColor: '#000',
    width: window.innerWidth,
    height: window.innerHeight
  })

  // 层次设置
  public all_ctx: [
    { [key: string]: number },
    { [key: string]: number },
    { [key: string]: number },
    { [key: string]: number },
    { [key: string]: number }
  ] = [
      { grass: 3 },
      { blur_grass_center: 1.25 },
      { blur_grass: 0.5 },
      { mountain: 0.25 },
      { mountains: 0 }
    ]

  public init() {
    // 山(后面那个)
    fabric.Image.fromURL('/image/3.png', (img: fabric.Image) => {
      img.left = -200 * 4
      img.top = window.innerHeight - 200 * 5 + 300
      img.name = 'mountains'
      img.scale(3)

      this.cvs.add(img)
      this.cvs.renderAll()
    })
    // 山(前面那个)
    fabric.Image.fromURL('/image/2.png', (img: fabric.Image) => {
      img.left = -100
      img.top = window.innerHeight - 200 * 5 + 100 + 300
      img.name = 'mountain'
      img.scale(2)
      img.scaleX = 3

      this.cvs.add(img)
      this.cvs.renderAll()
    })
    // 模糊的草
    fabric.Image.fromURL('/image/blur_grass.png', (img: fabric.Image) => {
      img.left = -100 * 2.5
      img.top = window.innerHeight - 200 * 1.25
      img.name = 'blur_grass'
      img.scaleY = 5
      img.scaleX = 5
      this.cvs.add(img)

      this.cvs.renderAll()
    }, { crossOrigin: 'anonymous' })
    // 稍微有点模糊的草
    fabric.Image.fromURL('/image/blur_grass_center.png', (img: fabric.Image) => {
      img.left = -100 * 2.5
      img.top = window.innerHeight - 140 * 1.25
      img.name = 'blur_grass_center'
      img.scaleY = 5
      img.scaleX = 7

      this.cvs.add(img)
      this.cvs.renderAll()
    }, { crossOrigin: 'anonymous' })
    // 近的草
    fabric.Image.fromURL('/image/grass.png', (img: fabric.Image) => {
      img.left = -100 * 2.5
      img.top = window.innerHeight - 80 * 1.25
      img.name = 'grass'
      img.scaleY = 5
      img.scaleX = 9

      this.cvs.add(img)
      this.cvs.renderAll()
    }, { crossOrigin: 'anonymous' })
  }

  constructor(container: HTMLElement) {
    if (this.canvas.getContext == undefined) {
      throw new Error('container is not a canvas element')
    }
    this.init()
    container.appendChild(this.canvas)

    // 渲染
    this.cvs.renderAll()
  }

  public moveCamera(x: number, y: number) {
    // 移动所有图行,每个图形移动的幅度都不同
    this.cvs.getObjects().forEach((ctx: fabric.Object) => {
      this.all_ctx.forEach(i => {
        if (typeof ctx.left !== 'number' || typeof ctx.top !== 'number' || typeof ctx.name !== 'string') return
        if (ctx.name in i) {
          ctx.set({
            left: ctx.left + x + x * i[ctx.name],
            top: ctx.top + y + y * i[ctx.name]
          })
        }
      })
      this.cvs.renderAll()
    })
  }
}