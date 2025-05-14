package ru.suitd.contactbook.web.layout;

import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.spring.annotation.UIScope;
import com.vaadin.flow.theme.lumo.LumoIcon;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.grid.ContactGrid;

@UIScope
@Component
public class SearchLayout extends HorizontalLayout {

    private final ContactService contactService;
    private final ConverterService converter;

    private final TextField searchByNameField = new TextField();
    private final TextField searchBySurnameField = new TextField();
    private final TextField searchByNameAndSurnameField = new TextField();
    private final Button refresh = new Button("Обновить", LumoIcon.RELOAD.create());
    private final Button info = new Button(VaadinIcon.INFO.create());
    private final ContactGrid contactGrid;

    public SearchLayout(ContactService contactService, ConverterService converter, ContactGrid contactGrid) {
        this.contactService = contactService;
        this.converter = converter;
        this.contactGrid = contactGrid;
        configureStyle();
        layoutTextConfigure();
        addListenersOnButtons();
        add(refresh, searchByNameField, searchBySurnameField, searchByNameAndSurnameField, info);

    }

    private void configureStyle() {
        getStyle().set("padding-top", "20px");
        getStyle().set("padding-left", "20px");
    }

    private void addListenersOnButtons() {
        refresh.addClickListener(event -> contactGrid.setItems(converter.getAllContacts()));
        searchByNameField.addValueChangeListener(event -> searchAction(event, "name"));
        searchBySurnameField.addValueChangeListener(event -> searchAction(event, "lastname"));
        searchByNameAndSurnameField.addValueChangeListener(event -> searchAction(event, "nameAndLastname"));
    }

    private void layoutTextConfigure() {
        info.setTooltipText("Для подробной информации о контакте, кликните на контакт в списке контактов");
        searchByNameField.setPlaceholder("По имени");
        searchByNameField.setPrefixComponent(LumoIcon.SEARCH.create());

        searchBySurnameField.setPlaceholder("По фамилии");
        searchBySurnameField.setPrefixComponent(LumoIcon.SEARCH.create());

        searchByNameAndSurnameField.setPlaceholder("По имени и фамилии");
        searchByNameAndSurnameField.setPrefixComponent(LumoIcon.SEARCH.create());
    }

    private void searchAction(AbstractField.ValueChangeEvent<String> event, String by) {
        contactGrid.setItems(
                contactService.search(event.getValue(), by).stream()
                        .map(converter::convertToContactResponse)
                        .toList()
        );
    }

}
