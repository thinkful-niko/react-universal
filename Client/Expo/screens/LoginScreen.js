import React from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { login, refreshAccessToken, switchAccount } from '../actions/authActions';

class LoginScreen extends React.Component {

    componentDidUpdate() {
        this.onRefreshTokenError();
        this.redirectToHome();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logInContainer}>
                    <Button onPress={this.onLogIn} title='Login'></Button>
                    <Button onPress={this.switchAccount} title='Switch Account'></Button>                    
                </View>
            </View>
        );
    }

    onLogIn = () => {
        this.props.refreshAccessToken(this.props.refreshToken);
    }
    switchAccount = () => {
        this.props.switchAccount();
    }
    onRefreshTokenError = () => {
        if (this.props.refreshError) {
            this.props.login();
        }
    }

    redirectToHome = () => {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Main');
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    logInContainer: {
        marginTop: 50
    }
})

const mapStateToProps = (state) => {

    return {
        isAuthenticated:
            new Date().getTime() <
            (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
        refreshError: state.authReducer.refreshError,
        refreshToken: state.authReducer.sessionItems.refreshToken
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        login,
        switchAccount,
        refreshAccessToken
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
