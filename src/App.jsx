import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]); // Almacena las tareas
  const [newTask, setNewTask] = useState(""); // Para el campo de nueva tarea
  const [editTask, setEditTask] = useState({ id: "", text: "" }); // Para editar una tarea

  // Referencia a la colección de Firestore
  const tasksCollectionRef = collection(db, "tasks");

  // Obtener tareas al cargar el componente
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
    };
    getTasks();
  }, []);

  // Crear una nueva tarea
  const createTask = async () => {
    if (newTask.trim() === "") return; // Evita tareas vacías
    await addDoc(tasksCollectionRef, { text: newTask });
    setNewTask(""); // Limpia el campo de entrada
    // Actualiza la lista de tareas
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
  };

  // Actualizar una tarea
  const updateTask = async () => {
    if (editTask.text.trim() === "") return; // Evita tareas vacías
    const taskDoc = doc(db, "tasks", editTask.id);
    await updateDoc(taskDoc, { text: editTask.text });
    setEditTask({ id: "", text: "" }); // Limpia el campo de edición
    // Actualiza la lista de tareas
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    // Actualiza la lista de tareas
    const data = await getDocs(tasksCollectionRef);
    setTasks(data.docs.map((doc) => ({ id: doc.id, text: doc.data().text })));
  };

  return (
    <div style={styles.container}>
      <h1>CRUD con Firebase Firestore</h1>

      {/* Formulario para agregar una nueva tarea */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={createTask} style={styles.button}>
          Agregar
        </button>
      </div>

      {/* Formulario para editar una tarea */}
      {editTask.id && (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Editar tarea"
            value={editTask.text}
            onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
            style={styles.input}
          />
          <button onClick={updateTask} style={styles.button}>
            Actualizar
          </button>
        </div>
      )}

      {/* Lista de tareas */}
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            {task.text}
            <div>
              <button
                onClick={() => setEditTask({ id: task.id, text: task.text })}
                style={styles.editButton}
              >
                Editar
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={styles.deleteButton}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: "0",
    width: "400px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default App;