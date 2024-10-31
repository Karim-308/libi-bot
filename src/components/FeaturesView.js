import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from './Logo.js';
import { LinearGradient } from 'expo-linear-gradient';

function FeaturesView({ navigation }) { 
  return (<>
  <TouchableOpacity 
      onPress={() => navigation.navigate('Chat', {
        BotName: "ChatGPT",
        BotLogo: require("../../assets/chatgpt-icon.png")  // Require the image here
      })}
      activeOpacity={0.7}
    >
    <View style={[styles.FeatureCard, {backgroundColor:"#22624b"}]}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Chat With ChatGPT</Text>
                    <Text style={styles.description}>
                        AI language model that assists with tasks like answering questions, coding help, and providing explanations.
                    </Text>
                </View>
                <View style={styles.FeatureLogo}>
                    <Image source={require("../../assets/chatgpt-icon.png")} style={styles.logo} />
                </View>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
        onPress={() => navigation.navigate('Chat' , {
            BotName:"Gemini-Vision", 
            BotLogo:require("../../assets/dalle.png")
        })}
        activeOpacity={0.7}
      >
                <LinearGradient 
                    colors={['#0000FF', '#FF1493', '#8A2BE2']} // Blue to Pink to Violet
                    style={styles.FeatureCard}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 4 }}
                 >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Get Createive with Dall-E</Text>
                    <Text style={styles.description}>
                        Transform text descriptions into vivid, unique images, bringing creative ideas to life with AI-generated visuals.
                    </Text>
                </View>
                <View style={[ styles.FeatureLogo]}>
                    <Image source={require("../../assets/openai.png")} style={styles.logo} />
                </View>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
      onPress={() => navigation.navigate('Chat', {
        BotName: "Gemini",
        BotLogo: require("../../assets/google.png")  // Require the image here
      })}
      activeOpacity={0.7}
    >
            <View style={styles.FeatureCard}>
                <View style={styles.textContainer}>
                    <Text style={[styles.title , {color:"black"} ]}>Interact With Gemini</Text>
                    <Text style={[styles.description , {color:"#00000080"} ]}>
                    Google's advanced AI model, excelling in understanding and responding to complex queries.
                    </Text>
                </View>
                <View style={styles.FeatureLogo}>
                    <Image source={require("../../assets/google.png")} style={styles.logo} />
                </View>
            </View>
            </TouchableOpacity>
            </>
  );
}



const styles = StyleSheet.create({
    FeatureCard: {
        height: hp(15),
        flexDirection: 'row',
        width: '100%',
        padding: wp(4), 
        backgroundColor: '#F4F6FF',
        borderRadius: wp(2),
        marginVertical: hp(2), 
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: wp(4), 
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp(4), 
    },
    description: {
        fontSize: wp(3.5),
        color: '#bdbdbd',
    },
    FeatureLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: wp(17), 
        height: wp(17), 
        resizeMode: 'contain',
    },
});

export default FeaturesView;