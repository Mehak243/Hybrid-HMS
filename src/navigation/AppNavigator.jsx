import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import ApiDemoScreen from '../screens/ApiDemoScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import LoginScreen from '../screens/LoginScreen';
import NursesScreen from '../screens/NursesScreen';
import PatientsScreen from '../screens/PatientsScreen';
import RecordsScreen from '../screens/RecordsScreen';
import StaffScreen from '../screens/StaffScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer navigator for Main App Flow
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Admin Dashboard' }}/>
      <Drawer.Screen name="Doctors" component={DoctorsScreen} />
      <Drawer.Screen name="Staff" component={StaffScreen} />
      <Drawer.Screen name="Nurses" component={NursesScreen} />
      <Drawer.Screen name="Patients" component={PatientsScreen} />
      <Drawer.Screen name="Appointments" component={AppointmentsScreen} />
      <Drawer.Screen name="Records" component={RecordsScreen} />
      <Drawer.Screen name="ApiDemo" component={ApiDemoScreen} options={{ title: 'Live API Demo' }} />
    </Drawer.Navigator>
  );
}

// Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      {/* Drawer replacing Stack after login */}
      <Stack.Screen 
        name="MainApp" 
        component={MainDrawer} 
        options={{ headerShown: false, gestureEnabled: false }} 
      />
    </Stack.Navigator>
  );
}