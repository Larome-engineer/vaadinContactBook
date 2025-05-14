package ru.suitd.contactbook.web.grid;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactResponse;
import ru.suitd.contactbook.service.ConverterService;


@UIScope
@Component
public class ContactGrid extends Grid<ContactResponse> {
    private final ConverterService converter;

    public ContactGrid(ConverterService converter) {
        super(ContactResponse.class);
        this.converter = converter;
        configureGrid();
    }
    private void configureGrid() {
        setSelectionMode(SelectionMode.MULTI);
        getStyle().set("margin-left", "20px");
        getStyle().set("margin-right", "20px");
        getStyle().set("border", "2px solid #ccc");
        getStyle().set("border-radius", "20px");
        getStyle().set("overflow", "hidden");
        setColumns("firstName", "lastName", "phoneNumber", "email");
        setItems(converter.getAllContacts());
    }
}
