package ru.suitd.contactbook.web.layout;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.spring.annotation.UIScope;
import com.vaadin.flow.theme.lumo.Lumo;
import org.springframework.stereotype.Component;

@Component
@UIScope
public class ThemeLayout extends VerticalLayout {

    public ThemeLayout() {
        setAlignItems(Alignment.END);
        Checkbox checkbox = new Checkbox("Темная тема");
        add(checkbox);
        checkbox.addValueChangeListener(e -> setTheme(e.getValue()));
    }
    private void setTheme(boolean set) {
        if (set) {
            UI.getCurrent().getPage().executeJs("document.documentElement.setAttribute('theme', '"+Lumo.DARK+"')");
        } else {
            UI.getCurrent().getPage().executeJs("document.documentElement.setAttribute('theme', '')");
        }
    }
}
