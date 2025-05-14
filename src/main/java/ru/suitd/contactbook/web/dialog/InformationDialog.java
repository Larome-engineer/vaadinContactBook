package ru.suitd.contactbook.web.dialog;

import ru.suitd.contactbook.enums.INFORMATION;
import ru.suitd.contactbook.web.dialog.abstractModel.AbstractDialog;

public class InformationDialog extends AbstractDialog {
    public InformationDialog(INFORMATION information) {
        super("Информация", information.getText());
    }
}
