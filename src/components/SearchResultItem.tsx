import * as React from "react";
import * as ReactDOM from "react-dom";
import { LibraryContainer } from "./LibraryContainer";
import * as LibraryUtilities from "../LibraryUtilities";

interface ParentTextClickedFunc {
    (pathToItem: LibraryUtilities.ItemData[]): void;
}

interface SearchResultItemProps {
    data: LibraryUtilities.ItemData;
    libraryContainer: LibraryContainer;
    highlightedText: string;
    pathToItem: LibraryUtilities.ItemData[];
    onParentTextClicked: ParentTextClickedFunc;
    detailed: boolean;
}

interface SearchResultItemStates { }

export class SearchResultItem extends React.Component<SearchResultItemProps, SearchResultItemStates> {

    constructor(props: SearchResultItemProps) {
        super(props);
    }

    render() {
        let iconPath = this.props.data.iconUrl;

        // The parent of a search result item is the second last entry in 'pathToItem'
        let parentText = this.props.pathToItem[this.props.pathToItem.length - 2].text;

        // Category of the item is the item with type category in the array pathToItem
        let categoryText = this.props.pathToItem.find(item => item.itemType === "category").text;

        let parameters = this.props.data.parameters;
        let highLightedItemText = LibraryUtilities.getHighlightedText(this.props.data.text, this.props.highlightedText, true);
        let highLightedParentText = LibraryUtilities.getHighlightedText(parentText, this.props.highlightedText, false);
        let highLightedCategoryText = LibraryUtilities.getHighlightedText(categoryText, this.props.highlightedText, false);
        let itemTypeIconPath = "src/resources/icons/library-" + this.props.data.itemType + ".svg";
        let itemDescription: JSX.Element = null;

        if (this.props.detailed) {
            let description = "No description available";
            if (this.props.data.description && this.props.data.description.length > 0) {
                description = this.props.data.description;
            }

            itemDescription = <div className={"ItemDescription"}>{description}</div>;
        }

        return (
            <div className={"SearchResultItemContainer"} onClick={this.onItemClicked.bind(this)}
                onMouseOver={this.onLibraryItemMouseEnter.bind(this)} onMouseLeave={this.onLibraryItemMouseLeave.bind(this)}>
                <img className={"ItemIcon"} src={iconPath} onError={this.onImageLoadFail.bind(this)} />
                <div className={"ItemInfo"}>
                    <div className={"ItemTitle"}>{highLightedItemText}
                        <div className={"LibraryItemParameters"}>{parameters}</div>
                    </div>
                    {itemDescription}
                    <div className={"ItemDetails"}>
                        <div className={"ItemParent"} onClick={this.onParentTextClicked.bind(this)}>
                            {highLightedParentText}
                        </div>
                        <img className={"ItemTypeIcon"} src={itemTypeIconPath} onError={this.onImageLoadFail.bind(this)} />
                        <div className={"ItemCategory"}>{highLightedCategoryText}</div>
                    </div>
                </div>
            </div>
        );
    }

    onImageLoadFail(event: any) {
        event.target.src = require("../resources/icons/Dynamo.svg");
    }

    onParentTextClicked(event: any) {
        event.stopPropagation();
        this.props.onParentTextClicked(this.props.pathToItem);
    }

    onItemClicked() {
        let libraryController = this.props.libraryContainer.props.libraryController;
        libraryController.raiseEvent(libraryController.ItemClickedEventName, this.props.data.contextData);
    };

    onLibraryItemMouseLeave() {
        let libraryController = this.props.libraryContainer.props.libraryController;
        if (this.props.data.childItems.length == 0) {
            libraryController.raiseEvent(libraryController.ItemMouseLeaveEventName, { data: this.props.data.contextData });
        }
    }

    onLibraryItemMouseEnter() {
        let libraryController = this.props.libraryContainer.props.libraryController;
        if (this.props.data.childItems.length == 0) {
            let rec = ReactDOM.findDOMNode(this).getBoundingClientRect();
            libraryController.raiseEvent(libraryController.ItemMouseEnterEventName, { data: this.props.data.contextData, rect: rec });
        }
    }
}