import $ from 'jquery'

export default class main {
  public target: HTMLElement
  public callback: Function
  public args: any = {
    x: 0,
    y: 0
  }
  public back: any = {}

  constructor(eventElement: HTMLElement, callback: Function) {
    this.target = eventElement
    this.callback = callback

    $(this.target).on('pointermove', (e: JQuery.Event) => { // 移动检测
      if (e.buttons !== 1 || e.screenX == undefined || e.screenY == undefined) {
        this.back.x = e.screenX
        this.back.y = e.screenY
        return
      }
      if (this.back.x == undefined) this.back.x = e.screenX
      if (this.back.y == undefined) this.back.y = e.screenY

      this.args.x = e.screenX - this.back.x
      this.args.y = e.screenY - this.back.y

      this.back.x = e.screenX
      this.back.y = e.screenY
      this.callback(this.args)
    })
    $(this.target).on('pointerup', (e: JQuery.Event) => {
    	this.back.x = undefined
	this.back.y = undefined
    })

    return this
  }
}
