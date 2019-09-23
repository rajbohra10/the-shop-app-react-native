import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Platform } from 'react-native';
import ProductOverview from '../screens/shop/ProductOverview';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverview
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primary: '',
        },
        headerTintColor: Platform.OS ==='android'? 'white': Colors.primary,
    }
});

export default createAppContainer(ProductsNavigator);

