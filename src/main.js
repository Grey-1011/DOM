// document.createElement('div')
const div = dom.create("<div>newDiv</div>")
console.log(div);

// dom.after(test,div)
// dom.before(test,div) // 把node放到node2的前面
// dom.append(test,div) // 新增儿子

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test,div3) // 新增爸爸

// dom.remove(div3) // 删除节点

const nodes = dom.empty(window.empty) // 删除后代
console.log(nodes);

dom.attr(test,'title', 'Hi,I am frank') // 更改title
const title = dom.attr(test,'title')
console.log(`title:${title}`)

dom.text(test,'你好，这是新的文本内容') // 改文本内容
dom.text(test) // 读内容

dom.style(test,{border:'1px solid red',color:'blue'}) // 第二个参数为对象，设置修改它的值
dom.style(test,'border')//第二个参数为string,是读取
dom.style(test,'border','1px solid red')

dom.class.add(test,'red') // 增加类名
dom.class.remove(test,'red') // 删除类名
console.log(dom.class.has(test,'red')) // 查看是否有red 这个类


const fn = ()=>{
    console.log('点击了')
}
dom.on(test,'click',fn)
dom.off(test,'click',fn)


const testDiv = dom.find('#test')[0] // 获取标签
console.log(testDiv)

const test2 = dom.find('#test2')[0] // 获取标签
console.log(dom.find('.red',test2)[0])

console.log(dom.parent(test))

console.log(dom.children(test2));

console.log(dom.siblings(dom.find('#s2')[0])) // 获取s2的所有兄弟姐妹（s2除外）

console.log(dom.next(dom.find('#s2')[0]))

console.log(dom.previous(dom.find('#s2')[0]));

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n)=>dom.style(n,'color', 'red')) // 遍历所有节点

console.log(dom.index(dom.find('#s2')[0]));