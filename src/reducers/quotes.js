export default (state = [], action) => {
  let index
  let quote

  switch (action.type) {
    case 'ADD_QUOTE': return [...state, action.quote]
    case 'REMOVE_QUOTE': return state.filter(quote => quote.id !== action.quoteId)
    case 'UPVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];

      return [
        // returns the quote in the array to vote on
        // spread operator code used so all quotes will still show up on the page
        // when click vote buttons on a specific quote.
        // if spread operator code not used, when click vote button on a quote
        // all other quotes on the page will disappear.
        // have to single out the quote to vote on for app to work properly
        ...state.slice(0, index),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(index + 1)
      ];
    case 'DOWNVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];
      if (quote.votes > 0) {
        return [
          ...state.slice(0, index),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(index + 1)
        ];
      }
    return state

    default: return state
  }
}
