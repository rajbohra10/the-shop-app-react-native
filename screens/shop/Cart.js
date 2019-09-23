import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/action/cart";
import * as orderActions from "../../store/action/orders";
import CartItem from "../../components/shop/CartItem";

import Colors from "../../constants/Colors";
const Cart = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartProducts = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100/100)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartProducts.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartProducts, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            deletable
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.productPrice}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

Cart.navigationOptions = navData => {
  return {
    headerTitle: "Your Cart"
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default Cart;
