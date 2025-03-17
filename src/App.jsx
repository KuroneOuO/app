import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [items, setItems] = useState([]); // Almacena la lista de elementos
  const [newItem, setNewItem] = useState({ name: "", description: "" }); // Para agregar nuevos elementos
  const [editItem, setEditItem] = useState(null); // Para editar elementos

  // Referencia a la colección de Firestore
  const itemsCollectionRef = collection(db, "items");

  // Leer todos los elementos
  const fetchItems = async () => {
    const data = await getDocs(itemsCollectionRef);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Agregar un nuevo elemento
  const addItem = async () => {
    await addDoc(itemsCollectionRef, newItem);
    setNewItem({ name: "", description: "" }); // Limpiar el formulario
    fetchItems(); // Actualizar la lista
  };

  // Editar un elemento
  const startEdit = (item) => {
    setEditItem(item);
  };

  const updateItem = async () => {
    const itemDoc = doc(db, "items", editItem.id);
    await updateDoc(itemDoc, editItem);
    setEditItem(null); // Limpiar el formulario de edición
    fetchItems(); // Actualizar la lista
  };

  // Eliminar un elemento
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "items", id);
    await deleteDoc(itemDoc);
    fetchItems(); // Actualizar la lista
  };

  return (
    <div>
      <h1>CRUD con Firebase y React</h1>

      {/* Formulario para agregar un nuevo elemento */}
      <div>
        <h2>Agregar nuevo elemento</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={addItem}>Agregar</button>
      </div>

      {/* Formulario para editar un elemento */}
      {editItem && (
        <div>
          <h2>Editar elemento</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button onClick={updateItem}>Actualizar</button>
          <button onClick={() => setEditItem(null)}>Cancelar</button>
        </div>
      )}

      {/* Lista de elementos */}
      <div>
        <h2>Lista de elementos</h2>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => startEdit(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;