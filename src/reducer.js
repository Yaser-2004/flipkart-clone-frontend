export const initialState = {
    cart: [],
    user: null,  //we are storing the user in the react context api, here by default the user is null
    token: null
};

export const getCartTotal = (cart) => cart?.reduce((amount, item) => Number(item.price) + amount, 0);

function reducer(state, action) {
    //console.log(action);

    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, ...action.cart],
            };

        case 'REMOVE_FROM_CART':
            const index = state.cart.findIndex(cartItem => cartItem.id === action.id);
            let newCart = [...state.cart];

            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as its not in cart!`);
            }

            return {
                ...state,
                cart: newCart,
            }

        case 'SET_USER':
            return{
                ...state,
                user: action.user,
            }

        case 'EMPTY_CART':
            return {
                ...state,
                cart: [],
            }

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            }

        default:
            return state;
    }

}

export default reducer;