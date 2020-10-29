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
    container: {},
    label: {
        color: "#F6BB42"
    },
    input: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#de712b',
    }
};

export class Autosearch extends Component<AutosearchProps<AutosearchStyle>, State> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);
    private readonly onChangeHandler = this.onChange.bind(this);
    constructor(props: AutosearchProps<AutosearchStyle>){
        super(props)
        this.state = {
               textboxValue: '',
        }
    }


    render(): ReactNode {
        return (
        <View style={this.styles.container}> 
                <TextInput style={this.styles.input} value={this.state.textboxValue} onChangeText={this.onChangeHandler} placeholder={'Zoeken...'}></TextInput>
        </View>
        )
    }

    private onChange(text: string) {
        this.setState({textboxValue: text});
        this.props.searchvalue.setValue(text);
        this.props.onChange?.execute();
    }
}
