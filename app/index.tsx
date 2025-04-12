import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [essentials, setEssentials] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);
  const [weekly, setWeekly] = useState(0);

  useEffect(() => {
    const parsedValue = parseFloat(inputValue.replace(",", "."));
    if (!isNaN(parsedValue)) {
      setEssentials(parsedValue * 0.5);
      setWants(parsedValue * 0.3);
      setSavings(parsedValue * 0.2);
      setWeekly((parsedValue * 0.3) / 4);
    } else {
      setEssentials(0);
      setWants(0);
      setSavings(0);
      setWeekly(0);
    }
  }, [inputValue]);

  const formatCurrencyBR = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.app}>
        <StatusBar style="light" backgroundColor="#0f0f1a" />
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.wrapper}>
          <View style={styles.app__content}>
            <Text style={styles.content__title}>50 30 20</Text>
            <Text style={styles.content__subtitle}>Sugestão de Orçamento</Text>

            <View style={styles.summary}>
              <View style={styles.summary__item}>
                <Text style={styles.summary__label}>🏠 Essenciais</Text>
                <Text style={styles.summary__value}>
                  R$ {formatCurrencyBR(essentials)}
                </Text>
              </View>
              <View style={styles.summary__item}>
                <Text style={styles.summary__label}>🎉 Lazer</Text>
                <Text style={styles.summary__value}>
                  R$ {formatCurrencyBR(wants)}
                </Text>
              </View>
              <View style={styles.summary__item}>
                <Text style={styles.summary__label}>💰 Investimentos</Text>
                <Text style={styles.summary__value}>
                  R$ {formatCurrencyBR(savings)}
                </Text>
              </View>
            </View>

            <View style={styles.weekly}>
              <Text style={styles.weekly__title}>Gastos Semanais</Text>
              <Text style={styles.weekly__value}>
                R${" "}
                <Text style={styles.weekly__highlight}>
                  {formatCurrencyBR(weekly)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.input__field}
            placeholder="Insira o valor 💵"
            keyboardType="numeric"
            placeholderTextColor="#999"
            value={inputValue}
            onChangeText={setInputValue}
            selectionColor={"transparent"}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0f0f1a",
  },
  wrapper: {
    justifyContent: "center",
    flexGrow: 1,
  },
  app__content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 10,
  },

  content__title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#9b5de5",
  },
  content__subtitle: {
    color: "#f1f1f1",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  summary: {
    gap: 18,
    width: "80%",
  },
  summary__item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summary__label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00f5d4",
  },
  summary__value: {
    fontSize: 16,
    color: "#f15bb5",
  },

  weekly: {
    marginTop: 40,
    backgroundColor: "#00bbf9",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "100%",
  },
  weekly__title: {
    color: "#fff",
    fontWeight: "600",
  },
  weekly__value: {
    color: "#fff",
    fontSize: 16,
  },
  weekly__highlight: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },

  input: {
    padding: 16,
    backgroundColor: "#1e1e2f",
    borderTopWidth: 1,
    borderTopColor: "#2a2a40",
  },
  input__field: {
    backgroundColor: "32c2c3c",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
    color: "#fff",
    textAlign: "center",
  },
});
