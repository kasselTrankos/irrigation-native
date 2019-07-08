/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Modal, TimePickerAndroid } from 'react-native';
import { Button, Text, Container, Content, Spinner } from 'native-base';
import { HeaderMenu } from '../components/HeaderMenu';
import { RangeDatesText } from '../components/RangeDatesText';
import { DurationSetter } from '../components/DurationSetter';
import { DateSelectorRange } from '../components/DateSelectorRange';
import moment from 'moment';
import {getConfig, setDuration, putDuration} from './../actions/config';
import {postKalendar} from './../actions/kalendar';
import { connect } from 'react-redux';

const mapStateToProps = state => ({config: state.config});
const mapDispatchToProps = dispatch => ({
  getConfig: () => dispatch(getConfig()),
  setDuration: value => dispatch(setDuration(value)),
  putDuration: value => dispatch(putDuration(value)),
  postKalendar: value => dispatch(postKalendar(value))
});
type Props = {};
class ConfigScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      info: 'Configura tus riegos', 
      showKalendar: false,
      start: null, 
      end: null,
      hour: '',
      minute: '',
      textDuration: 'Duración (max 60s):'
    };
  }
  componentDidMount() {
    const { navigation, getConfig } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      getConfig();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  setDuration(duration) {
    this.setState(() => ({duration}));
  }
  async showTimer() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        mode: 'clock',
        is24Hour: true, // Will display '2 PM'
      });
      if (action === TimePickerAndroid.timeSetAction) {
        const m = minute <= 9 ? `0${minute}` : minute;
        const H  = hour <= 9 ? `0${hour}` : hour;
        this.setState(()=> ({hour: H, minute: m}));
      }
      if(action === TimePickerAndroid.dismissedAction) {
        this.setState(()=> ({hour: '08', minute: '00'}));
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  setRange(start, end) {
    this.setState(() => ({
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD')
    }));
  }
  async closeAndTimmer() {
    this.setState(()=>({showKalendar: false}));
    await this.showTimer();
  }
  async setRangeKalendar (start, end) {
    console.log('startt', start.format('YYYY-MM-DD'), 'end', end.format('YYYY-MM-DD'));
    this.setState(() => ({
      showKalendar: false,
      start: moment(start).format('YYYY-MM-DD'),
      end: end ? moment(end).format('YYYY-MM-DD') : moment(start).format('YYYY-MM-DD')
    }));
  }

  render() {
    const {config: {duration, _id, isFetching},
      setDuration, putDuration, postKalendar} = this.props;
    const {showKalendar, start, end, hour, minute, info, textDuration} = this.state;
    return (
      <View style={styles.view}>
        <Modal
          visible={showKalendar}>
          <View style={{height:'90%'}}>
            <DateSelectorRange
              setRange = {this.setRange.bind(this)} />
          </View>  
          <View style={styles.viewButtonsModal}>
            <Button
              style={styles.button}
              onPress={()=>this.closeAndTimmer()} 
              success>
              <Text>Aceptar</Text>
            </Button>
            <Button
              style={styles.button}
              onPress={()=>this.setState(()=>({showKalendar: false}))} 
              danger>
              <Text>Cancelar</Text>
            </Button>
          </View>
        </Modal>
        <Container>
          <HeaderMenu title="Riego en Casa" {...this.props.navigation} />
          { isFetching
          ? <Spinner style={styles.spinner}/> 
          :  <Content contentContainerStyle={styles.container}>
              <Text style={styles.title}>{info}</Text>
              <Text style={styles.label}>{textDuration}</Text>
              <DurationSetter 
                duration={duration}
                setDuration={value => setDuration(value)}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={Object.assign({}, styles.label, {lineHeight:40})}>Cada día en la hora</Text>
                <Button
                  style={Object.assign({}, styles.button, {marginLeft: '5%'})}
                  onPress={()=>this.setState(() => ({showKalendar: true}))}
                  info>
                  <Text>Scheduler</Text>
                </Button>
              </View>
              <RangeDatesText
                start={start}
                end={end}
                hour={hour}
                minute={minute}
               />
              <View style={Object.assign({}, styles.center, {marginTop: 50})}>
                <Button
                  onPress={
                    () => {
                      putDuration({_id, duration});
                      postKalendar({start, end, hour, minute, duration});
                    }
                  }
                  style={styles.button}
                  info>
                  <Text>Actualizar</Text>
                </Button>
              </View>
            </Content>
          }
        </Container>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewButtonsModal: {
    paddingTop: 8 ,
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  spinner: {
    marginTop: '50%'
  },
  label: {
    marginLeft: "2%",
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 21,
  },
  center: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    marginRight: 10,
    marginBottom: 10
  },
});
