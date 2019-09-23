import React from "react";
import { View, FlatList, Platform, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';

const Orders = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />}
    />
  );
};

Orders.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
    }
}

const styles = StyleSheet.create({});

export default Orders;
