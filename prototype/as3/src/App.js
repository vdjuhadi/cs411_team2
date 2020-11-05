import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error:null,
            isLoaded:false,
            items:null
        };
    }

    componentDidMount() {
        //simple GET request using fetch
        fetch('https://api.npms.io/v2/search?q=react')
            .then(res => res.json())
            .then(data => this.setState({
                isLoaded: true,
                items: data.total
            }))
    }

    render() {
        const {items, isLoaded, error} = this.state;
        return (
            <div>
                Total packages: {items}
            </div>
        );
    }

}

export default App;
