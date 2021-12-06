const data = [
    { name: 'questions', value: 17 },
    { name: 'schools', value: 25 },
    { name: 'philosophers', value: 35 }
]
const chartWidth = 480 // 条形图的宽度
const chartHeight = 300 // 条形图的高度
const margin = 15 // 条形图的外边距

const containerWidth = chartWidth + margin * 2 // 容器的宽度
const containerHeight = chartHeight + margin * 2 // 容器的高度

const names = Array.from(data, d => d.name)
const values = Array.from(data, d => d.value)
const indices = Array.from(data, (_, i) => i)

// 计算每一个条左下顶点的横坐标
// 位置和在数组里面的 index 有关
const step = chartWidth / names.length
const barWidth = step * 0.8
const xs = Array.from(indices, i => i * step)

// 计算每一个条左下顶点的纵坐标
// 因为所有条底部都是对齐的，所以就是图表的高度
const y = chartHeight

// 获得每一个条的高度
// 条的高度应该和 value 线性相关的
const vmax = Math.max(...values)
const barHeights = Array.from(values, v => chartHeight * (v / vmax))

// 获得每一个条的颜色
const nameColor = {
    questions: '#5B8FF9',
    philosophers: '#61DDAA',
    schools: '#65789B'
}

const colors = Array.from(names, name => nameColor[name])

// 获取 canvas 容器元素
const canvas = document.getElementById('canvas')

// 设置 canvas 的样式宽高
// 样式宽高决定了 canvas 在画布上呈现的大小
canvas.style.width = 400 + 'px'
canvas.style.height = 200 + 'px'

// 设置 canvas 画布宽高
// 这个宽高是可以绘制区域的大小
// 样式宽高是默认等于画布宽高的
canvas.width = 400
canvas.height = 200

// 获取绘制的上下文
// 之后的 API 都是通过调用 context
const context = canvas.getContext('2d')

// 绘制一个举行
context.fillStyle = 'red' // 设置填充颜色
context.strokeStyle = 'yellow' // 设置边框颜色
context.lineWidth = 10 // 设置边框款段
context.strokeRect(0, 0, 100, 100) // 绘制边框
context.fillRect(5, 5, 95, 95) // 绘制填充颜色

// 绘制一段文字
context.fillStyle = 'black' // 设置文字的颜色
context.font = '25px PingFangSC-Regular, sans-serif' // 设置文字的大小和字体
context.fillText('hellow world', 150, 100) // 绘制文字
