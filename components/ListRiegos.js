import React, {Component} from 'react';
import { fromEither} from './../utils';
import { StyleSheet, Text, View, Image } from 'react-native';
import images from './../assets/images';
import moment from 'moment';


import {Content, Button} from 'native-base';
const Props = {
  size:  13
};
export class ListRiegos extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  getItems() {
    const {data = []} = this.props;
    const {limit = 16, page = 1} = this.state;
    const from = ( page - 1) * limit;
    const to = page * limit; 
    return data.slice(from, to);
  }
  gotoPage(current) {
    this.setState({ page: current });
  } 
  render() {
    const {getPaginagtion }  = this.props;
    const {title ='Los últimos riegos', page = 1} = this.state;
    const pagination = getPaginagtion(page);
    const backgroundColor = fromEither('#F4F6F6')('white')(x => x % 2);
    const borderBottomColor = fromEither('#D6DBDF')('white')(x => x % 2);
    return (
      <Content contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.list}>
          {this.getItems().map(({riego, date, isDone}, i) =>
            <View style={{ ...styles.listItem, backgroundColor: backgroundColor(i), borderBottomColor: borderBottomColor(i) }}
                key={`${i}__como___view`}>
              <Image
                style={styles.ico}
                source={images.plant}/>
              {isDone
                ? <Image 
                style={styles.check}
                source={images.checked}/>
                : <Image 
                  style={styles.check}
                  source={images.wait}/>
                }
                <Content contentContainerStyle={styles.texts}>
                  <Text style={styles.textRiego}>{riego}</Text>
                  <Text style={styles.textDate}>
                  {moment(new Date(date)).format('DD/MM/YYYY H:mm:ss')}</Text>
                </Content>
            </View>
          )}
        </View>
        <View style={styles.pagination}>
          {pagination.map(({current, text}) => 
            <Button 
              onPress = {() => this.gotoPage(current)}
              style={styles.button}
              info={page!==current} small
              id={current+' ___'}>
              <Text style={styles.paginationText}>{text}</Text>
            </Button>
          )}
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10
  },
  list: {
    width: '80%',
    marginLeft: '10%',
    marginBottom: 5,
    minHeight: 360,
    marginBottom: 20
  },
  listItem: {
    paddingBottom: 15,
    paddingTop: 8,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1
  },
  check: {
    position: 'absolute',
    top: 10,
    left: 35,
    zIndex: 100,
    width:16,
    height:16
  },
  textDate: {
    fontFamily: "ostrich-regular",
    paddingLeft: 15
  },
  textRiego: {
    fontFamily: "ostrich-regular",
    paddingLeft: 15,
    lineHeight: 28,
    fontSize: 20
  },
  title: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
  },  
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  ico: {
    width: 45,
    height: 45,
    paddingLeft: 8
  },
  text: {
    color: '#778890'
  },
  button: {
    marginRight: 2,
    paddingLeft: 8,
    paddingRight: 8
  },
  paginationText: {
    fontFamily: "PT_Sans-Narrow-Web-Regular",
    fontSize: 22,
    color:'#fff',
    paddingLeft: 6,
    paddingRight: 6,
  }
  
});