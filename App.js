import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getQuizzes = async () => {
    try {
      const response = await fetch("https://8689-182-2-41-142.ngrok-free.app/api/quizzes/");
      const json = await response.json();
      setData(json.dataQuiz);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleAnswerPress = (correctKey, selectedKey) => {
    if (correctKey === selectedKey) {
      Alert.alert("Jawaban Benar", "Selamat, jawaban Anda benar!");
    } else {
      Alert.alert("Jawaban Salah", "Maaf, jawaban Anda salah. Silakan coba lagi.");
    }
  };

  const renderQuizItem = ({ item }) => (
    <View>
      <View style={styles.questBox}>
        <View style={styles.innerBox}>
          <Text style={styles.quizText}>{item.quiz}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleAnswerPress(item.key, "a")} style={styles.answerButton}>
        <Text style={styles.answerText}>{item.a}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(item.key, "b")} style={styles.answerButton}>
        <Text style={styles.answerText}>{item.b}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(item.key, "c")} style={styles.answerButton}>
        <Text style={styles.answerText}>{item.c}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(item.key, "d")} style={styles.answerButton}>
        <Text style={styles.answerText}>{item.d}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Ulangan Harian</Text>
      <View style={{ paddingBottom: 100 }}>
        {isLoading ? <ActivityIndicator style={styles.loading} /> : <FlatList data={data} keyExtractor={({ id }) => id.toString()} renderItem={renderQuizItem} ItemSeparatorComponent={() => <View style={styles.separator}></View>} />}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFBB64",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quizItem: {
    borderWidth: 2,
    borderColor: "#FFB996",
    padding: 10,
    marginVertical: 15,
    borderRadius: 8,
  },
  questBox: {
    backgroundColor: "#E6A4B4",
    borderRadius: 10,
    marginBottom: 20,
    height: 160,
  },
  innerBox: {
    backgroundColor: "#F5EEE6",
    margin: 8,
    borderRadius: 10,
    padding: 14,
    height: 140,
    justifyContent: "center",
  },
  quizText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#3E3232",
    justifyContent: "center",
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "#ffffff",
    elevation: 2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  answerText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    padding: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 40,
    color: "white",
  },
  separator: {
    marginVertical: 15,
    height: 10,
  },
});
