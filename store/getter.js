export const getBidsByAuctionId = ({ bids }, { id }) => bids.filter(bid => (bid.auctionId = id))
