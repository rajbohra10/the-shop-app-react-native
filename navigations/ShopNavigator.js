import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import ProductOverview from "../screens/shop/ProductOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Orders from "../screens/shop/Orders";
import Cart from "../screens/shop/Cart";
import UserProducts from '../screens/user/UserProducts';
import EditProduct from '../screens/user/EditProduct';
import Colors from "../constants/Colors";

const defNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverview,
    ProductDetail: ProductDetail,
    Cart: Cart
  },
  {
    defaultNavigationOptions: defNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: Orders
  },
  {
    defaultNavigationOptions: defNavOptions
  }
);

const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProducts,
      EditProduct: EditProduct
    },
    {
      defaultNavigationOptions: defNavOptions
    }
  );

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
