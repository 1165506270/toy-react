import {ToyReact, Component} from './toy-react'




class MyComponent extends Component {
  render() {
    return <div>
      asdasd
      {this.children}
    </div>
  }
}
const A = <MyComponent>
  <div class="a">a</div>
</MyComponent>
ToyReact.mountTo(A, document.body)
console.log(A)