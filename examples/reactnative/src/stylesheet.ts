import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  listItemChild: {
    flex: 1,
    maxWidth: 100,
    borderWidth: 1,
    margin: 5
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
    borderWidth: 1,
    maxHeight: 200,
    maxWidth: '80%',
    marginLeft: '10%',
    marginTop: 200
  },
});

export default styles;