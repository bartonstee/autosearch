import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle, TextInput, View } from "react-native";

import { Style, mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { AutosearchProps } from "../typings/AutosearchProps";

export interface AutosearchStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
    input: ViewStyle;
}

interface State {
    textboxValue?: string;
}

const defaultStyle: AutosearchStyle = {
    container: {
    },
    label: {
        color: "#003C85"
    },
    input: {
    },
    text: {
        color: "#003C85",
        fontSize: 15,
        padding: 10,
    }
};

export class Autosearch extends Component<AutosearchProps<AutosearchStyle>, State> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onTouchStart = this.onTouch.bind(this);
    private readonly onEndHandler = this.onEnd.bind(this);
    constructor(props: AutosearchProps<AutosearchStyle>){
        super(props)
        this.state = {
               textboxValue: '',
        }
    }


    render(): ReactNode {
        return (
        <View style={this.styles.input}> 
                <TextInput style={this.styles.text} 
                value={this.state.textboxValue} 
                onChangeText={this.onChangeHandler}
                onTouchStart={this.onTouchStart}
                onEndEditing={this.onEndHandler}
                placeholder={'Zoeken naar monumentenborden'}
                placeholderTextColor="#5997C0"
                editable={this.props.editable}
                >
                </TextInput>
        </View>
        )
    }

    private onChange(text: string) {
        this.setState({textboxValue: text});
        this.props.searchvalue.setValue(text);
    }

    private onTouch() {
        this.props.onEnter?.execute();
    }

    private onEnd() {
        this.props.onChange?.execute();
    }
}
