import { Component, ReactNode, createElement, createRef } from "react";
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
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10
    }
};

export class Autosearch extends Component<AutosearchProps<AutosearchStyle>, State> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onTouchStart = this.onTouch.bind(this);
    private readonly onEndHandler = this.onEnd.bind(this);
    private readonly onLeaveHandler = this.onLeave.bind(this);
    inputRef = createRef<TextInput>();
    constructor(props: AutosearchProps<AutosearchStyle>){
        super(props)
        this.state = {
               textboxValue: this.props.searchvalue.displayValue,
        }
    }

    componentDidUpdate(prevProps: AutosearchProps<AutosearchStyle>) {
        if (prevProps.autoFocus !== this.props.autoFocus) {
            if (this.props.autoFocus.value) {
                setTimeout(() => { 
                    this.inputRef.current?.focus();
                    this.props.autoFocus.setValue(false);
                    return;
                }, 500)
            }
        }
        if (prevProps.searchvalue !== this.props.searchvalue) {
            if (this.props.searchvalue === undefined || this.props.searchvalue.displayValue === '') {
                this.setState({textboxValue: ''});
                this.inputRef.current?.clear;
            }
            else {
                this.setState({textboxValue: this.props.searchvalue.displayValue});
            }
        }
    }

    render(): ReactNode {
        return (
        <View style={this.styles.input}> 
                <TextInput style={this.styles.text} 
                value={this.state.textboxValue} 
                onChangeText={this.onChangeHandler}
                onFocus={this.onTouchStart}
                onSubmitEditing={this.onLeaveHandler}
                onEndEditing={this.onEndHandler}
                placeholder={'Zoeken naar monumentenborden'}
                placeholderTextColor="#5997C0"
                editable={this.props.editable}
                ref={this.inputRef}
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

    private onLeave() {
        this.props.onLeave?.execute();
    }
}
