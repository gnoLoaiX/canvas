/**
 * Created by 20189 on 2019/3/21.
 */
/*核心是图片*/
function Person(ctx) {
  /*绘制工具*/
  this.ctx = ctx || document.querySelector('canvas').getContext('2d')
  /*画布的大小*/
  this.canvasWidth = this.ctx.canvas.width
  this.canvasHeight = this.ctx.canvas.height
  this.src = 'image/01.png'

  /*行走相关参数*/
  this.stepSize = 10
  /*x/y轴方向的偏移步数*/
  this.stepX = 0
  this.stepY = 0
  /*0-右  1-前 2-右 下-3*/
  this.direction = 0 
}

Person.prototype.init = function () {
  /*1、加载图片 把当前的this对象复制一份到that变量*/
  var that = this
  this.loadImage(function (image) {
    /*图片的大小 加载图片完成之后才有*/
    that.imageWidth = image.width
    that.imageHeight = image.height
    /*人物的大小（图片坐标/缩放）*/
    that.personWidth = that.imageWidth / 4
    that.personHeight = that.imageHeight / 4
    /*绘制图片的起点（画布坐标）*/
    that.x0 = that.canvasWidth / 2 - that.personWidth / 2
    that.y0 = that.canvasHeight / 2 - that.personHeight / 2

    /*2、默认初始化时刻在正中间朝正面*/
    that.ctx.drawImage(image,
      0,0,
      that.personWidth, that.personHeight,
      that.x0, that.y0,
      that.personWidth, that.personHeight)

    /*3、通过方向键空hi在行走*/
    that.index = 0
    document.onkeydown = function(e) {
      if(e.keyCode == 37) {
        /*左*/
        that.direction = 1
        that.stepX --
        that.drawImage(image)
      } else if(e.keyCode == 38) {
        /*前*/
        that.direction = 3
        that.stepY --
        that.drawImage(image)
      } else if(e.keyCode == 39) {
        /*右*/
        that.direction = 2
        that.stepX ++
        that.drawImage(image)
      } else if(e.keyCode == 40) {
        /*下*/
        that.direction = 0
        that.stepY ++
        that.drawImage(image)
      }
    }
  })
}

/*1、封装在函数外部、抽离业务---加载图片*/
Person.prototype.loadImage = function (callback) {
  var image = new Image()
  image.onload = function () {
    /*callback里面执行业务*/
    callback && callback(image)
  }
  image.src = this.src
}
Person.prototype.drawImage = function (image) {
  /*清除画布*/
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  /*绘图*/
  /*在精灵图上的定位 x  索引*/
  /*在精灵图上的定位 y  方向*/
  this.ctx.drawImage(image,
    this.index * this.personWidth, this.direction * this.personHeight,
    this.personWidth, this.personHeight,
    this.x0 + this.stepSize * this.stepX, this.y0 + this.stepSize * this.stepY,
    this.personWidth, this.personHeight
  )
  this.index ++
  if (this.index >= 4) {
    this.index = 0
  }
}

// 实例化对象
var person = new Person(document.querySelector('canvas').getContext('2d'))
person.init()