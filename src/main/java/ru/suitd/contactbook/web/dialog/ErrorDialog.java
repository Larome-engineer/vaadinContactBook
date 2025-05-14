package ru.suitd.contactbook.web.dialog;

import ru.suitd.contactbook.enums.ERROR;
import ru.suitd.contactbook.web.dialog.abstractModel.AbstractDialog;

public class ErrorDialog extends AbstractDialog {
    public ErrorDialog(ERROR error) {
        super("Ошибка", error.getText());
    }
}
