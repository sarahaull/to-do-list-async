import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>To Do List</Text>

            <TextInput
                placeholder="Masukkan Nama Lengkap"
                value={todo}
                onChangeText={setTodo}
                style={styles.input}
                placeholderTextColor="#9CA3AF"
            />

            <View style={styles.buttonWrapper}>
                <View style={styles.button}>
                    <Button title="Simpan" onPress={simpanTodo} color="#93BD57" />
                </View>
                <View style={styles.button}>
                    <Button title="Hapus Semua" onPress={hapusTodo} color="#980404" />
                </View>
            </View>

            {listTodo.map((item: string, index: number) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardText}>
                        {index + 1}. {item}
                    </Text>
                </View>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#1F2933",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    button: {
        marginVertical: 6,
        borderRadius: 12,
        overflow: "hidden",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        elevation: 2, // bayangan Android
    },
    cardText: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
    },
});
