/*
      ClusterViewContainer
    +-----------------------------------------------------+
    |  ClusterLeftPane     ClusterRightPane               |
    | +-----------------+ +-----------------------------+ |
    | |    ClusterIcon  | | LibraryItemContainerXxx     | |
    | |       +-------+ | | +-------------------------+ | |
    | |       |       | | | | ...                     | | |
    | |       |       | | | +-------------------------+ | |
    | |       +-------+ | | +-------------------------+ | |
    | |                 | | | ...                     | | |
    | |                 | | +-------------------------+ | |
    | |                 | | +-------------------------+ | |
    | |                 | | | ...                     | | |
    | |                 | | +-------------------------+ | |
    | +-----------------+ +-----------------------------+ |
    +-----------------------------------------------------+
*/

import * as React from "react";
import { LibraryController } from "../entry-point";
import { LibraryItem } from "./LibraryItem";
import { ItemData } from "../LibraryUtilities";

export interface ClusterViewProps {
    libraryController: LibraryController,
    icon: any,
    borderColor: string,
    childItems: ItemData[]
}

export class ClusterView extends React.Component<ClusterViewProps, undefined> {

    render() {

        let localStyle = {
            borderColor: this.props.borderColor
        };

        return (
            <div className={"ClusterViewContainer"}>
                <div className={"ClusterLeftPane"} style={localStyle}>
                    <img className={"ClusterIcon"} src={this.props.icon} />
                </div>
                <div className={"ClusterRightPane"}>
                    {this.getNestedElements()}
                </div>
            </div>
        );
    }

    getNestedElements() {

        let index = 0;
        return this.props.childItems.map((item: ItemData) => {
            return (<LibraryItem key={index++} libraryController={this.props.libraryController} data={item} />);
        });
    }

}
