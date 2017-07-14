import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    fontSize: 42,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center'
  },
  contentContainer: {
    paddingVertical: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    padding: 20
  },
  colors: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tile: {
    padding: 80,
    flexBasis: 80
  },
  nav: {
    paddingVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
