import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert(
          "Novo hábito",
          "Digite o nome do hábito e selecione a recorrência do hábito"
        );
      }
      await api.post("/habits", {
        title,
        weekDays,
      });
      setTitle("");
      setWeekDays([]);
      Alert.alert("Novo hábito", "Hábito criado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível criar o novo hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />
        <Text className="text-white mt-6 font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="text-white mt-6 font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 focus:border-green-300 border-zinc-800"
          placeholder="Exercícios, dormir bem, etc.."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        ></TextInput>
        <Text className="text-white mt-4 mb-3 font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          ></Checkbox>
        ))}

        <TouchableOpacity
          className="bg-green-600 flex-row rounded-md mt-6 w-full h-14 items-center justify-center "
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
