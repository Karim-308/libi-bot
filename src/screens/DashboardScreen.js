import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Logo from '../components/Logo.js';
import { LinearGradient } from 'expo-linear-gradient';
import FeaturesView from '../components/FeaturesView.js';
import { StatusBar } from 'expo-status-bar';

const DashboardScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.contentContainer}>
        <StatusBar style='dark'/>  
        <LinearGradient
            colors={['#f4cc00' , '#f4cc00']}
            start={{ x: 0, y:1  }} end={{ x: 0, y: 0 }}
            style={styles.container}>
            <Logo />
            <FeaturesView navigation={navigation} />
            </LinearGradient>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: '#000000',
       
    },
    FeatureCard: {
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

export default DashboardScreen;
