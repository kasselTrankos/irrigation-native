/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { HeaderMenu } from '../components/HeaderMenu';
import { ListRiegos } from '../components/ListRiegos';
import {getPagination} from './../utils/pagination';
import {getRiegos} from './../actions/riego';
import { connect } from 'react-redux';


const mapStateToProps = state => ({riegos: state.riegos});
const mapDispatchToProps = dispatch => ({
  getRiegos: () => dispatch(getRiegos())
});
type Props = {};
class ListRiegosScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { info: 'Estos son los riegos realizados', limit: 5, size: 4 };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.getRiegos();
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }
  render() {
    const { size, limit} = this.state;
    const { riegos } = this.props;
    return (
    <View style={styles.view}>
      <Container>
        <HeaderMenu title="Listado" {...this.props.navigation} />
        { riegos.isFetching
        ?<Spinner style={styles.spinner}/> 
        : <Content contentContainerStyle={styles.container}>
            <ListRiegos 
              data={riegos.data} 
              limit={limit} 
              page={1} 
              getPaginagtion={getPagination(riegos.data.length)(size)(limit)} />
          </Content>
        }
      </Container>
    </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListRiegosScreen);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginTop: '50%'
  },
  container: {
    width: '100%'
  },
  center: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginRight: 10,
    marginBottom: 10
  }
});
