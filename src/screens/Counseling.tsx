import React, {Component, RefObject, createRef} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {preview, robot} from '../assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
interface IProps{
  navigation?:{
    navigate:(path:string) => void,
    goBack:() => void
  }
}
interface IState{
      value1: string
      value2: string
      value3: string
      place:string
      problemBriefly:string
      isInput1:boolean
      isInput2:boolean
      isInput3: boolean
      isAppointmentSelected: boolean
}

interface SS{}
export default class Counseling extends Component<IProps, IState, SS> {
  private placeRef:RefObject<TextInput>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      place: '',
      problemBriefly: '',
      isInput1: false,
      isInput2: false,
      isInput3: false,
      isAppointmentSelected: false,
    };
    this.placeRef = createRef()
  }
  renderItem = (item:{label:string}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  renderRightIcon1 = () => {
    if (this.state.isInput1) {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="up" size={25} />
      );
    } else {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="down" size={25} />
      );
    }
  };
  renderRightIcon2 = () => {
    if (this.state.isInput2) {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="up" size={25} />
      );
    } else {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="down" size={25} />
      );
    }
  };
  renderRightIcon3 = () => {
    if (this.state.isInput3) {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="up" size={25} />
      );
    } else {
      return (
        <AntDesign style={styles.icon} color="#e7c9e4" name="down" size={25} />
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <LinearGradient
                colors={['#dfc7fa', '#62497f', '#60497e']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.9}}
                style={styles.linearGradient}>
                <View style={styles.headerContainer}>
                  <TouchableOpacity
                    style={styles.backHandler}
                    onPress={() => this.props.navigation?.goBack()}>
                    <Ionicons
                      name="chevron-back-sharp"
                      size={30}
                      color="#000000"
                      style={{marginTop: 8}}
                    />
                    <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                  <Image
                    source={preview}
                    style={styles.fishImage}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={styles.headerBtnContainer}>
                  <TouchableOpacity
                    style={[
                      styles.appinStyle,
                      !this.state.isAppointmentSelected
                        ? {backgroundColor: '#7f07a5',}
                        : {backgroundColor: '#ffffff',borderWidth: 2,
                        borderColor: '#7f07a5',},
                    ]}
                    onPress={() =>
                      this.setState({isAppointmentSelected: false})
                    }>
                    <Text
                      style={[
                        styles.appText,
                        !this.state.isAppointmentSelected
                          ? {color: '#ffffff'}
                          : {color: '#7f07a5'},
                      ]}>
                      Appointment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.empyBtn,
                      this.state.isAppointmentSelected
                        ? {backgroundColor: '#7f07a5'}
                        : {backgroundColor: '#ffffff', borderWidth: 2,
                        borderColor: '#7f07a5',},
                    ]}
                    onPress={() =>
                      this.setState({isAppointmentSelected: true})
                    }>
                    <Text
                      style={[
                        styles.appText2,
                        this.state.isAppointmentSelected
                          ? {color: '#ffffff'}
                          : {color: '#7f07a5'},
                      ]}>
                      Emergency
                    </Text>
                  </TouchableOpacity>
                </View>
                <Dropdown
                  style={[styles.dropdown, {marginTop: responsiveHeight(5)}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select A Subject"
                  value={this.state.value1}
                  onChange={item => {
                    this.setState({value1: item.value});
                  }}
                  renderRightIcon={this.renderRightIcon1}
                  renderItem={this.renderItem}
                  onFocus={() => this.setState({isInput1: true})}
                  onBlur={() => this.setState({isInput1: false})}
                />
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Mode of Counseling"
                  value={this.state.value2}
                  onChange={item => {
                    this.setState({value2: item.value});
                  }}
                  renderRightIcon={this.renderRightIcon2}
                  renderItem={this.renderItem}
                  onFocus={() => this.setState({isInput2: true})}
                  onBlur={() => this.setState({isInput2: false})}
                />
                <Dropdown
                  style={[styles.dropdown, {height: 70}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Your Best Time To Connect"
                  value={this.state.value3}
                  onChange={item => {
                    this.setState({value3: item.value});
                  }}
                  renderRightIcon={this.renderRightIcon3}
                  renderItem={this.renderItem}
                  onFocus={() => this.setState({isInput3: true})}
                  onBlur={() => this.setState({isInput3: false})}
                />

                <TextInput
                  placeholder="Place"
                  placeholderTextColor={'#ffffff'}
                  style={styles.placeInput}
                  returnKeyType='next'
                  onSubmitEditing={() => this.placeRef.current?.focus()}
                />
                <TextInput
                ref={this.placeRef}
                  multiline
                  placeholder={`Briefly tell us your problem...  Type \nHere`}
                  placeholderTextColor={'#ffffff'}
                  style={[styles.multiInput, {marginTop: responsiveHeight(3)}]}
                />

                <TouchableOpacity style={styles.bottomRobot}>
                  <Image source={robot} style={styles.robotImage} />
                  <Text style={styles.chatBot}>Aj Chat</Text>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </SafeAreaView>

    );
  }
}
let styles = StyleSheet.create({
  mainContainer:{flex:1},
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom:-4
  },
  headerContainer:{flexDirection: 'row'},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  backHandler: {flexDirection: 'row', alignItems: 'center'},
  backText: {
    color: '#000000',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: 22,
    marginLeft: -5,
  },
  fishImage: {width: 200, height: 150, marginLeft: responsiveWidth(11)},
  appinStyle: {
    padding: responsiveWidth(3),
    borderRadius: 20,
    width: responsiveWidth(36),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(2),
  },
  appText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  empyBtn: {
    padding: responsiveWidth(3),
    borderRadius: 20,
    width: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(2),
    marginLeft: responsiveWidth(3),
  },
  appText2: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  dropdown: {
    margin: 16,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e7c9e4',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#e7c9e4',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  iconStyle: {
    width: 20,
    height: 40,
    tintColor: 'pink',
    marginRight: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeInput: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#e7c9e4',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    marginTop: responsiveHeight(1.6),
    fontSize: 19,
    color: '#e7c9e4',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  multiInput: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#e7c9e4',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    marginTop: responsiveHeight(1.6),
    fontSize: 19,
    color: '#e7c9e4',
    fontFamily: 'PlayfairDisplay-SemiBold',
    height: responsiveHeight(12),
  },
  bottomRobot: {
    width: responsiveWidth(20),
    height: responsiveHeight(9),
    borderRadius: 60,
    backgroundColor: '#a66a94',
    position: 'absolute',
    bottom: responsiveHeight(0.5),
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  robotImage: {width: 45, height: 45},
  chatBot: {
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: 12,
  },
  headerBtnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  }
});
