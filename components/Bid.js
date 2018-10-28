import * as React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

const Bid = ({ bid, myBid }) => {
    return (
        <View
            style={[
                {
                    width: '65%',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderColor: '#ccc',
                },
                myBid
                    ? {
                          backgroundColor: '#ef6c00',
                      }
                    : {
                          backgroundColor: '#83b9ff',
                      },
            ]}
        >
            <Text
                style={[
                    { fontSize: 22, fontWeight: 'bold' },
                    myBid
                        ? {
                              color: 'white',
                          }
                        : {
                              color: '#0069c0',
                          },
                ]}
            >
                {bid.user} bid {bid.price}
            </Text>
            <Text style={{ textAlign: 'right', color: 'white', fontSize: 18 }}>
                {moment(bid.timestamp).format('h:mm:ss a')}
            </Text>
        </View>
    )
}

export default Bid
