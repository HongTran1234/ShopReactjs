class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        this.setState({
            count: this.state.count + 1;
        })
    }
    componentDidUpdate() {
        console.log(this.state.count)
    }


    handleClick() {
        this.setState({
            count: this.state.count + 1;
        })

    }


    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.handleClick()}>
                    Click me
                </button>
            </div>
        );
    }
}