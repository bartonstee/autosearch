/**
 * This file was generated from Autosearch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface AutosearchProps<Style> {
    name: string;
    style: Style[];
    searchvalue: EditableValue<string>;
    onChange?: ActionValue;
}

export interface AutosearchPreviewProps {
    class: string;
    style: string;
    searchvalue: string;
    onChange: {} | null;
}
