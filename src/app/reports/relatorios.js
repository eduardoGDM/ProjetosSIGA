import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDoc = ({ selectedAluno }) => {
    const alunosArray = Array.isArray(selectedAluno) ? selectedAluno : [];
  
    return (
      <Document>
      <Page  size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{`Aluno: `}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDoc;
