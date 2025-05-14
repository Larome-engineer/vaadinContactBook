package ru.suitd.contactbook.web.dialog.abstractModel;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.dialog.Dialog;

public class AbstractDialog extends Dialog {

    private final String title;
    private final String msg;

    public AbstractDialog(String title, String msg) {
        this.title = title;
        this.msg = msg;
        init();
    }

    private void init() {
        setHeaderTitle(title);
        getHeader().add(buttonClose());
        add(new Text(msg + " "));
        open();
    }

    private Button buttonClose() {
        com.vaadin.flow.component.button.Button close = new Button(VaadinIcon.CLOSE.create());
        close.addClickListener(eventButton -> close());
        return close;
    }

}
