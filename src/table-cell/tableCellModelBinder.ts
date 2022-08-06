import { Bag, Contract } from "@paperbits/common";
import { ContainerModelBinder, IModelBinder } from "@paperbits/common/editing";
import { IWidgetService, ModelBinderSelector } from "@paperbits/common/widgets";
import { TableCellContract } from "./tableCellContract";
import { TableCellModel } from "./tableCellModel";


export class TableCellModelBinder extends ContainerModelBinder implements IModelBinder<TableCellModel> {
    constructor(protected readonly widgetService: IWidgetService, protected modelBinderSelector: ModelBinderSelector) {
        super(widgetService, modelBinderSelector);
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "table-cell";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof TableCellModel;
    }

    public async contractToModel(contract: TableCellContract, bindingContext?: Bag<any>): Promise<TableCellModel> {
        const tableCellModel = new TableCellModel();

        tableCellModel.styles = contract.styles;
        tableCellModel.role = contract.role;
        tableCellModel.widgets = await this.getChildModels(contract.nodes, bindingContext);

        return tableCellModel;
    }

    public modelToContract(model: TableCellModel): Contract {
        const contract: TableCellContract = {
            type: "table-cell",
            nodes: this.getChildContracts(model.widgets),
            role: model.role,
            styles: model.styles
        };

        return contract;
    }
}
