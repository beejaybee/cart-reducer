const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART" :
            return {...state, cart: []};

        case "REMOVE_AN_ITEM" :
            return {...state, cart: state.cart.filter(cartItem => cartItem.id !== action.payload)};

        case "INCREASE" :
            let IncreaseCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload) {
                    return {...cartItem, amount: cartItem.amount + 1}
                }
                return  cartItem
            })
            return {...state, cart: IncreaseCart};

        case "DECREASE" :
            let DecreaseCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload) {
                    return {...cartItem, amount: cartItem.amount - 1}
                }
                return  cartItem
            }).filter(cartItem => cartItem.amount !== 0)
            return {...state, cart: DecreaseCart};

        case "GET_TOTALS" :
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const totalItem = price * amount
                cartTotal.total += totalItem 
                cartTotal.amount += amount;
                return cartTotal
            }, {
                total: 0,
                amount: 0
            })
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount};

        case "LOADING" :
            return { ...state, loading: true };

        case "DISPLAY_ITEMS" :
            return { ...state, cart: action.payload, loading: false };

        default :
            return state
    }
}

export default reducer