/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.ignoredYellowBox = ['Remote debugger'];
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { HeaderMenu } from '../components/HeaderMenu';
import HeaderCalendar from '../components/HeaderCalendar';
import { KalendarDay } from '../components/KalendarDay';
import { getKalendarDays } from './../actions/kalendar';
import { connect } from 'react-redux';

const mapStateToProps = state => ({kalendar: state.kalendar});
const mapDispatchToProps = dispatch => ({
  getKalendarDays: () => dispatch(getKalendarDays())
});
type Props = {};
class KalendarScreen extends Component<Props> {
  componentDidMount() {
    const { navigation, getKalendarDays } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      getKalendarDays();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  render() {
    const { days, isFetching } = this.props.kalendar;
    return (
    <View style={styles.view}>
      <Container>
        <HeaderMenu title="Kalendario" {...this.props.navigation} />
        { isFetching 
           ? <Spinner />
           : <Content contentContainerStyle={styles.container}>
              <View>
                <HeaderCalendar />
                <KalendarDay days={days} />
              </View>
            </Content>
        }
      </Container>
    </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(KalendarScreen);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%'
  },
  spinner: {
    marginTop: '50%'
  },
});
