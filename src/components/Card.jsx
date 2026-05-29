import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Card = ({ imageSource, title, subtitle, details, onPress, children }) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.row}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {details && <Text style={styles.details}>{details}</Text>}
        </View>
      </View>
      {children && <View style={styles.actions}>{children}</View>}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  details: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

export default Card;