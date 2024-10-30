import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const ChatHeader = ({ BotName , BotLogo , onHistoryPress , startNewChat}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.ChatHeader}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.backButton}
            >
                <FontAwesome name="chevron-left" size={18} color="black" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={styles.botLogo} source={BotLogo} />
                <Text style={styles.ChatHeaderText}>{BotName}</Text>
            </View>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity style={styles.newChatButton} onPress={startNewChat}>
          <FontAwesome name="plus" size={18} color="black" />
        </TouchableOpacity>
            <TouchableOpacity 
                onPress={onHistoryPress}
                style={styles.backButton}
            >
                <FontAwesome6 name="clock-rotate-left" size={19} color="black" />
            </TouchableOpacity>
             </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ChatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    botLogo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    ChatHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    backButton: {
      padding: 8,
    },
    newChatButton: {
      borderRadius: 20,
      marginRight: 40,
    },
  });
  

export default ChatHeader;