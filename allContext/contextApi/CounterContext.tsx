import { Component, createContext } from "react";

const CounterContext = createContext({
    count: 0,
    increment: () => {},
    decrement: () => {},
  });

  interface Iprops {
    children:React.ReactNode
  }
  interface Istate {}
class CounterProvider extends Component<Iprops,Istate,any>{
    state = {
        counter : 0
    }

    increment = () => {
        this.setState({counter:this.state.counter+1})
    }
    decrement = () => {
        this.setState({counter:this.state.counter-1})
    }

    render(){
        return(
            <CounterContext.Provider value={{
                count:this.state.counter,
                increment:this.increment,
                decrement:this.decrement
            }}>
                {this.props.children}
            </CounterContext.Provider>
        )
    }
}

export { CounterContext, CounterProvider };
