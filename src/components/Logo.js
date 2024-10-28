import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';




function Logo (){
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFontsAndData() {
            try {
                await Font.loadAsync({
                    'Knewave-Regular': require('../../assets/fonts/Knewave-Regular.ttf'),
                });
                setFontLoaded(true);
            } catch (error) {
                console.warn(error);
            }  
        }
        loadFontsAndData();
    }, []);

    if (!fontLoaded) {
        return null; // Keeps splash screen until font is loaded
    }


return <View style={styles.OuterLogoContainer}>
    <View style={styles.logoContainer}>
        <Image 
            source={require('../../assets/Libi.png')} 
            style={styles.logo}
        />
    </View>
    <Text style={styles.LogoTitle}>Libi</Text>
</View>
}


const styles = StyleSheet.create({
    logoContainer: {
        width: wp(48),
        height: wp(48),
        borderRadius: wp(25),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: wp(45), 
        height: wp(45), 
        resizeMode: 'contain', 
        borderRadius: wp(22.5),
    },
    LogoTitle: {
        fontFamily: 'Knewave-Regular', 
        textAlign  : 'center',
        width: wp(22),
        paddingHorizontal: 1,
        fontSize: wp(11),
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
    },
    OuterLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(1.5),
    },
});

export default Logo; 