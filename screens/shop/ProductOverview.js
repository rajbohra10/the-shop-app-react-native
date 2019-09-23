 import React from 'react';
 import {View, Text, StyleSheet, FlatList} from 'react-native';
 import {useSelector} from 'react-redux';
 import ProductItem from '../../components/shop/ProductItem';

 const ProductOverview = props => {

    const products = useSelector(state => state.products.availableProducts);

    return <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData => 
    <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onViewDetail={() => {}} onAddToCart={() => {}} />}/>
 };

 ProductOverview.navigationOptions = {
     headerTitle: 'All Products'
 }
 const styles = StyleSheet.create({

 });

 export default ProductOverview;