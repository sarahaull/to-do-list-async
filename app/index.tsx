import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
    const [todo, setTodo] = useState<string>("");
    const [listTodo, setListTodo] = useState<string[]>([]);

// tambah todo
const simpanTodo = async () => {
    if (!todo) return;

    const data = [...listTodo, todo];
    setListTodo(data);
    setTodo("");

    await AsyncStorage.setItem("todo", JSON.stringify(data));
};

// ambil todo
const ambilTodo = async () => {
    const data = await AsyncStorage.getItem("todo");
    if (data) setListTodo(JSON.parse(data));
};

// hapus semua
const hapusTodo = async () => {
    await AsyncStorage.removeItem("todo");
    setListTodo([]);
};

useEffect(() => {
    ambilTodo();
}, []);


     return (
        <SafeAreaView className="flex-1 bg-gray-100 px-5 pt-6">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-5 py-5 px-2">
                To Do List 
            </Text>

            <TextInput
                placeholder="Masukkan Nama Lengkap"
                value={todo}
                onChangeText={setTodo}
                className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base mb-4"
                placeholderTextColor="#9CA3AF"
            />

            <View className="space-y-2 mb-6 px-6 py-4">
                <View className="rounded-xl overflow-hidden">
                    <Button title="Simpan " onPress={simpanTodo} color="#93BD57" />
                </View>
                <View className="rounded-xl overflow-hidden">
                    <Button title="Hapus Semua" onPress={hapusTodo} color= "#980404" />
                </View>
            </View>

            {listTodo.map((item: string, index: number) => (
                <View
                    key={index}
                    className="bg-white rounded-xl px-4 py-4 mb-3 shadow border-red-950"
                >
                    <Text className="text-black text-bold text-base bg-">
                        {index + 1}. {item}
                    </Text>
                </View>
            ))}
        </SafeAreaView>
    );
}














