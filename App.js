import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';


export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            showDraggable   : true,
            dropZoneValues  : null,
            pan             : new Animated.ValueXY(),
            box1name        : 'Car'
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null,{
                dx  : this.state.pan.x,
                dy  : this.state.pan.y
            }]),
            onPanResponderRelease           : (e, gesture) => {
                if(this.isDropZone(gesture)){
                  console.log(this.state.pan.x);
                  console.log(this.state.pan.y);
                    this.setState({
                        showDraggable : true
                    });
                }else{
                  this.setState({
                      showDraggable : true
                  });
                }
            }
        });
    }

    isDropZone(gesture){
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <View
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}>
                    <Text style={styles.headertext}>Experiment Name</Text>
                </View>

                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable(){
        if(this.state.showDraggable){
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                        <Text style={styles.text}>{this.state.box1name}</Text>
                    </Animated.View>
                </View>
            );
        }
    }
}


let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    headertext        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff',
        fontSize    : 30
    },
    text        : {
        marginTop   : '35%',
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : 'black',
        fontSize    : 20
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height - 170,
        left        : Window.width - 150,
    },
    circle      : {
        backgroundColor     : 'transparent',
        width               : 120,
        height              : 120,
        borderWidth         : 6,
        borderColor         : 'red'
    }
});
