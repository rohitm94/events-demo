import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
// import * as cartActions from '../../store/actions/cart';

const EventDetailScreen = props => {
  const eventId = props.navigation.getParam('eventId');
  const selectedEvent = useSelector(state =>
    state.events.availableEvents.find(prod => prod.id === eventId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedEvent.imageUrl }} />
      {/* <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="RSVP"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedEvent));
          }}
        />
      </View> */}
      <Text style={styles.price}>${selectedEvent.seats.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedEvent.description}</Text>
    </ScrollView>
  );
};

EventDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('eventTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default EventDetailScreen;
