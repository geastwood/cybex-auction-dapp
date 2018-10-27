import * as React from 'react'
import { Text } from 'react-native'

class Countdown extends React.PureComponent {
    state = {
        seconds: Math.ceil((this.props.endTime - Date.now()) / 1000),
    }

    componentDidMount() {
        const interval = setInterval(() => {
            if (this.props.endTime > Date.now()) {
                this.setState({ seconds: Math.ceil((this.props.endTime - Date.now()) / 1000) })
            } else {
                clearInterval(interval)
                this.props.onTimeup()
            }
        }, 1000)
    }

    render() {
        if (this.state.seconds < 1) {
            return <Text style={{ paddingLeft: 8, alignSelf: 'center' }}>Auction is closed.</Text>
        }
        return (
            <Text style={{ paddingLeft: 8, alignSelf: 'center' }}>
                Auction will be closed in {this.state.seconds} seconds
            </Text>
        )
    }
}

export default Countdown
