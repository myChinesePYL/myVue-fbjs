import $ from 'jquery'

export default class main {
  public target: HTMLElement
  public callback: Function
  public args: any = {}
  public back: any = {}

  constructor(eventElement: HTMLElement, callback: Function) {
    this.target = eventElement
    this.callback = callback

    $(this.target).on('pointermove', (e: JQuery.Event) => {
      if (e.buttons !== 1 || e.clientX == undefined || e.clientY == undefined) {
        this.back.x = e.clientX
        this.back.y = e.clientY
        return
      }
      if (this.back.x == undefined) this.back.x = e.clientX
      if (this.back.y == undefined) this.back.y = e.clientY

      this.args.x = e.clientX - this.back.x
      this.args.y = e.clientY - this.back.y

      this.back.x = e.clientX
      this.back.y = e.clientY

      this.callback(this.args)
    })

    return this
  }
}