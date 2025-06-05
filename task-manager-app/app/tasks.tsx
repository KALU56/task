import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = 'TASKS';

export default function TasksScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setTasks(JSON.parse(stored));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: task.trim(), completed: false },
    ]);
    setTask('');
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Task Manager</Text>

      <TextInput
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="ADD TASK" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
            No tasks yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              onPress={() => toggleComplete(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completed,
                ]}
              >
                {item.completed ? '✔️ ' : '⬜ '} {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text>
          Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length} | Remaining: {tasks.filter(t => !t.completed).length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 50, // ✅ Space added above header
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  delete: {
    marginLeft: 12,
    fontSize: 18,
  },
  summary: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
});
