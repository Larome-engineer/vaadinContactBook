package ru.suitd.contactbook.web.layout;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.dto.ContactResponse;
import ru.suitd.contactbook.enums.ERROR;
import ru.suitd.contactbook.enums.INFORMATION;
import ru.suitd.contactbook.enums.WARNING;
import ru.suitd.contactbook.model.Contact;
import ru.suitd.contactbook.service.ContactFileService;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.dialog.*;
import ru.suitd.contactbook.web.grid.ContactGrid;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@UIScope
@Component
public class ActionLayout extends HorizontalLayout {

    private final ConverterService converter;
    private final ContactService contactService;
    private final ContactFileService contactFileService;
    private final Button addButton = new Button("Добавить", VaadinIcon.PLUS_CIRCLE.create());
    private final Button editButton = new Button("Редактировать", VaadinIcon.EDIT.create());
    private final Button deleteButton = new Button("Удалить", VaadinIcon.CLOSE_CIRCLE.create());
    private final Button downloadBook = new Button("Скачать контактную книгу", VaadinIcon.DOWNLOAD.create());

    private final ContactGrid contactGrid;
    private final AddContactDialog addContactDialog;
    private final EditContactDialog editContactDialog;

    public ActionLayout(ConverterService converter, ContactService contactService, ContactFileService contactFileService, ContactGrid contactGrid, AddContactDialog addContactDialog, EditContactDialog editContactDialog) {
        this.converter = converter;
        this.contactService = contactService;
        this.contactFileService = contactFileService;
        this.contactGrid = contactGrid;
        this.addContactDialog = addContactDialog;
        this.editContactDialog = editContactDialog;
        configureStyle();
        configureButtons();
        add(addButton, editButton, deleteButton, downloadBook);
    }

    private void configureStyle() {
        getStyle().set("padding-bottom", "20px");
        getStyle().set("padding-top", "20px");
        getStyle().set("padding-left", "20px");
    }

    private void configureButtons() {
        addButton.addClickListener(event -> addContactDialog.open());

        deleteButton.addClickListener(event -> {
            Set<ContactResponse> selectedContact = contactGrid.getSelectedItems();
            if (selectedContact.isEmpty()) {
                new WarningDialog(WARNING.NO_SELECT);
            } else {
                try {
                    contactService.deleteContact(
                            selectedContact.stream()
                                    .map(converter::fromResponseToEntity)
                                    .collect(Collectors.toSet())
                    );
                    contactGrid.setItems(converter.getAllContacts());
                } catch (Exception e) {
                    new ErrorDialog(ERROR.DELETE_ERROR);
                }
            }
        });

        editButton.addClickListener(event -> {
            Set<ContactResponse> selectedContact = contactGrid.getSelectedItems();
            if (selectedContact.isEmpty()) {
                new WarningDialog(WARNING.NO_SELECT);
            } else if (selectedContact.size() > 1) {
                new WarningDialog(WARNING.NEED_NO_MULTISELECT);
            } else {
                try {
                    Contact contact = contactService.getByPhone(selectedContact.stream().findFirst().get().getPhoneNumber());
                    editContactDialog.setContact(contact);
                    editContactDialog.openEditor(converter.convertToContactCardResponse(contact));
                } catch (Exception e) {
                    new ErrorDialog(ERROR.EDIT_ERROR);
                }
            }
        });

        downloadBook.addClickListener(event -> {
            List<ContactCardResponse> contacts = converter.getAllContactCards();
            if (!contacts.isEmpty()) {
                try {
                    contactFileService.saveContacts(contacts);
                    new InformationDialog(INFORMATION.SUCCESSFULLY_DOWNLOADED);
                } catch (Exception e) {
                    new ErrorDialog(ERROR.DOWNLOAD_ERROR);
                }
            } else {
                new WarningDialog(WARNING.NO_DATA_FOR_DOWNLOAD);
            }
        });
    }
}
