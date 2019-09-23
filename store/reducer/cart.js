import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../action/orders";
import { DELETE_PRODUCT } from "../action/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;

      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + productPrice
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.pid];
      const currQty = selectedProduct.quantity;
      let updatedCartItems;
      if (currQty > 1) {
        const updatedCartItem = new CartItem(
          currQty - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.sum - selectedProduct.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
        if(!state.items[action.pid]){
            return state;
        }
        const updatedItems = {...state.items};
        const itemTotal = state.items[action.pid].sum;

        delete updatedItems[action.pid];
        return {
            ...state,
            items: updatedItems,
            totalAmount: state.totalAmount - itemTotal
        }
  }
  return state;
};
