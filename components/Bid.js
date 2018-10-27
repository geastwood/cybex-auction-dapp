import * as React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

const styles = {}
const Bid = ({ bid }) => {
    return (
        <View
            style={{
                width: '70%',
                backgroundColor: '#83b9ff',
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
            }}
        >
            <Text style={{ fontSize: 22, color: '#0069c0', fontWeight: 'bold' }}>
                {bid.user} bid {bid.price}
            </Text>
            <Text style={{ textAlign: 'right', color: 'white', fontSize: 18 }}>
                {moment(bid.timestamp).format('h:mm:ss a')}
            </Text>
        </View>
    )
}

export default Bid
