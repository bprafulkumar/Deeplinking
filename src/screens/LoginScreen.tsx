import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component, RefObject, createRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppLogo, box, checkBox, googlePlus} from '../assets';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface IProps {
  navigation?: {
    navigate: (path: string) => void;
  };
}

interface IState {
  changeClickBox: boolean;
  email: string;
  password: string;
  isPasswordVisible: boolean;
  emailError: string;
  passwordError: string;
}


export default class LoginScreen extends Component<IProps, IState> {
  private passwordRef:RefObject<TextInput>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      changeClickBox: false,
      email: '',
      password: '',
      isPasswordVisible: false,
      emailError: '',
      passwordError: '',
    };
    this.passwordRef = createRef()
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '1022989904177-5ht28cg2ml38mqss1vqn88bh8pjkajga.apps.googleusercontent.com',
    });
  }

  validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password: string) {
    return password.length >= 6;
  }

  handleLogin = async () => {
    const {email, password} = this.state;
    let isValid = true;

    if (email === '') {
      this.setState({emailError: 'Please enter your email'});
      isValid = false;
    } else if (!this.validateEmail(email)) {
      this.setState({emailError: 'Please enter a valid email'});
      isValid = false;
    } else {
      this.setState({emailError: ''});
    }

    if (password === '') {
      this.setState({passwordError: 'Please enter your password'});
      isValid = false;
    } else if (!this.validatePassword(password)) {
      this.setState({passwordError: 'Password should be at least 6 characters'});
      isValid = false;
    } else {
      this.setState({passwordError: ''});
    }

    if (isValid) {
      try {
        const response = await fetch(
          'https://json-placeholder.mock.beeceptor.com/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: email,
              password: password,
            }),
          },
        );
        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        if (data.token) {
          this.props.navigation?.navigate('BottomNavigation');
        }
      } catch (error) {
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
     let userData =  await GoogleSignin.signIn();
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error?.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      }
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({
      changeClickBox: !prevState.changeClickBox,
    }));
  };

  render() {
    const {changeClickBox, email, password, isPasswordVisible, emailError, passwordError} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient
          start={{x: 0.2, y: 0.12}}
          end={{x: 0.4, y: 0.8}}
          colors={['#dfc7fb', '#62497f']}
          style={styles.container}
          locations={[0.01, 0.25]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{flexGrow: 1}}>
              <Image source={AppLogo} resizeMode="contain" style={styles.appIconImage} />

              <TextInput
                placeholderTextColor="#fad9d9"
                value={email}
                onChangeText={(event) => this.setState({email: event, emailError: ''})}
                style={[styles.inputStyle, styles.emailInput]}
                placeholder="Email"
                onFocus={() => this.setState({emailError: ''})}
                returnKeyType='next'
                onSubmitEditing={() => this.passwordRef.current?.focus()}
              />
              {emailError ? (
                <Text testID="usernameerrortext" style={styles.error_text_signin}>
                  {emailError}
                </Text>
              ) : null}
              <View>
                <TextInput
                  ref={this.passwordRef}
                  value={password}
                  placeholderTextColor="#fad9d9"
                  onChangeText={(event) => this.setState({password: event, passwordError: ''})}
                  style={styles.inputStyle}
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  onFocus={() => this.setState({passwordError: ''})}
                />
                <TouchableOpacity style={styles.passwordToggle} onPress={() => this.setState({isPasswordVisible: !isPasswordVisible})}>
                  <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={25} color="#fad9d8" />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text testID="passworderrortext" style={styles.error_text_signin}>
                  {passwordError}
                </Text>
              ) : null}

              <View style={styles.miniContainer}>
                <View style={styles.rememberMeContainer}>
                  <Text style={styles.rememberMeText}>Remember Me</Text>
                  <TouchableOpacity onPress={this.handleClick}>
                    <Image
                      style={styles.checkBoxImage}
                      resizeMode="contain"
                      source={!changeClickBox ? box : checkBox}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>

              <TouchableOpacity style={styles.signinBtn} onPress={this.handleLogin}>
                <Text style={styles.signinBtnText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._signIn} style={styles.googleSignInBtn}>
                <Image source={googlePlus} resizeMode="contain" style={styles.googlePlusIcon} />
                <Text style={styles.googleSignInBtnText}>Login with Gmail</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.anonSignup}>Anonymous Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: responsiveHeight(5),
  },
  inputStyle: {
    width: responsiveWidth(80),
    height: responsiveHeight(7),
    borderWidth: 1,
    alignSelf: 'center',
    color: '#fad9d9',
    borderColor: '#fad9d9',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(3),
    fontFamily: 'PTSerif-Bold',
    fontSize: responsiveFontSize(2.2),
  },
  emailInput: {
    marginBottom: responsiveHeight(1.5),
    marginTop: responsiveHeight(5),
  },
  miniContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(15),
    alignItems: 'center',
  },
  signinBtn: {
    backgroundColor: '#fad9d9',
    width: responsiveWidth(22),
    height: responsiveHeight(6),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
  },
  signinBtnText: {
    color: '#62497f',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: responsiveFontSize(2.1),
  },
  appIconImage: {
    alignSelf: 'center',
    marginTop: responsiveHeight(8),
    height: responsiveHeight(20),
    width: responsiveWidth(55),
  },
  anonSignup: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: responsiveFontSize(2.4),
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  signupText: {
    color: '#fff',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: responsiveFontSize(2.4),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    textDecorationLine: 'underline',
  },
  error_text_signin: {
    color: 'red',
    alignSelf: 'flex-end',
    paddingBottom: responsiveHeight(2),
    marginRight: responsiveWidth(10),
    fontSize: responsiveFontSize(1.9),
  },
  passwordToggle: {
    position: 'absolute',
    right: responsiveWidth(16),
    top: responsiveHeight(2),
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#fad9d9',
    fontFamily: 'PTSerif-Bold',
    fontSize: responsiveFontSize(1.8),
  },
  checkBoxImage: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    tintColor:"#ffffff"
  },
  forgotPasswordText: {
    color: '#fad9d9',
    fontFamily: 'PTSerif-Bold',
    fontSize: responsiveFontSize(1.8),
  },
  googleSignInBtn: {
    backgroundColor: '#fad9d9',
    width: responsiveWidth(50),
    height: responsiveHeight(6),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
  googleSignInBtnText: {
    color: '#62497f',
    fontFamily: 'PlayfairDisplay-SemiBold',
    fontSize: responsiveFontSize(2),
  },
  googlePlusIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    tintColor:"#62497f"
  },
});
