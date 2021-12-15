import Tinyact, { render, Component } from '../tinyact';

class Title extends Component {
    componentDidMount() {
        console.log('title');
        console.log('props', this.props)
        console.log(document.getElementById('title'));
    }

    render() {
        return (
            <h1 id="title">{this.props.children}</h1>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }

    componentDidMount() {
        console.log('app');
    }

    onIncrease() {
        this.setState({counter: this.state.counter + 1});
    }

    onDecrease() {
        this.setState({counter: this.state.counter - 1});
    }

    render() {
        const {counter} = this.state;
        return (
            <div>
                <Title key="title">Hello Tinyact {counter}!!!!</Title>
                <p>
                    <button onClick={this.onDecrease}>-</button>
                    {' '}Counter: {counter}{' '}
                    <button onClick={this.onIncrease}>+</button>
                </p>
                <ul>
                {
                    ['a', 'b', 'c'].map(a => <li>{a}</li>)
                }
                </ul>
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));
