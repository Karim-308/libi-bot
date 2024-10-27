import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Logo from './Logo.js';

const DashboardScreen = ({ navigation }) => {
    
    return (
        <SafeAreaView style={styles.container}>
           <Logo />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9cc00',
    },
    
});

export default DashboardScreen;
