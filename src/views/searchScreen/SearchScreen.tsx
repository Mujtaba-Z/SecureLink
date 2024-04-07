import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async (query) => {
    // Implement search logic here to update searchResults
    // For example, query the Firestore 'users' collection
  };

  const startChatWithUser = (userId) => {
    // Check if a chat with this user already exists or create a new one
    // Then navigate to the chat screen
  };

  return (
    <View>
      <TextInput
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => searchUsers(searchQuery)}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startChatWithUser(item.id)}>
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;
