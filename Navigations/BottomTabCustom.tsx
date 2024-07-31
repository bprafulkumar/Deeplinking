import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function BottomTabCustom({ state, descriptors, navigation }:any) {
    const renderLabels = (label:string,isFocused:boolean) => {
        if(label === "Home"){
            return(
              <View style={styles.bottomCustom}>
                <AntDesign style={styles.icon} color={isFocused? "#e7c9e4":"#96799f"} name="home" size={responsiveWidth(7)} />
                <Text style={[styles.tabLabel,isFocused?{color:"#e7c9e4"}:{color:"#96799f"}]}>Home</Text>
              </View>
            )
        }else if(label === "Activities"){
            return(
              <View style={styles.bottomCustom}>
              <Feather style={styles.icon} color={isFocused? "#e7c9e4":"#96799f"} name="pie-chart" size={responsiveWidth(7)} />
              <Text style={[styles.tabLabel,isFocused?{color:"#e7c9e4"}:{color:"#96799f"}]}>Activites</Text>
          </View>
            )
        }else if(label === "Counseling"){
            return (
              <View style={styles.bottomCustom}>
              <MaterialIcons style={styles.icon} color={isFocused? "#e7c9e4":"#96799f"} name="people-alt" size={responsiveWidth(7)} />
              <Text style={[styles.tabLabel,isFocused?{color:"#e7c9e4"}:{color:"#96799f"}]}>Counseling</Text>
          </View>
            )
        }else if(label === "Helpline"){
            return(
              <View style={styles.bottomCustom}>
              <SimpleLineIcons style={styles.icon} color={isFocused? "#e7c9e4":"#96799f"} name="earphones-alt" size={responsiveWidth(7)} />
              <Text style={[styles.tabLabel,isFocused?{color:"#e7c9e4"}:{color:"#96799f"}]}>Helpline</Text>
             </View>
            )
        }
    }
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: { key: string | number; name: string; params: {}; }, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={1}
            onLongPress={onLongPress}
            style={styles.bottomContainerBtn}
          >
            {renderLabels(label,isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainerBtn: { flex: 1,backgroundColor:"#60497e",height:responsiveHeight(10),alignSelf:"center",justifyContent:"center",alignItems:"center" },
    icon: {
        marginRight: 5,
        marginBottom:10
      },
      bottomCustom:{alignItems:"center",justifyContent:"center"},
      tabLabel:{
        fontFamily:"PlayfairDisplay-Regular"
      }
})


