class ELementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}


export class Component {
  constructor() {
    this.children = []
  }

  setAttribute(name, value){
    this[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    let vdom = this.render()

    vdom.mountTo(parent)
  }
}



export const ToyReact = {
  createElement(type, attrs, ...children) {
    console.log(type, attrs, children)
    let element;
    if(typeof type === 'string') {
      element = new ELementWrapper(type)
    } else {
      element = new type()
    }
    for(let key in attrs) {
      element.setAttribute(key, attrs[key])
    }
    const insertChildren = (childrenArr) => {
      childrenArr.forEach(child => {
        if(Array.isArray(child)) {
          insertChildren(child)
        } else {
          if(typeof child !== 'string'
            &&!(child instanceof ELementWrapper) 
            && !(child instanceof Component)
            && !(child instanceof TextWrapper) ){
              child = String(child)
          }
          if(typeof child === 'string') {
            child = new TextWrapper(child)
          }
          element.appendChild(child)
        }
      });
    }
    insertChildren(children)
    return element
  },
  mountTo(child, parent) {
    child.mountTo(parent)
  }
}