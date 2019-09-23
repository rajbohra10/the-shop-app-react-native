import React from 'react';
import { FlatList, Platform, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/action/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductOverview = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetailsHandler = (id, title) => {
    props.navigation.navigate({
        routeName: "ProductDetail",
        params: {
          productId: id,
          productTitle: title
        }
      });
  }

  const addToCartHandler = (item) => {
    dispatch(cartActions.addToCart(item))
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
              viewDetailsHandler(itemData.item.id, itemData.item.title)
          }}
        >
            <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                    viewDetailsHandler(itemData.item.id, itemData.item.title)
                }}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
                    addToCartHandler(itemData.item)
                }}
              />
        </ProductItem>
      )}
    />
  );
};

ProductOverview.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({});

export default ProductOverview;
