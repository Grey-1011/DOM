window.dom = {
    // 输入create('<div><span>hi</span></div>')
    // 自动创建好div 和 span
    // innerHTML直接输入字符串
    // 使用template是因为这个标签可以容纳所有标签
    // 如果使用div,则div中是不能放<tr></tr>标签
    create(string){
        const container = document.createElement('template')
        container.innerHTML = string.trim() // .trim()可以去除 文本text 元素
        // console.log(container);
        return container.content.firstChild// 如果用 template容器的话，是不能用children[0]获取到的，应用content.firstChild
    },
    after(node,node2){
        node.parentNode.insertBefore(node2, node.nextSibling)// 把node2 插入到node下一个节点的前面，如果node是最后一个节点，也是没有问题的

    },
    before(node,node2){
        node.parentNode.insertBefore(node2,node)// 把node放到node2的前面
    },
    append(parent,node){
        parent.appendChild(node) // 新增儿子
    },
    wrap(node, parent){// 新增爸爸 
        dom.before(node, parent)// 把parent 放到 node 前面
        dom.append(parent,node)// 把 node 插入 parent里面
    },
    remove(node){
        // node.parentNode.removeChild(node) // 删除节点  旧方法
        node.remove(node)
        return node
    },
    empty(node){ // 删除后代
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild // 让原来的第二个儿子，成为firstChild
        }
        return array
    },
    attr(node,name,value){ // 重载
        if(arguments.length === 3){
            node.setAttribute(name,value) // 设置title
        }else if(arguments.length === 2){
            return node.getAttribute(name) // 读取 title
        }
    },
    text(node,string){ // 适配
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string  // ie 改文本内容
            }else{
                node.textContent = string // firefox / chrome 
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node,string){
        if(arguments.length === 2){
            node.innerHTML = string //改html
        }else if(arguments === 1){
            return node.innerHTML // 读HTML
        }
    },
    style(node,name,value){
        if(arguments.length === 3){
            // dom.style(div,'color','red')
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                //dom.style(div,'color')
                return node.style[name]
            }else if(name instanceof Object){
                const object = name
                // dom.style(div,{color:'red'})
                for(key in object){
                    //key: border / color
                    // node.style.border = ...
                    // node.style.color = ...
                    node.style[key] = object[key]
                }
            }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className) //添加class
        },
        remove(node,className){
            node.classList.remove(className) //删除class
        },
        has(node,className){
           return node.classList.contains(className)// 查看是否拥有
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn) // 添加事件监听
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn) // 删除事件监听
    },
    find(selector,scope){ // 获取标签
        //dom.find('.red',testDiv) 如果第二个参数 scope 存在，则在 scope.querySelectorAll里面找，否则，反之
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode // 获取父元素
    },
    children(node){
        return node.children // 获取子元素
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node) // 获取兄弟姐妹元素
    },
    next(node){
        let x = node.nextSibling  // 获取下一个节点（去除文本节点）
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling  // 获取上一个节点（去除文本节点）
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){// 遍历所有节点
        for(let i = 0; i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i // 注意i 的作用域
        for(i = 0;i < list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}