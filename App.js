import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

const App = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const timeSlots = [
    { id: 1, time: '09:00 AM', date: '2024-01-01', available: true },
    { id: 2, time: '10:00 AM', date: '2024-01-01', available: true },
    // Add more time slots as needed
  ];

  const handleSlotPress = (slot) => {
    // Update availability status and re-render the list
    const updatedSlots = timeSlots.map((s) => (s.id === slot.id ? { ...s, available: !s.available } : s));
    setSelectedSlot(slot.id);
  };

  const handleSubmit = () => {
    if (!name || !email || selectedSlot === null) {
      alert('Please fill in all fields');
      return;
    }

    // Perform submission logic here
    alert(`Booking Successful!\nName: ${name}\nEmail: ${email}\nSlot: ${selectedSlot}`);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSelectedSlot(null);
  };

  return (
    <View>
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSlotPress(item)}>
            <Text>{item.time} - {item.date} - {item.available ? 'Available' : 'Booked'}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedSlot !== null && (
        <View>
          <Text>Selected Slot: {selectedSlot}</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

export default App;
