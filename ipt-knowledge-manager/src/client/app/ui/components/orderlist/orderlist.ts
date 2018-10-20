/* The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 PrimeTek
 * Modified by: Copyright (c) 2017 IPT - Intellectual Products & Technologies
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

import {NgModule, Component, ElementRef, AfterViewChecked, AfterContentInit, Input, Output,
    ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { AbstractControl, FormArray } from '@angular/forms';
import { DomHandler } from 'primeng/components/common/api';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { PrimeTemplate, SharedModule } from 'primeng/components/common/shared';
import { ButtonModule } from 'primeng/primeng';
import { MatIconModule, MatButtonModule } from '@angular/material';


@Component({
    selector: 'ipt-order-list',
    templateUrl: './orderlist.html',
    styleUrls: ['orderlist.css'],
    providers: [DomHandler, ObjectUtils]
})
export class OrderListComponent implements  AfterViewInit, AfterViewChecked, AfterContentInit {

    @Input() header: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() listStyle: any;

    @Input() responsive: boolean;

    @Input() filterBy: string;

    @Input() filterPlaceholder: string;

    @Input() metaKeySelection = true;

    @Input() dragdrop: boolean;

    @Input() dragdropScope: string;

    @Output() onReorder: EventEmitter<any> = new EventEmitter();

    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();

    @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output() onAddItem: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('listelement') listViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    selectedItems: any[];

    movedUp: boolean;

    movedDown: boolean;

    listContainer: any;

    itemTouched: boolean;

    draggedItemIndex: number;

    dragOverItemIndex: number;

    dragging: boolean;

    public filterValue: string;

    public visibleOptions: any[];

    public _value: FormArray;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}

    ngAfterViewInit() {
        this.listContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-orderlist-list');
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            const listItems = this.domHandler.find(this.listContainer, 'li.ui-state-highlight');
            let listItem;

            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];

            this.domHandler.scrollInView(this.listContainer, listItem);
            this.movedUp = false;
            this.movedDown = false;
        }
    }

    get value(): FormArray {
        return this._value;
    }

    @Input() set value(val: FormArray) {
        this._value = val ? val : null;
        // if (this.filterValue) {
        //     this.filter();
        // }
    }

    onItemClick(event, item) {
        const index = this.findIndexInList(item, this.selectedItems);
        const selected = (index !== -1);
        const metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            const metaKey = (event.metaKey || event.ctrlKey);

            if (selected && metaKey) {
                this.selectedItems.splice(index, 1);
            } else {
                this.selectedItems = (metaKey) ? this.selectedItems || [] : [];
                this.selectedItems.push(item);
            }
        } else {
            if (selected) {
                this.selectedItems.splice(index, 1);
            } else {
                this.selectedItems = this.selectedItems || [];
                this.selectedItems.push(item);
            }
        }

        this.onSelectionChange.emit({originalEvent: event, value: this.selectedItems});
        this.itemTouched = false;
    }

    // onFilterKeyup(event) {
    //     this.filterValue = event.target.value.trim().toLowerCase();
    //     this.filter();

    //     this.onFilterEvent.emit({
    //         originalEvent: event,
    //         value: this.visibleOptions
    //     });
    // }

    // filter() {
    //     const searchFields: string[] = this.filterBy.split(',');
    //     this.visibleOptions = this.objectUtils.filter(this.value, searchFields, this.filterValue);
    // }

    isItemVisible(item: any): boolean {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (item === this.visibleOptions[i]) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }

    onItemTouchEnd(event) {
        this.itemTouched = true;
    }

    isSelected(item: any) {
        return this.findIndexInList(item, this.selectedItems) !== -1;
    }

    findIndexInList(item: any, list: any): number {
        let index = -1;

        if (list) {
            for (let i = 0; i < list.length; i++) {
                // tslint:disable-next-line:triple-equals
                if ((list.at && list.at(i).get('id').value === item.get('id').value)
                || (!list.at && list[i].get('id').value === item.get('id').value)) { // to work both with FormArrays and normal arrays
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    moveUp(event, listElement) {
        if (this.selectedItems) {
            for (let i = 0; i < this.selectedItems.length; i++) {
                const selectedItem = this.selectedItems[i];
                const selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex !== 0) {
                    const movedItem = this.value.at(selectedItemIndex);
                    this.value.removeAt(selectedItemIndex)
                    // const temp = this.value.at(selectedItemIndex - 1);
                    this.value.insert(selectedItemIndex - 1, movedItem);
                    // this.value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            this.movedUp = true;
            this.onReorder.emit(event);
        }
    }

    moveTop(event, listElement) {
        if (this.selectedItems) {
            for (let i = 0; i < this.selectedItems.length; i++) {
                const selectedItem = this.selectedItems[i];
                const selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);
                const movedItem = selectedItemIndex > 0 && selectedItemIndex < this.value.length && this.value.at(selectedItemIndex);
                if (movedItem) {
                    this.value.removeAt(selectedItemIndex)
                    this.value.insert(0, movedItem);
                    listElement.scrollTop = 0;
                } else {
                    console.log(`Error: moveTop: ${selectedItemIndex}`, selectedItem, this.value)
                    break;
                }
            }

            this.onReorder.emit(event);
            listElement.scrollTop = 0;
        }
    }

    moveDown(event, listElement) {
        if (this.selectedItems) {
            for (let i = this.selectedItems.length - 1; i >= 0; i--) {
                const selectedItem = this.selectedItems[i];
                const selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex !== (this.value.length - 1)) {
                    const movedItem = this.value.at(selectedItemIndex);
                    this.value.removeAt(selectedItemIndex)
                    // const temp = this.value[selectedItemIndex + 1];
                    this.value.insert(selectedItemIndex + 1, movedItem);
                    // this.value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            this.movedDown = true;
            this.onReorder.emit(event);
        }
    }

    moveBottom(event, listElement) {
        if (this.selectedItems) {
            for (let i = this.selectedItems.length - 1; i >= 0; i--) {
                const selectedItem = this.selectedItems[i];
                const selectedItemIndex: number = this.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex !== (this.value.length - 1)) {
                    const movedItem = this.value.at(selectedItemIndex);
                    this.value.removeAt(selectedItemIndex)
                    this.value.push(movedItem);
                } else {
                    break;
                }
            }

            this.onReorder.emit(event);
            listElement.scrollTop = listElement.scrollHeight;
        }
    }

    onDragStart(event: DragEvent, index: number) {
        this.dragging = true;
        this.draggedItemIndex = index;
        if (this.dragdropScope) {
            event.dataTransfer.setData('text', this.dragdropScope);
        }
    }

    onDragOver(event: DragEvent, index: number) {
        if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    }

    onDragLeave(event: DragEvent, index: number) {
        this.dragOverItemIndex = null;
    }

    onDrop(event: DragEvent, index: number) {
        const dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        const movedItem = this.value.at(this.draggedItemIndex);
        this.value.removeAt(this.draggedItemIndex);
        this.value.insert(dropIndex, movedItem);
        // this.value.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
    }

    onDragEnd(event: DragEvent) {
        this.dragging = false;
    }

    onListMouseMove(event: MouseEvent) {
        if (this.dragging) {
            const offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            const bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            const topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    }

    addItem() {
        this.onAddItem.emit();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, MatButtonModule, MatIconModule],
    exports: [OrderListComponent, SharedModule],
    declarations: [OrderListComponent]
})
export class OrderListModule { }
