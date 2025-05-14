package ru.suitd.contactbook.web.dialog.abstractModel;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.theme.lumo.LumoIcon;
import ru.suitd.contactbook.enums.WARNING;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.dialog.WarningDialog;
import ru.suitd.contactbook.web.grid.ContactGrid;

import java.util.List;

public class AbstractDataDialog extends Dialog {

    protected final VerticalLayout layout1 = new VerticalLayout();
    protected final VerticalLayout layout2 = new VerticalLayout();
    protected final VerticalLayout layout3 = new VerticalLayout();
    protected final HorizontalLayout layout4 = new HorizontalLayout();
    protected final ContactGrid contactGrid;
    protected final ConverterService converter;
    protected final ContactService contactService;
    protected final TextField firstNameField = new TextField();
    protected final TextField usernameField = new TextField();
    protected final TextField lastNameField = new TextField();
    protected final IntegerField ageField = new IntegerField();
    protected final TextField phoneNumberField = new TextField();
    protected final TextField emailField = new TextField();
    protected final ComboBox<String> countryField = new ComboBox<>();
    protected final TextField cityField = new TextField();
    protected final TextField addressField = new TextField();
    protected final TextField workplaceField = new TextField();
    protected final TextField postField  = new TextField();
    protected final Button saveButton = new Button("Сохранить", VaadinIcon.CHECK_CIRCLE.create());
    protected final Button closeButton = new Button("Отмена", VaadinIcon.CLOSE_CIRCLE.create());



    public AbstractDataDialog(ContactGrid contactGrid, ConverterService converter, ContactService contactService) {
        this.contactGrid = contactGrid;
        this.converter = converter;
        this.contactService = contactService;
        configureTextLayouts();
        textFieldConfigure();
        closeButton.addClickListener(e -> close());
    }

    protected void checkData() {
        List<String> requiredFields = List.of(
                lastNameField.getValue(),
                firstNameField.getValue(),
                phoneNumberField.getValue(),
                emailField.getValue()
        );

        if (ageField.getValue() == null) {
            close();
            new WarningDialog(WARNING.NO_DATA);
            return;
        }

        for (String value : requiredFields) {
            if (value.isBlank()) {
                close();
                new WarningDialog(WARNING.NO_DATA);
                return;
            }
        }
    }

    protected void clearData() {
        usernameField.clear();
        firstNameField.clear();
        lastNameField.clear();
        phoneNumberField.clear();
        emailField.clear();
        ageField.clear();
        addressField.clear();
        workplaceField.clear();
        cityField.clear();
        countryField.clear();
        postField.clear();
    }


    private void configureTextLayouts() {
        layout1.add(usernameField, firstNameField, lastNameField, ageField);
        layout2.add(phoneNumberField, emailField, countryField, cityField);
        layout3.add(addressField, workplaceField, postField);
        layout4.add(saveButton, closeButton);
        add(layout1, layout2, layout3, layout4);

    }
    
    private void textFieldConfigure() {
        firstNameField.setPlaceholder("Имя");
        firstNameField.setPrefixComponent(VaadinIcon.USER.create());

        lastNameField.setPlaceholder("Фамилия");
        lastNameField.setPrefixComponent(VaadinIcon.USER.create());

        usernameField.setPlaceholder("Имя пользователя");
        usernameField.setPrefixComponent(VaadinIcon.USER.create());

        ageField.setPlaceholder("Возраст");
        ageField.setPrefixComponent(VaadinIcon.USER.create());

        phoneNumberField.setPlaceholder("Номер телефона");
        phoneNumberField.setPrefixComponent(LumoIcon.PHONE.create());

        emailField.setPlaceholder("Почта");
        emailField.setPrefixComponent(VaadinIcon.ENVELOPE.create());

        countryField.setItems(List.of(
                "Россия", "США", "Беларусь", "Китай", "Германия", "Франция", "Япония", "Корея",
                "Бразилия", "Италия", "Великобритания", "Финляндия")
        );
        countryField.setPlaceholder("Страна");
        countryField.setPrefixComponent(VaadinIcon.AIRPLANE.create());

        cityField.setPlaceholder("Город");
        cityField.setPrefixComponent(VaadinIcon.MAP_MARKER.create());

        addressField.setPlaceholder("Адрес");
        addressField.setPrefixComponent(VaadinIcon.BUILDING.create());

        workplaceField.setPlaceholder("Место работы");
        workplaceField.setPrefixComponent(VaadinIcon.WORKPLACE.create());

        postField.setPlaceholder("Должность");
        postField.setPrefixComponent(VaadinIcon.DOCTOR.create());
    }
}
