package ru.suitd.contactbook.web.dialog;

import ru.suitd.contactbook.enums.WARNING;
import ru.suitd.contactbook.web.dialog.abstractModel.AbstractDialog;

public class WarningDialog extends AbstractDialog {
    public WarningDialog(WARNING warning) {
        super("Предупреждение", warning.getText());
    }
}
